const mongoose = require("mongoose");
const {Schema} = mongoose;

const placeSchema = new Schema({
    owner:{type:mongoose.Schema.Types.ObjectId, ref:'User'},     //Here I am referencing to User model that I have created earlier for some informations if neccessary.
    title: String,
    photos:[String],               //Phots are array of strings.
    address: String,
    description: String,
    perks:[String],                 //Array of Strings.
    extraInfo: String, 
    checkIn:Number,
    checkOut:Number,
    maxGuests:Number         
});

// Now you can use UserSchema to create a Mongoose model
const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;
