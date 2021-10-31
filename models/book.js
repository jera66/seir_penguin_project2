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

//Making  books schema
const booksSchema = new Schema({
  author: String,
  title: String,
  readyForPublishing: Boolean,
  username: String,
})

//Making the book Model
const Book = model('Book', booksSchema)

// //Logging the model to make sure it exists
// console.log(Book)

///////////////////////////////////////
//Exporting the book model
///////////////////////////////////////
module.exports = Book

