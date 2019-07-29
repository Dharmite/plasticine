const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");

const TherapeuticNote = require("../../models/TherapeuticNote");
const Patient = require("../../models/Patient");
const Base = require("../../models/Base");

const auth_middleware = require("../../middlewares/auth");

const validateTherapeuticNoteInput = require("../../Validation/createTherapeuticNote");

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

// @route POST api/therapeuticNote/new/:patient_id
// @desc Create Therapeutic Note
// @access Private

router.post(
  "/new/:patient_id",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapistOrParent,
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
              const { errors, isValid } = validateTherapeuticNoteInput(
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
              const newTherapeuticNote = {
                user: req.user.id,
                patient: req.params.patient_id,
                title: req.body.title,
                observation: req.body.observation,
                activity: req.body.activity,
                behavior: req.body.behavior,
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
                newTherapeuticNote.files.push(fileObj);
              });

              new TherapeuticNote(newTherapeuticNote)
                .save()
                .then(note => {
                  
                  note.availableTo.forEach(user => {
                    Base.findById(user)
                      .then(user => {
                        user.notes.push(note.id);
                        user.save();
                      })
                      .catch(err => res.json(err));
                  });
                  patient.therapeuticNote.push(note);
                  patient.save();
                  res.json(note);
                })
                .catch(err => res.json(err));
            });
          }
        } else if (req.user.userType == "parent") {
          let authorizationParent = false;

          patient.parent.forEach(parent => {
            if (req.user.id == parent) {
              authorizationParent = true;
            }
          });

          if (!authorizationParent) {
            res.status(400).json({ msg: "Not authorized" });
          } else {
            upload(req, res, err => {
              let availableTo;
              if (req.body.availableTo == "") {
                availableTo = [req.user.id];
              } else {
                availableTo = req.body.availableTo.split(" ");
                availableTo.push(req.user.id);
              }

              if (err) throw err;
              const newTherapeuticNote = {
                user: req.user.id,
                patient: req.params.patient_id,
                title: req.body.title,
                observation: req.body.observation,
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
                newTherapeuticNote.files.push(fileObj);
              });

              new TherapeuticNote(newTherapeuticNote)
                .save()
                .then(note => {
                  note.availableTo.forEach(user => {
                    Base.findById(user)
                      .then(user => {
                        user.notes.push(note.id);
                        user.save();
                      })
                      .catch(err => res.json(err));
                  });
                  patient.therapeuticNote.push(note);
                  patient.save();
                  res.json(note);
                })
                .catch(err => res.json(err));
            });
          }
        }
      })
      .catch(err => res.json(err));
  }
);

// @route GET api/therapeuticNote/notesAvailable/:user_id
// @desc GET Therapeutic Note
// @access Private

// router.get(
//   "/notesAvailable/:user_id",
//   passport.authenticate("jwt", { session: false }),
//   auth_middleware.isTherapistOrParent,
//   (req, res) => {
//     TherapeuticNote.find()
//       .then(notes => {
//         if (!notes) {
//           return res.status(400).json({ err: "Nenhum registo encontrado" });
//         } else {
//           let availableNotes = [];

//           Base.findById(req.params.user_id).then(user => {
//             notes.forEach(note => {
//               note.availableTo.forEach(elem => {
//                 if (
//                   elem == req.params.user_id &&
//                   JSON.stringify(note.user) !==
//                     JSON.stringify(req.params.user_id)
//                 ) {
//                   availableNotes.push(note);
//                 }
//               });
//             });
//             res.json(availableNotes);
//           });
//         }
//       })
//       .catch(err => res.json(err));
//   }
// );

// @route GET api/therapeuticNote/notes/:note_id
// @desc GET Therapeutic Note
// @access Private

router.get(
  "/notes/:note_id",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapistOrParent,
  (req, res) => {
    TherapeuticNote.findById(req.params.note_id)
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

// @route GET api/therapeuticNote/notes
// @desc GET all Therapeutic Note
// @access Private

router.get(
  "/notes",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapistOrParent,
  (req, res) => {
    TherapeuticNote.find()
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

// @route POST api/therapeuticNote/notes/:note_id
// @desc EDIT Therapeutic Note
// @access Private

router.post(
  "/notes/:note_id",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapistOrParent,
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

        TherapeuticNote.findByIdAndUpdate(
          req.params.note_id,
          {
            _id: req.params.note_id,
            title: req.body.title,
            observation: req.body.observation,
            activity: req.body.activity,
            behavior: req.body.behavior,
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
        TherapeuticNote.findByIdAndUpdate(
          req.params.note_id,
          {
            _id: req.params.note_id,
            title: req.body.title,
            observation: req.body.observation,
            activity: req.body.activity,
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

// @route DELETE api/therapeuticNote/notes/:note_id
// @desc DELETE Therapeutic Note
// @access Private

router.delete(
  "/notes/:note_id",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapistOrParent,
  (req, res) => {
    TherapeuticNote.findByIdAndRemove(req.params.note_id)
      .then(note => {
        if (!note) {
          return res.status(400).json({ err: "Nenhum registo encontrado" });
        } else {
          Patient.findById(note.patient).then(patient => {
            let removeIndex = 0;

            for (
              let index = 0;
              index < patient.therapeuticNote.length;
              index++
            ) {
              if (patient.therapeuticNote[index] == req.params.note_id) {
                removeIndex = index;
              }
            }

            if (removeIndex == -1) {
              return res.status(400).json({ err: "Nenhuma nota encontrado" });
            }

            // Splice out of array
            patient.therapeuticNote.splice(removeIndex, 1);
            //       // Save
            patient.save().then(patient => {
              note.availableTo.forEach(user => {
                Base.findById(user).then(baseUser => {
                  let removeIndex = 0;

                  for (let index = 0; index < baseUser.notes.length; index++) {
                    if (baseUser.notes[index] == req.params.note_id) {
                      removeIndex = index;
                    }
                  }
                  if (removeIndex == -1) {
                    return res
                      .status(400)
                      .json({ err: "Nenhuma nota encontrada" });
                  }

                  // Splice out of array
                  baseUser.notes.splice(removeIndex, 1);
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

// @route GET api/therapeuticNote/patient/:patient_id/notes
// @desc GET Therapeutic Note by Patient
// @access Private

router.get(
  "/patient/:patient_id/notes",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapistOrParent,
  (req, res) => {
    Patient.findById(req.params.patient_id)
      .populate("therapeuticNote")
      .then(patient => {
        res.json(patient.therapeuticNote);
      })
      .catch(err => res.json(err));
  }
);

// @route   POST api/therapeuticNote/:note_id/feedback
// @desc    Add feedback to a note
// @access  Private
router.post(
  "/:note_id/feedback",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    TherapeuticNote.findById(req.params.note_id)
      .then(note => {
        if (!note) {
          return res.status(404).json({ err: "Nenhum registo encontrado" });
        } else {
          const newFeedback = {
            user: req.body.user,
            observation: req.body.observation
          };

          note.feedback.unshift(newFeedback);
          note.save().then(note => res.json(note));
        }
      })
      .catch(err => {
        res.json(err);
      });
  }
);

// @route   GET api/therapeuticNote/:note_id/feedback
// @desc    GET feedback to a note
// @access  Private
router.get(
  "/:note_id/feedback",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    TherapeuticNote.findById(req.params.note_id)
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

// @route DELETE api/therapeuticNote/notes/:note_id/:filename
// @desc DELETE file with given filename
// @access Private

router.delete(
  "/notes/:note_id/:filename",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapistOrAdmin,
  (req, res) => {
    TherapeuticNote.findById(req.params.note_id).then(note => {
      if (!note) {
        res.status(400).json({ error: "Não há nenhum recurso com esse id" });
      } else {

        note.files = note.files.filter(element => element.originalname !== req.params.filename);
        note.save().then(note => res.json(note));
        
      }
    });
  }
);


module.exports = router;