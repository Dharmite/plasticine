const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");

const ClinicalHistory = require("../../models/ClinicalHistory");
const Patient = require("../../models/Patient");
const Base = require("../../models/Base");

const auth_middleware = require("../../middlewares/auth");

const validateClinicalHistoryInput = require("../../Validation/createClinicalHistory");

// Set Storage Engine
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Init upload
const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).array("files");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|pdf|doc|mp3|aac|ogg|m4a|wma|flac|wav|m4v|mp4|mov|flv|avi|mpg|wmv/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Invalid file type!");
  }
}

// @route POST api/clinicalHistory/new/:patient_id
// @desc Create Clinical history Note
// @access Private

router.post(
  "/new/:patient_id",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapist,
  (req, res) => {
    Patient.findById(req.params.patient_id)
      .then(patient => {
        if (!patient) {
          res.status(404).json({ msg: "Patient not found" });
        }

        if (req.user.userType == "therapist") {
          let authorizationTherapist = false;

          patient.therapist.forEach(therapist => {
            if (req.user.id == therapist) {
              authorizationTherapist = true;
            }
          });

          if (!authorizationTherapist) {
            res.status(400).json({ msg: "Not authorized" });
          } else {
            upload(req, res, err => {
              const { errors, isValid } = validateClinicalHistoryInput(
                req.body
              );
              if (!isValid) {
                return res.status(400).json(errors);
              }
              let availableTo;

              if (req.body.availableTo == "") {
                availableTo = [req.user.id];
              } else {
                availableTo = req.body.availableTo.split(" ");
                availableTo.push(req.user.id);
              }

              if (err) throw err;
              const newClinicalHistory = {
                user: req.user.id,
                patient: req.params.patient_id,
                title: req.body.title,
                observation: req.body.observation,
                activity: req.body.activity,
                behavior: req.body.behavior,
                valuationDate: req.body.valuationDate,
                duration: req.body.duration,
                valuation: req.body.valuation,
                availableTo: availableTo,
                files: []
              };

              req.files.forEach(file => {
                let fileObj = {
                  filename: file.filename,
                  destination: file.destination,
                  src: file.destination + file.filename,
                  fileType: file.mimetype,
                  originalname: file.originalname
                };
                newClinicalHistory.files.push(fileObj);
              });

              new ClinicalHistory(newClinicalHistory)
                .save()
                .then(clinical => {
                  clinical.availableTo.forEach(user => {
                    Base.findById(user)
                      .then(user => {
                        user.clinicalHistory.push(clinical.id);
                        user.save();
                      })
                      .catch(err => res.json(err));
                  });
                  patient.clinicalHistory.push(clinical);
                  patient.save();
                  res.json(clinical);
                })
                .catch(err => res.json(err));
            });
          }
        }
      })
      .catch(err => res.json(err));
  }
);

// @route GET api/clinicalHistory/notes/:note_id
// @desc GET clinical History
// @access Private

router.get(
  "/notes/:note_id",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapistOrParent,
  (req, res) => {
    ClinicalHistory.findById(req.params.note_id)
      .populate("user")
      .populate("patient")
      .populate("availableTo")
      .populate("feedback.user")
      .then(note => {
        if (!note) {
          return res.status(400).json({ err: "Nenhum registo encontrado" });
        } else {
          res.json(note);
        }
      })
      .catch(err => res.json(err));
  }
);

// @route GET api/clinicalHistory/notes
// @desc GET all Clinical History
// @access Private

router.get(
  "/notes",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapistOrParent,
  (req, res) => {
    ClinicalHistory.find()
      .populate("user")
      .then(notes => {
        if (!notes) {
          return res.status(400).json({ err: "Nenhum registo encontrado" });
        } else {
          res.json(notes);
        }
      })
      .catch(err => res.json(err));
  }
);

// // @route POST api/clinicalHistory/notes/:note_id
// // @desc EDIT Clinical History
// // @access Private

router.post(
  "/notes/:note_id",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapist,
  (req, res) => {
    upload(req, res, err => {
      let upload_files = [];

      let availableTo;

      if (req.body.availableTo == "") {
        availableTo = [req.user.id];
      } else {
        availableTo = req.body.availableTo.split(" ");
        availableTo.push(req.user.id);
      }

      if (req.files.length > 0) {
        req.files.forEach(file => {
          let fileObj = {
            filename: file.filename,
            destination: file.destination,
            src: file.destination + file.filename,
            fileType: file.mimetype,
            originalname: file.originalname
          };
          upload_files.push(fileObj);
        });

        ClinicalHistory.findByIdAndUpdate(
          req.params.note_id,
          {
            _id: req.params.note_id,
            title: req.body.title,
            observation: req.body.observation,
            activity: req.body.activity,
            behavior: req.body.behavior,
            valuationDate: req.body.valuationDate,
            duration: req.body.duration,
            valuation: req.body.valuation,
            availableTo: availableTo,
            files: upload_files
          },
          { new: true }
        )
          .then(note => {
            if (!note) {
              return res.status(400).json({ err: "Nenhum registo encontrado" });
            } else {
              res.json(note);
            }
          })
          .catch(err => res.json(err));
      } else {
        if (req.body.availableTo == "") {
          availableTo = [req.user.id];
        } else {
          availableTo = req.body.availableTo.split(" ");
          availableTo.push(req.user.id);
        }
        ClinicalHistory.findByIdAndUpdate(
          req.params.note_id,
          {
            _id: req.params.note_id,
            title: req.body.title,
            observation: req.body.observation,
            activity: req.body.activity,
            valuationDate: req.body.valuationDate,
            duration: req.body.duration,
            valuation: req.body.valuation,
            availableTo: availableTo,
            behavior: req.body.behavior
          },
          { new: true }
        )
          .then(note => {
            if (!note) {
              return res.status(400).json({ err: "Nenhum registo encontrado" });
            } else {
              res.json(note);
            }
          })
          .catch(err => res.json(err));
      }
    });
  }
);

// // @route DELETE api/clinicalHistory/notes/:note_id
// // @desc DELETE Clinical History
// // @access Private

router.delete(
  "/notes/:note_id",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapist,
  (req, res) => {
    ClinicalHistory.findByIdAndRemove(req.params.note_id)
      .then(note => {
        if (!note) {
          return res.status(400).json({ err: "Nenhum registo encontrado" });
        } else {
          Patient.findById(note.patient).then(patient => {
            let removeIndex = 0;

            for (
              let index = 0;
              index < patient.clinicalHistory.length;
              index++
            ) {
              if (patient.clinicalHistory[index] == req.params.note_id) {
                removeIndex = index;
              }
            }

            if (removeIndex == -1) {
              return res.status(400).json({ err: "Nenhuma nota encontrado" });
            }

            // Splice out of array
            patient.clinicalHistory.splice(removeIndex, 1);
            //       // Save
            patient.save().then(patient => {
              note.availableTo.forEach(user => {
                Base.findById(user).then(baseUser => {
                  let removeIndex = 0;

                  for (let index = 0; index < baseUser.clinicalHistory.length; index++) {
                    if (baseUser.clinicalHistory[index] == req.params.note_id) {
                      removeIndex = index;
                    }
                  }
                  if (removeIndex == -1) {
                    return res
                      .status(400)
                      .json({ err: "Nenhuma nota encontrada" });
                  }

                  // Splice out of array
                  baseUser.clinicalHistory.splice(removeIndex, 1);
                  baseUser
                    .save()
                    .then(user => res.json(note))
                    .catch(err => res.json(err));
                });
              });
            });
          });
        }
      })
      .catch(err => res.json(err));
  }
);

// // @route GET api/clinicalHistory/patient/:patient_id/notes
// // @desc GET Clinical History by Patient
// // @access Private

router.get(
  "/patient/:patient_id/notes",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapistOrParent,
  (req, res) => {
    Patient.findById(req.params.patient_id)
      .populate("clinicalHistory")
      .then(patient => {
        res.json(patient.clinicalHistory);
      })
      .catch(err => res.json(err));
  }
);

// // @route   POST api/clinicalHistory/:note_id/feedback
// // @desc    Add feedback to a note
// // @access  Private


router.post(
  "/:note_id/feedback",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ClinicalHistory.findById(req.params.note_id)
      .then(note => {
        if (!note) {
          return res.status(404).json({ err: "Nenhum registo encontrado" });
        } else {
          const newFeedback = {
            user: req.body.user,
            observation: req.body.observation
          };

          console.log(req.body.observation, "observation");

          note.feedback.unshift(newFeedback);
          note.save().then(note => res.json(note));
        }
      })
      .catch(err => {
        res.json(err);
      });
  }
);

// // @route   GET api/clinicalHistory/:note_id/feedback
// // @desc    GET feedback to a note
// // @access  Private



router.get(
  "/:note_id/feedback",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ClinicalHistory.findById(req.params.note_id)
      .then(note => {
        if (!note) {
          return res.status(404).json({ err: "Nenhum registo encontrado" });
        } else {
          res.json(note.feedback);
        }
      })
      .catch(err => {
        res.json(err);
      });
  }
);

router.get("/:filename/download", function(req, res, next) {
  res.download(
    `${path.dirname(req.params.filename)}\\uploads\\${req.params.filename}`,
    req.params.filename
  );
});

// // @route DELETE api/clinicalHistory/notes/:note_id/:filename
// // @desc DELETE file with given filename
// // @access Private

router.delete(
  "/notes/:note_id/:filename",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapistOrAdmin,
  (req, res) => {
    ClinicalHistory.findById(req.params.note_id).then(note => {
      if (!note) {
        res.status(400).json({ error: "Não há nenhum recurso com esse id" });
      } else {
        note.files = note.files.filter(
          element => element.originalname !== req.params.filename
        );
        note.save().then(note => res.json(note));
      }
    });
  }
);

module.exports = router;
