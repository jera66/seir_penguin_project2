///////////////////////////////////
//Importing our Dependencies
///////////////////////////////////
//Importing the existing connected mongoose object from connection.js
const mongoose = require('./connection')

///////////////////////////////////////////
// Creating our Books Model
///////////////////////////////////////////
//Destructuring Schema and model from mongoose
const { Schema, model } = mongoose

//Making a books schema
const bookSchema = new Schema({
  title: String,
  author: String,
  readyForPublishing: Boolean
})

//Making the book Model
const Book = model('Book', bookSchema)

//Logging the model to make sure it exists
console.log(Book)

///////////////////////////////////////
//Exporting the book model
///////////////////////////////////////
module.exports = Book

