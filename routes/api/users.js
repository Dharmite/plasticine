const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../Validation/adminRegister");

// Load input validation
const validateLoginInput = require("../../validation/login");

const Base = require("../../models/Base");

// Load admin model
const Admin = require("../../models/Admin");

const Therapist = require("../../models/Therapist");
const Parent = require("../../models/Parent");
const Patient = require("../../models/Patient");

const auth_middleware = require("../../middlewares/auth");

// @route POST api/admin/register
// @desc Register admin
// @access Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Admin.findOne({ email: req.body.email }).then(admin => {
    if (admin) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newAdmin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email

  Base.findOne({ email: email })
    .populate("patient")
    .populate("previousPatients")
    .populate("notes")
    .populate({
      path: "patient",
      populate: {
        path: "therapist",
        model: "base"
      }
    })
    .then(user => {
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

          let payload;

          if (user.userType == "therapist") {
            payload = {
              id: user.id,
              name: user.name,
              email: user.email,
              userType: user.userType,
              specialty: user.specialty,
              patient: user.patient,
              previousPatients: user.previousPatients,
              notes: user.notes
            };
          }
          if (user.userType == "admin") {
            payload = {
              id: user.id,
              name: user.name,
              email: user.email,
              userType: user.userType
            };
          }
          if (user.userType == "parent") {
            payload = {
              id: user.id,
              name: user.name,
              email: user.email,
              userType: user.userType,
              patient: user.patient,
              notes: user.notes
            };
          }
          // Create JWT Payload

          // Sign the token
          jwt.sign(payload, keys.secretOrKey, (err, token) => {
            if (err) throw err;

            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
        } else {
          errors.password = "Incorrect password";
          return res.status(400).json({ password: errors.password });
        }
      });
    });
});

// @route GET api/users/current
// @desc Return current user
// @access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

// @route GET api/users/therapist/:therapist_id
// @desc Return therapist
// @access Private

router.get(
  "/therapist/:therapist_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Therapist.findById(req.params.therapist_id)
      .populate("patient")
      .populate("notes")
      .populate({
        path: "patient",
        populate: {
          path: "therapist",
          model: "base"
        }
      })
      .then(therapist => {
        if (!therapist) {
          res
            .status(404)
            .json({ error: "Não há nenhum terapeuta com esse id" });
        } else {
          res.json(therapist);
        }
      })
      .catch(err => res.json(err));
  }
);

// @route GET api/users/therapist/:therapist_name
// @desc Return therapist
// @access Private

router.get(
  `/therapist/name/${encodeURI(":therapist_name")}`,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Therapist.findOne({ name: req.params.therapist_name })
      .then(therapist => {
        if (!therapist) {
          res
            .status(404)
            .json({ error: "Não há nenhum terapeuta com esse nome" });
        } else {
          res.json(therapist);
        }
      })
      .catch(err => res.json(err));
  }
);

// @route GET api/users/parent/:parent_name
// @desc Return parent
// @access Private

router.get(
  `/parent/name/${encodeURI(":parent_name")}`,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Parent.findOne({ name: req.params.parent_name })
      .then(parent => {
        if (!parent) {
          res
            .status(404)
            .json({ error: "Não há nenhum parente com esse nome" });
        } else {
          res.json(parent);
        }
      })
      .catch(err => res.json(err));
  }
);

// @route GET api/users/parent/:parent_id
// @desc Return parent
// @access Private

router.get(
  "/parent/:parent_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Parent.findById(req.params.parent_id)
      .then(parent => {
        if (!parent) {
          res.status(404).json({ error: "Não há nenhum parente com esse id" });
        } else {
          res.json(parent);
        }
      })
      .catch(err => res.json(err));
  }
);

// @route GET api/users/therapist/all
// @desc Return all therapists
// @access Private

router.get(
  "/therapists",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Therapist.find()
      .populate("patient")
      .populate("notes")
      .then(therapists => {
        if (!therapists) {
          res.status(404).json({ error: "Não há terapeutas" });
        } else {
          res.json(therapists);
        }
      })
      .catch(err => res.json(err));
  }
);

// @route GET api/users/parent/all
// @desc Return all parents
// @access Private

router.get(
  "/parents",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Parent.find()
      .populate("patient ")
      .then(parents => {
        if (!parents) {
          res.status(404).json({ error: "Não há parents" });
        } else {
          res.json(parents);
        }
      })
      .catch(err => res.json(err));
  }
);

// @route POST api/users/parent/:parent_id
// @desc Edit parent with given id
// @access Private

router.post(
  "/parent/:parent_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newParent = {
      name: req.body.name,
      email: req.body.email
    };

    Parent.findByIdAndUpdate(req.params.parent_id, newParent).then(parent => {
      if (!parent) {
        res.status(400).json({ error: "Não há nenhum parente com esse id" });
      } else {
        res.json(parent);
      }
    });
  }
);

// @route POST api/users/therapist/:therapist_id
// @desc Edit therapist with given id
// @access Private

router.post(
  "/therapist/:therapist_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newTherapist = {
      name: req.body.name,
      email: req.body.email,
      specialty: req.body.specialty
    };

    Therapist.findByIdAndUpdate(req.params.therapist_id, newTherapist).then(
      therapist => {
        if (!therapist) {
          res
            .status(400)
            .json({ error: "Não há nenhum terapeuta com esse id" });
        } else {
          res.json(therapist);
        }
      }
    );
  }
);

// @route POST api/users/therapist/password
// @desc Change password
// @access Private

router.post(
  "/therapist/password",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapist,
  (req, res) => {
    Therapist.findById(req.user.id).then(therapist => {
      if (!therapist) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        bcrypt
          .compare(req.body.oldpassword, req.user.password)
          .then(isMatch => {
            if (isMatch) {
              bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.newpassword, salt, function(err, hash) {
                  // res.json(therapist.password);
                  therapist.password = hash;

                  therapist
                    .save()
                    .then(therapist => res.json(therapist))
                    .catch(err => console.log(err));
                });
              });
            } else {
              error: "A password adicionada não corresponde à password atual";
            }
          });
      }
    });
  }
);

// @route POST api/users/parent/password
// @desc Change password
// @access Private

router.post(
  "/parent/password",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isParent,
  (req, res) => {
    Parent.findById(req.user.id).then(parent => {
      if (!parent) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        bcrypt
          .compare(req.body.oldpassword, req.user.password)
          .then(isMatch => {
            if (isMath) {
              bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.newpassword, salt, function(err, hash) {
                  // res.json(parent.password);
                  parent.password = hash;

                  parent
                    .save()
                    .then(parent => res.json(parent))
                    .catch(err => console.log(err));
                });
              });
            } else {
              res.json({
                error: "A password adicionada não corresponde à password atual"
              });
            }
          });
      }
    });
  }
);

// @route GET api/users/therapist/patients
// @desc Get users patients list nao funciona!!!
// @access Private

router.get(
  "/therapist-patients",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Therapist.findById(req.user.id)
      .populate("patient")
      .then(therapist => {
        if (!therapist) {
          return res.status(404).json({ email: "User not found" });
        } else {
          res.json(therapist.patient);
        }
      });
  }
);
module.exports = router;
