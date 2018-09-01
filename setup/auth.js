const passport = require("passport");
const config = require("../config");
const User = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

const localOptions = {
    usernameField: "email",
};

const localStrategy = new LocalStrategy(localOptions, (email, password, done) =>
{
    User.findOne({ email: email }, (err, user) =>
    {
        if (err)
        { 
            return err;
        }

        if (!user)
        { 
            return done(null, false);
        }

        user.comparePassword(password, (err, isMatch) =>
        {
            if (err)
            { 
                return err;
            }

            if (!isMatch)
            { 
                return done(null, false);
            }

            return done(null, user);
        });
    });
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: config.secret
};

const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) =>
{
    User.findById(payload.sub, (err, user) =>
    {
        if (err)
        {
            return done(err, false);
        }


        return user ? done(null, user) : done(null, false);
    })
});

exports.configure = () =>
{
    passport.use(localStrategy);
    passport.use(jwtStrategy);
}