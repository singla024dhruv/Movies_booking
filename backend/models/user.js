const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            Unique: true,
        },
        password: {
            type: String,
            require: true,
        }
    }, {
    timestamps: true,
}
);
const UserDetails = mongoose.Model('UserDetails', UserSchema);
module.exports = UserDetails;
