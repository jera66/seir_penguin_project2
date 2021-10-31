///////////////////////////////////
//Importing dependencies
///////////////////////////////////
//Importing the existing connected mongoose object from connection.js
const mongoose = require('./connection')

///////////////////////////////////////////
// Creating our User Model
///////////////////////////////////////////
//Destructuring Schema and model from mongoose
const { Schema, model } = mongoose

//Making a user schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

//Making the User Model
const User = model('User', userSchema)

///////////////////////////////////////
//Exporting the User model
///////////////////////////////////////
module.exports = User
