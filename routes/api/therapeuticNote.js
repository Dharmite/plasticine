const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");

const TherapeuticNote = require("../../models/TherapeuticNote");
const Patient = require("../../models/Patient");
const Base = require("../../models/Base");

const auth_middleware = require("../../middlewares/auth");

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
  const filetypes = /jpeg|jpg|png|gif|pdf|mp3|aac|ogg|m4a|wma|flac|wav|m4v|mov|flv|avi|mpg|wmv/;
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
              if (err) throw err;
              const newTherapeuticNote = {
                user: req.user.id,
                patient: req.params.patient_id,
                title: req.body.title,
                observation: req.body.observation,
                availableTo: [],
                files: []
              };

              let users = req.body.availableTo.split(";");

              if (users[0] == "") {
                users[0] = req.user.id;
                newTherapeuticNote.availableTo = users[0];
              }

              newTherapeuticNote.availableTo = users;

              req.files.forEach(file => {
                let fileObj = {
                  filename: file.filename,
                  destination: file.destination,
                  src: file.destination + file.filename
                };
                newTherapeuticNote.files.push(fileObj);
              });

              new TherapeuticNote(newTherapeuticNote)
                .save()
                .then(note => {
                  res.json(note);
                  note.availableTo.forEach(user => {
                    Base.findById(user)
                      .then(user => {
                        user.notes.push(note.id);
                        user
                          .save()
                          .then(user => {
                            patient.therapeuticNote.push(note);
                            patient
                              .save()
                              .then(patient => res.json(patient))
                              .catch(err => res.json(err));
                          })
                          .catch(err => res.json(err));
                      })
                      .catch(err => res.json(err));
                  });
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
              if (err) throw err;
              const newTherapeuticNote = {
                user: req.user.id,
                patient: req.params.patient_id,
                title: req.body.title,
                observation: req.body.observation,
                availableTo: [],
                files: []
              };

              let users = req.body.availableTo.split(";");

              if (users[0] == "") {
                users[0] = req.user.id;
                newTherapeuticNote.availableTo = users[0];
              }

              newTherapeuticNote.availableTo = users;

              req.files.forEach(file => {
                let fileObj = {
                  filename: file.filename,
                  destination: file.destination,
                  src: file.destination + file.filename
                };
                newTherapeuticNote.files.push(fileObj);
              });

              new TherapeuticNote(newTherapeuticNote)
                .save()
                .then(note => {
                  res.json(note);
                  note.availableTo.forEach(user => {
                    Base.findById(user)
                      .then(user => {
                        user.notes.push(note.id);
                        user
                          .save()
                          .then(user => {
                            patient.therapeuticNote.push(note);
                            patient
                              .save()
                              .then(patient => res.json(patient))
                              .catch(err => res.json(err));
                          })
                          .catch(err => res.json(err));
                      })
                      .catch(err => res.json(err));
                  });
                })
                .catch(err => res.json(err));
            });
          }

          // aqui!!!
        }
      })
      .catch(err => res.json(err));
  }
);

// @route GET api/therapeuticNote/notes/:note_id
// @desc GET Therapeutic Note
// @access Private

router.get(
  "/notes/:note_id",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapistOrParent,
  (req, res) => {
    TherapeuticNote.findById(req.params.note_id)
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

// @route POST api/therapeuticNote/:patient_id
// @desc EDIT Therapeutic Note
// @access Private

router.post(
  "/notes/:note_id",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isTherapistOrParent,
  (req, res) => {
    const newNote = {
      title: req.body.title,
      observation: req.body.observation
    };
    TherapeuticNote.findByIdAndUpdate(req.params.note_id, newNote)
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

// @route DELETE api/therapeuticNote/:patient_id
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
                    .then(user => res.json(user))
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

module.exports = router;
