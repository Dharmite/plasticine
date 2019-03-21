const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require('passport');

// Load input validation
const validateLoginInput = require('../../validation/login')

// Load admin model
const Base = require("../../models/Base");

router.post("/login", (req, res) => {

  const {errors, isValid} = validateLoginInput(req.body);
  if(!isValid){

   return res.status(400).json(errors);
   
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email

  Base.findOne({ email: email }).then(user => {
    // check for user

    if (!user) {

      errors.email = "User not found";
      return res.status(404).json(errors.email);
    }

    // check user password
    // User password is plain text but in the db the password is encrypted

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User matched

        // Logged in user information
        const payload = { id: user.id, name: user.name, email: user.email, institution: user.institution}; // Create JWT Payload

        // Sign the token
        // Token valid for 3 hours, after that you have to login again
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 10800 }, (err, token) => {

          if(err) throw err;

          res.json({

            success: true,
            token: 'Bearer ' + token

          });


        });
      } else {

        errors.password = "Incorrect password";
        return res.status(400).json(errors.password);
      }
    });
  });
});

// @route GET api/users/current
// @desc Return current user
// @access Private

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {

  
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    institution: req.user.institution
  });

});

module.exports = router;