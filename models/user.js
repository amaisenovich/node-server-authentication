const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    password: String,
});

userSchema.pre("save", function (next)
{
    bcrypt.genSalt(10, (err, salt) =>
    {
        if (err)
        {
            return next(err);
        }

        bcrypt.hash(this.password, salt, null, (err, hash) =>
        {
            if (err)
            {
                return next(err);
            }

            this.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, callback)
{
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) =>
    {
        if (err)
        {
            return callback(err);
        }

        return callback(null, isMatch);
    });
}

const ModelClass = mongoose.model("user", userSchema);

module.exports = ModelClass;