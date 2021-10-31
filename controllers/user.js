//////////////////////////////
// Import Dependencies
//////////////////////////////
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

///////////////////////////////
// Create Router
///////////////////////////////
const router = express.Router()

////////////////////////////
// ROUTES
////////////////////////////

// The Signup Routes (Get => Form, Post => form submit)
// "/user/signup"
router.get('/signup', (req, res) => {
  res.render('user/signup.liquid')
})

router.post('/signup', async (req, res) => {
  //Encrypting password
  req.body.password = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10)
  )

  //Saving the user to our database
  User.create(req.body)
    .then(user => {
      //Logging the user as a test
      console.log(user)
      //Redirecting user to login
      res.redirect('/user/login')
    })
    // error handling
    .catch(error => {
      res.json({ error })
    })
})

// The login Routes (Get => Form, Post => form submit)
// "/user/login"
router.get('/login', (req, res) => {
  res.render('user/login.liquid')
})

router.post('/login', async (req, res) => {
  //Destructuring username and password from req.body
  const { username, password } = req.body

  //Searching for the user
  User.findOne({ username })
    .then(async user => {
      //Checking if the user exists
      if (user) {
        //Comparing passwords
        const result = await bcrypt.compare(password, user.password)
        if (result) {
          //Storing some data in the session object
          req.session.username = username
          req.session.loggedIn = true
          //Redirecting to books index page
          res.redirect('/books')
        } else {
          //Sending error of wrong password
          res.json({ error: "Passwords don't match!" })
        }
      } else {
        //Sending error that user doesn't exist
        res.json({ error: "Unknown user!" })
      }
    })
    //Error handling
    .catch(error => {
      res.json({ error })
    })
})

//Logout route, get request to /user/logout
router.get('/logout', (req, res) => {
  //Destroying the session
  req.session.destroy(error => {
    //Sending user back to main page
    res.redirect('/')
  })
})

////////////////////////////////
//Exporting the router
/////////////////////////////////
module.exports = router
