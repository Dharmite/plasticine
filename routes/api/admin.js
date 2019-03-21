const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../../validation/adminregister')

// Load admin model
const Admin = require("../../models/Admin");

// @route POST api/admin/register
// @desc Register admin
// @access Public

router.post("/register", (req, res) => {

  
  const {errors, isValid} = validateRegisterInput(req.body);
  if(!isValid){

   return res.status(400).json(errors);
   
  }
  Admin.findOne({ email: req.body.email }).then(admin => {
    if (admin) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newAdmin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        institution: req.body.institution
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.password = hash;
          newAdmin
            .save()
            .then(admin => res.json(admin))
            .catch(err => console.log(err));
        });
      });
    }
  });
});


module.exports = router;