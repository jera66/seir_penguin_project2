const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')


/////////////////////////////////////////
// Creating Router
/////////////////////////////////////////

const router = express.Router()

/////////////////////////////////////////
// Routes
/////////////////////////////////////////
// The Signup Routes (Get => form, post => submit form)
router.get('/signup', (req, res) => {
  res.render('user/signup.liquid')
})

router.post('/signup', async (req, res) => {
  //Encrypting passwords
  req.body.password = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10)
  )
  //Creating the new user
  User.create(req.body)
    .then((user) => {
      //Redirecting to login page
      res.redirect('/user/login')
    })
    .catch((error) => {
      //Sending error as json
      console.log(error)
      res.json({ error })
    })
})

// The login Routes (Get => form, post => submit form)
router.get('/login', (req, res) => {
  res.render('user/login.liquid')
})

router.post('/login', async (req, res) => {
  // get the data from the request body
  const { username, password } = req.body
  // search for the user
  User.findOne({ username })
    .then(async (user) => {
      //Checking if user exists
      if (user) {
        //Comparing password
        const result = await bcrypt.compare(password, user.password)
        if (result) {
          //Storing some properties in the session object
          req.session.username = username
          req.session.loggedIn = true
          //Redirecting to books page if successful
          res.redirect('/books')
        } else {
          // error if password doesn't match
          res.json({ error: "password doesn't match" })
        }
      } else {
        //Sending  error if user doesn't exist
        res.json({ error: "user doesn't exist" })
      }
    })
    .catch((error) => {
      //Sending error as json
      console.log(error)
      res.json({ error })
    })
})

router.get('/logout', (req, res) => {
  // destroy session and redirect to main page
  req.session.destroy((error) => {
    res.redirect('You have been logged out')
  })
})

module.exports = router