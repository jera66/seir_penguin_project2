///////////////////////////////////
//Importing our Dependencies
///////////////////////////////////
// require('dotenv').config() // brings in .env vars
const express = require('express') // web framework
// const morgan = require('morgan') // logger
// const liquid = require('liquid-express-views')
// const methodOverride = require('method-override') // to swap request methods
// const mongoose = require('mongoose') // our database library
const path = require('path') // helper functions for file paths
const BooksRouter = require('./controllers/book')
const UserRouter = require('./controllers/user')
// const session = require('express-session') // session middleware
// const MongoStore = require('connect-mongo') // save sessions in mongo
// const Book = require('./models/book')
const middleware = require('./utils/middleware')
const HomeRouter = require('./controllers/home')

/////////////////////////////////////////////////
// Creating the express application Object
/////////////////////////////////////////////////
const app = require('liquid-express-views')(express(), {root: [path.resolve(__dirname, 'views/')]})

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
middleware(app)

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.use('/books', BooksRouter) //Sending all "/books" routes to book router
app.use('/user', UserRouter) //Sending all "/user" routes to user router
app.use('/', HomeRouter) //Handling all other requests.

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))
