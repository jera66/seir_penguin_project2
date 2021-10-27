# Project 2

#### By Jerathel Jean

## Project Summary

Tell me what are your build and what tools are you using?
My build is a book and author database with user authentication in which the user can search for specific books or authors. 

## Models ##

List here any models in your app and their properties
My model here is books.js, this is where all the data pertaining to books goes. It will be required later in the main file which is server.js.



``` js
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
]
````

## Route Table

List your routes in a table

| url           | method | action                       |
| ---------     | ------ | ---------------------------- |
| /books/       | get    | get all books (index)        |
| /books/:id    | get    | get a particular book (show) |
|/books/new     | get    | get a new book (new)         |
|/books         | post   | create a new book            |
|/books/:id/edit| get    | edit a book                  |
|/books/:id     | put    | update a book                |
|/books/:id     | delete | delete a book                |



## User Stories
User should be able to create their own login credentials. They should be able to update, reset and delete their password.

## Challenges
So far, my challenge is structuring the app. I'm low on inspiration, not sure I want the app look. I have more than enough material to bring it into existence, however, I'm lacking inspiration.

- detail roadblocks and anything you did to overcome whether you did or didn't
I went back and revisited class materials, watched some of the recordings and paid special care and close attention to the fruits build. Now, having done that, I'm ready and inspired to set this app in motion.

## List of Technologies
I plan on using JavaScript, Express, Liquid, Mongo and any other relevant tools discussed in class to achieve this. I'd like to keep it simple.
