
const passport = require("passport");

exports.requireJWT = passport.authenticate("jwt", {
    session: false
});

exports.requireCreds = passport.authenticate("local", {
    session: false
});