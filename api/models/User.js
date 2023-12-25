const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String
});

// Now you can use UserSchema to create a Mongoose model
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
