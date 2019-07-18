const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

const auth_middleware = require("../../middlewares/auth");

const Therapist = require("../../models/Therapist");
const Parent = require("../../models/Parent");
const Patient = require("../../models/Patient");

const validateTherapistInput = require("../../Validation/createTherapist");

const validateParentInput = require("../../Validation/createParent");

const validatePatientInput = require("../../Validation/createPatient");

const validatePasswordInput = require("../../Validation/changePassword");

const Base = require("../../models/Base");

// @route GET api/admin/dashboard
// @desc admin dashboard
// @access Private

router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isAdmin,
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      userType: req.user.userType
    });
  }
);

// @route GET api/admin/:admin_id
// @desc admin dashboard
// @access Private

router.get("/:admin_id", (req, res) => {
  Base.findById(req.params.admin_id)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.json(err));
});

// @route POST api/admin/therapist
// @desc create therapist account
// @access Private

router.post(
  "/therapist",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isAdmin,
  (req, res) => {
    const { errors, isValid } = validateTherapistInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Therapist.findOne({ email: req.body.email })
      .then(therapist => {
        if (therapist) {
          return res
            .status(400)
            .json({ email: "Já existe um utilizador com esse email" });
        } else {
          const newTherapist = new Therapist({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            specialty: req.body.specialty
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newTherapist.password, salt, (err, hash) => {
              if (err) throw err;
              newTherapist.password = hash;
              newTherapist
                .save()
                .then(therapist => res.json(therapist))
                .catch(err => console.log(err));
            });
          });
        }
      })
      .catch(err => console.log(err));
  }
);

// @route DELETE api/admin/therapist/:therapist_id
// @desc delete therapist account
// @access Private

// router.delete(
//   "/therapist/:therapist_id",
//   passport.authenticate("jwt", { session: false }),
//   auth_middleware.isAdmin,
//   (req, res) => {
//     Therapist.findByIdAndRemove(req.params.therapist_id)
//       .then(therapist => {
//         if (therapist) {
//           therapist.patient.forEach(elem => {
//             Patient.findById(elem)
//               .then(patient => {
//                 patient.therapist.forEach(therapistUser => {
//                   if (therapistUser == therapist.id) {
//                     let removeIndex = patient.therapist.indexOf(therapist.id);
//                     patient.therapist.splice(removeIndex, 1);
//                     // Save
//                     patient
//                       .save()
//                       .then(patient => res.json(patient))
//                       .catch(err => {
//                         res.json(err);
//                       });
//                   }
//                 });
//               })
//               .catch(err => res.json(err));
//           });
//         } else {
//           return res
//             .status(404)
//             .json({ email: "Nenhum utilizador encontrado" });
//         }
//       })
//       .catch(err => console.log(err));
//   }
// );

// @route POST api/admin/parent
// @desc create parent account
// @access Private

router.post(
  "/parent",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isAdmin,
  (req, res) => {
    const { errors, isValid } = validateParentInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Parent.findOne({ email: req.body.email })
      .then(parent => {
        if (parent) {
          return res
            .status(400)
            .json({ email: "Já existe um utilizador com esse email" });
        } else {
          const newParent = new Parent({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newParent.password, salt, (err, hash) => {
              if (err) throw err;
              newParent.password = hash;
              newParent
                .save()
                .then(parent => res.json(parent))
                .catch(err => console.log(err));
            });
          });
        }
      })
      .catch(err => console.log(err));
  }
);

// @route DELETE api/admin/therapist/:therapist_id
// @desc delete therapist account
// @access Private

// router.delete(
//   "/parent/:parent_id",
//   passport.authenticate("jwt", { session: false }),
//   auth_middleware.isAdmin,
//   (req, res) => {
//     Parent.findByIdAndRemove(req.params.parent_id)
//       .then(parent => {
//         if (parent) {
//           parent.patient.forEach(elem => {
//             Patient.findById(elem)
//               .then(patient => {
//                 patient.parent.forEach(parentUser => {
//                   if (parentUser == parent.id) {
//                     let removeIndex = patient.parent.indexOf(parent.id);
//                     patient.parent.splice(removeIndex, 1);
//                     // Save
//                     patient
//                       .save()
//                       .then(patient => res.json(patient))
//                       .catch(err => {
//                         res.json(err);
//                       });
//                   }
//                 });
//               })
//               .catch(err => res.json(err));
//           });
//         } else {
//           return res
//             .status(404)
//             .json({ email: "Nenhum utilizador encontrado" });
//         }
//       })
//       .catch(err => console.log(err));
//   }
// );

// @route   POST api/admin/patient
// @desc    Create patient user
// @access  Private
router.post(
  "/patient",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isAdmin,
  (req, res) => {
    const { errors, isValid } = validatePatientInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const newPatient = new Patient({
      name: req.body.name,
      birthday: req.body.birthday,
      clinicalStatus: req.body.clinicalStatus,
      schoolName: req.body.schoolName,
      schoolSchedule: req.body.schoolSchedule,
      age: Math.floor((Date.now() - new Date(req.body.birthday)) / 1000 / 60 / 60 / 24 / 365)
    });


    newPatient
      .save()
      .then(patient => res.json(patient))
      .catch(err => console.log(err));
  }
);

// @route   DELETE api/admin/patient/:patient_id
// @desc    Delete patient user
// @access  Private
// router.delete(
//   "/patient/:patient_id",
//   passport.authenticate("jwt", { session: false }),
//   auth_middleware.isAdmin,
//   (req, res) => {
//     Patient.findByIdAndRemove(req.params.patient_id)
//       .then(patient => res.json(patient))
//       .catch(err => res.json(err));
//   }
// );

// @route POST api/admin/password
// @desc Change password
// @access Private

router.post(
  "/password",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePasswordInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Admin.findById(req.user.id).then(admin => {
      if (!admin) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        bcrypt.compare(req.body.oldpassword, req.user.password).then(isMath => {
          if (isMath) {
            bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(req.body.newpassword, salt, function(err, hash) {
                admin.password = hash;

                admin
                  .save()
                  .then(admin => res.json(admin))
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

module.exports = router;
