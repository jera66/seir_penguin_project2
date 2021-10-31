///////////////////////////////////
//Importing our Dependencies
///////////////////////////////////
require('dotenv').config() // brings in .env vars
const express = require('express') // web framework
const morgan = require('morgan') // logger
const liquid = require('liquid-express-views')
const methodOverride = require('method-override') // to swap request methods
// const mongoose = require('mongoose') // our database library
const path = require('path') // helper functions for file paths
const BooksRouter = require('../controllers/book')
const UserRouter = require('../controllers/user')
const session = require('express-session') // session middleware
const MongoStore = require('connect-mongo') // save sessions in mongo
const Book = require('../models/book')
/////////////////////////////////////
// MiddleWare Function
//////////////////////////////////////
const middleware = app => {
  app.use(morgan('tiny')) //logging
  app.use(methodOverride('_method')) // override for put and delete requests from forms
  app.use(express.urlencoded({ extended: true })) // parse urlencoded request bodies
  app.use(express.static('public')) // serve files from public statically
  app.use(
    session({
      secret: process.env.SECRET,
      store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
      saveUninitialized: true,
      resave: false
    })
  )
}

///////////////////////////////////////////
// Export Middleware Function
//////////////////////////////////////////
module.exports = middleware
