///////////////////////////////////
//Importing our Dependencies
///////////////////////////////////
require('dotenv').config() // brings in .env vars
const mongoose = require('mongoose') // our database library

/////////////////////////////////////
// Establishing  Database Connection
/////////////////////////////////////
//Setting up the inputs for mongoose connect
const DATABASE_URL = process.env.DATABASE_URL // url from .env
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

//Connecting to Mongo
mongoose.connect(DATABASE_URL, CONFIG)

//Connection messages
mongoose.connection
  .on('open', () => console.log('Connected to Mongo'))
  .on('close', () => console.log('disconnected from mongo'))
  .on('error', error => console.log(error))

  //////////////////////////////
// Export the Connection
//////////////////////////////
module.exports = mongoose
