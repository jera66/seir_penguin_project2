/////////////////////////
// Import Dependencies
/////////////////////////
const express = require('express') // express for Router function
const Book = require('../models/book') // book model

//////////////////
// Creating router
//////////////////
const router = express.Router()

/////////////////////////////////
// Router Middleware
/////////////////////////////////

// middleware to check if user is logged in
router.use((req, res, next) => {
  // check if logged in
  if (req.session.loggedIn) {
    // send to routes
    next()
  } else {
    res.redirect('/user/login')
  }
})

////////////////////////
//Books Routes
////////////////////////

//seed route - seed our starter data
router.get('/seed', (req, res) => {
  // array of starter books
  const books = [
  {author: 'Kenyatta Young',title: 'When whales fly',readyForPublishing: true},
  {author: 'Karl Czerny',title: 'Virtuosic piano solos',readyForPublishing: false},
  {author: 'C. S. Lewis',title: 'Mere christianity',readyForPublishing: false},
  {author: 'Thomas Aquinas',title: 'Treatise on law',readyForPublishing: false},
  {author: 'Alan Cohen',title: 'Dare to be yourself',readyForPublishing: true},
  {author: 'Stephen Hawking',title: 'God created the integers',readyForPublishing: true},
  {author: 'Michael Erard',title: 'Babel no more',readyForPublishing: true},
  {author: 'Tyler Perry',title: 'The haves and the have nots',readyForPublishing: false},
  {author: 'Apostle Paul',title: 'Acts',readyForPublishing: true},
  {author: 'Jerathel Jean',title: 'It\'s snowing in hell',readyForPublishing: false},
  {author: 'Darellson Xaven',title: 'Exposing unreal people',readyForPublishing: false}
]


  //Deleting all books
  Book.deleteMany({})
  .then((data) => {
    //Seed the starter books
    Book.create(books)
    .then((data) => {
      //Sending created books back as JSON
      res.json(data)
    })
  })
})

//Index route - get - /books
router.get('/', (req, res) => {
  //Finding all the books
  Book.find({ username: req.session.username })
    .then((books) => {
      console.log(books)
      // render the index template with the fruits
      res.render('books/index.liquid', { books })
    })
    // error handling
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})

//New route - get request - /books/new
router.get('/new', (req, res) => {
  res.render('books/new.liquid')
})

//Creating - post request - /books
router.post('/', (req, res) => {
  //Converting the checkbox property to true or false
  req.body.readyForPublishing = req.body.readyForPublishing === 'on' ? true : false

  //Adding the username to req.body, to track user
  req.body.username = req.session.username

  // create the new book
  Book.create(req.body)
    .then((books) => {
      // redirect the user back to the index route
      res.redirect('/books')
    })
    // error handling
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})

//Editing route - get request - /books/:id/edit
router.get('/:id/edit', (req, res) => {
  //Getting the id from params
  const id = req.params.id

  //Getting the book with the matching id
  Book.findById(id)
    .then((book) => {
      //Rendering the edit page template with the book data
      res.render('books/edit.liquid', { book })
    })
    // error handling
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})

//Updating route - put request - "/books/:id"
router.put('/:id', (req, res) => {
  //Getting the id from params
  const id = req.params.id

  //Converting the checkbox property to true or false
  req.body.readyForPublishing = req.body.readyForPublishing === 'on' ? true : false

  //Updating the item with the matching id
  Book.findByIdAndUpdate(id, req.body, { new: true })
    .then((book) => {
      // redirect user back to index
      res.redirect('/books')
    })
    // error handling
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})

//Destroying route - deleting request - /books/:id
router.delete('/:id', (req, res) => {
  // grab the id from params
  const id = req.params.id
  //Deleting the fruit
  Book.findByIdAndRemove(id)
    .then((book) => {
      //Redirecting user back to index
      res.redirect('/books')
    })
    // error handling
    .catch((error) => {
      res.json({ error })
    })
})

// show route - get - /books/:id
router.get('/:id', (req, res) => {
  // get the id from params
  const id = req.params.id

  // get that particular fruit from the database
  Book.findById(id)
    .then((book) => {
      // render the show template with the fruit
      res.render('books/show.liquid', { book })
    })
    // error handling
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})

/////////////////////////////
//Exporting the router
/////////////////////////////
module.exports = router
