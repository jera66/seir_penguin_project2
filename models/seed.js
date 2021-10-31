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

///Making sure the code doesn't run until the connection is open
connect.on("open", () => {
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
    { author: 'Apostle Paul', book: 'Acts', readyForPublishing: true },
    {author: 'Jerathel Jean',title: "It's snowing in hell",readyForPublishing: false},
    {author: 'Darellson Xaven',title: 'Exposing unreal people',readyForPublishing: false},
  ]

  //Deleting all books
  Book.deleteMany({})
  .then((deletedBooks) => {
    //Seed the starter books
    Book.create(books)
    .then((newBooks) => {
      console.log(newBooks)
      connect.close()
    })
    .catch((error) => {
      console.log(error)
      connect.close()
    })
  })
  .catch((error) => {
      console.log(error)
      connect.close()
  })
})
