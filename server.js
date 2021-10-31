///////////////////////////////////
//Importing our Dependencies
///////////////////////////////////
require('dotenv').config() // brings in .env vars
const express = require('express') // web framework
const morgan = require('morgan') // logger
const liquid = require('liquid-express-views')
const methodOverride = require('method-override') // to swap request methods
const mongoose = require('mongoose') // our database library
const path = require('path') // helper functions for file paths
const BooksRouter = require('./controllers/book')
const UserRouter = require('./controllers/user')
const session = require('express-session') // session middleware
const MongoStore = require('connect-mongo') // save sessions in mongo


/////////////////////////////////
// Create our app with object, configure liquid
/////////////////////////////////
// import liquid
// const liquid = require('liquid-express-views')
// // construct an absolute path to our views folder
// const viewsFolder = path.resolve(__dirname, 'views/')
// console.log(viewsFolder)
/////////////////////////////////
// Create our app with object, configure liquid
/////////////////////////////////
//Constructing an absolute path to our views folder
const viewsFolder = path.resolve(__dirname, 'views/')

//Create an app object with liquid, passing the path to the views folder
const app = liquid(express(), { root: viewsFolder })

//Console.logging app to confirm it exists
console.log(app)

/////////////////////////////////////////////
//Registering Our Middleware
/////////////////////////////////////////////
//Logging
app.use(morgan('tiny'))
//Overriding request methods
app.use(methodOverride('_method'))
//Parsing urlencoded from form submission
app.use(express.urlencoded({ extended: true }))
//Public folder setup for serving files statically
app.use(express.static('public'))
//Middleware to create sessions (req.session)
app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    resave: false,
    saveUninitialized: true
  })
)

//Exporting the port number from env
const PORT = process.env.PORT || 5500
app.get('/', (req, res) => {
  res.send("This app is working!")
})

// Registering books Router
app.use('/books', BooksRouter)

/////////////////////////////////////////////
// Setup Server Listener
/////////////////////////////////////////////
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

