///////////////////////////////////
//Importing our Dependencies
///////////////////////////////////
const mongoose = require('./connection')
const Book = require('./book')


///////////////////////////////
// Seed Code
///////////////////////////////


//Saving the connection in a variable
const connect = mongoose.connection

// //Making sure the code doesn't run until the connection is open
// connect.on("open", () => {
//seed route - seed our starter data
router.get('/seed', (req, res) => {
  // array of starter fruits
  const books = [
    {
      author: 'Kenyatta Young',
      book: 'When whales fly',
      readyForPublishing: true
    },
    {
      author: 'Karl Czerny',
      book: 'Virtuosic piano solos',
      readyForPublishing: false
    },
    {
      author: 'C. S. Lewis',
      book: 'Mere christianity',
      readyForPublishing: false
    },
    {
      author: 'Thomas Aquinas',
      book: 'Treatise on law',
      readyForPublishing: false
    },
    {
      author: 'Alan Cohen',
      book: 'Dare to be yourself',
      readyForPublishing: true
    },
    {
      author: 'Stephen Hawking',
      book: 'God created the integers',
      readyForPublishing: true
    },
    {
      author: 'Michael Erard',
      book: 'Babel no more',
      readyForPublishing: true
    },
    {
      author: 'Tyler Perry',
      book: 'The haves and the have nots',
      readyForPublishing: false
    },
    { author: 'Apostle Paul', book: 'Acts', readyForPublishing: true },
    {
      author: 'Jerathel Jean',
      book: "It's snowing in hell",
      readyForPublishing: false
    },
    {
      author: 'Darellson Xaven',
      book: 'Exposing unreal people',
      readyForPublishing: false
    }
  ]

  //Deleting all books
  Book.deleteMany({}).then(data => {
    //Seed the starter books
    Book.create(books).then(data => {
      //Sending created books back as JSON
      res.json(data)
    })
  })
})
