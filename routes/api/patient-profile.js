const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Therapist = require("../../models/Therapist");
const Parent = require("../../models/Parent");
const Patient = require("../../models/Patient");

const auth_middleware = require("../../middlewares/auth");

// @route   GET api/patient-profile/all
// @desc    Get all patient profiles
// @access  Private

router.get("/all", (req, res) => {
  const errors = {};

  Patient.find()
    .then(patients => {
      if (patients.length === 0) {
        errors.noprofile = "Não há nenhum perfil para mostrar";
        return res.status(404).json(errors);
      }

      res.json(patients);
    })
    .catch(err =>
      res.status(404).json({ profile: "Não há nenhum perfil para mostrar" })
    );
});

// @route   GET api/patient-profile/patient/:patient_id
// @desc    Get patient by ID
// @access  Private

router.get("/patient/:patient_id", (req, res) => {
  const errors = {};

  Patient.findOne({ _id: req.params.patient_id })
    .then(patient => {
      if (!patient) {
        errors.noprofile = "Nenhum perfil encontrado";
        res.status(404).json(errors);
      }

      res.json(patient);
    })
    .catch(err =>
      res.status(404).json({ profile: "Nenhum perfil encontrado" })
    );
});

// @route   DELETE api/patient-profile/patient/:patient_id
// @desc    Delete patient by ID
// @access  Private
router.delete(
  "/patient/:patient_id",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isAdmin,
  (req, res) => {
    Patient.findOneAndRemove({ _id: req.params.patient_id })
      .then(patient => {
        if (!patient) {
          errors.noprofile = "Nenhum perfil encontrado";
          res.status(404).json(errors);
        }

        res.json(patient);
      })
      .catch(err =>
        res.status(404).json({ profile: "Nenhum perfil encontrado" })
      );
  }
);

// @route   POST api/patient-profile/patient/:patient_id
// @desc    Update patient user
// @access  Private
router.post(
  "/patient/:patient_id",
  passport.authenticate("jwt", { session: false }),
  auth_middleware.isAdmin,
  (req, res) => {
    const newPatient = {
      name: req.body.name,
      age: req.body.age,
      clinicalStatus: req.body.clinicalStatus,
      schoolName: req.body.schoolName,
      schoolSchedule: req.body.schoolSchedule
    };

    Patient.findByIdAndUpdate({ _id: req.params.patient_id }, newPatient)
      .then(patient => {
        if (!patient) {
          return res.status(400).json({ err: "Nenhum perfil encontrado" });
        }
        res.json(patient);
      })
      .catch(err => {
        res.json(err);
      });
  }
);

// @route   POST api/patient-profile/:patient_id/medicine
// @desc    Add medicine to the user
// @access  Private
router.post(
  "/:patient_id/medicine",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Patient.findById({ _id: req.params.patient_id })
      .then(patient => {
        if (!patient) {
          return res.status(400).json({ err: "Nenhum perfil encontrado" });
        } else {
          const newMedicine = {
            name: req.body.name,
            observation: req.body.observation,
            dosage: req.body.dosage,
            time: req.body.time
          };

          patient.medicine.unshift(newMedicine);
          patient.save().then(patient => res.json(patient));
        }
      })
      .catch(err => {
        res.json(err);
      });
  }
);

// @route   POST api/patient-profile/:patient_id/medicine/:medicine_id
// @desc    EDIT medicine to the user
// @access  Private
router.post(
  "/:patient_id/medicine/:medicine_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Patient.findById({ _id: req.params.patient_id })
      .then(patient => {
        if (!patient) {
          return res.status(400).json({ err: "Nenhum perfil encontrado" });
        } else {
          const newMedicine = {
            name: req.body.name,
            observation: req.body.observation,
            dosage: req.body.dosage,
            time: req.body.time
          };
          let medicines = patient.medicine;
          let medicineIndex = medicines
            .map(medicine => medicine.id)
            .indexOf(req.params.medicine_id);

          medicines[medicineIndex].name = newMedicine.name;
          medicines[medicineIndex].observation = newMedicine.observation;
          medicines[medicineIndex].dosage = newMedicine.dosage;
          medicines[medicineIndex].time = newMedicine.time;

          patient.save().then(patient => res.json(patient));
        }
      })
      .catch(err => {
        res.json(err);
      });
  }
);

// @route   DELETE api/patient-profile/:patient_id/medicine/:medicine_id
// @desc    Delete users medicine
// @access  Private
router.delete(
  "/:patient_id/medicine/:medicine_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Patient.findById({ _id: req.params.patient_id })
      .then(patient => {
        if (!patient) {
          return res.status(400).json({ err: "Nenhum perfil encontrado" });
        } else {
          // Get remove index
          const removeIndex = patient.medicine
            .map(medicine => medicine.id)
            .indexOf(req.params.medicine_id);

          if (removeIndex == -1) {
            return res
              .status(400)
              .json({ err: "Nenhum medicamento encontrado" });
          }

          // Splice out of array
          patient.medicine.splice(removeIndex, 1);

          // Save
          patient.save().then(patient => res.json(patient));
        }
      })
      .catch(err => {
        res.json(err);
      });
  }
);

// @route   GET api/patient-profile/:patient_id/medicine/all
// @desc    Show users medicine
// @access  Private
router.get(
  "/:patient_id/medicine/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Patient.findById({ _id: req.params.patient_id })
      .then(patient => {
        if (!patient) {
          return res.status(400).json({ err: "Nenhum perfil encontrado" });
        } else {
          res.json(patient.medicine);
        }
      })
      .catch(err => {
        res.json(err);
      });
  }
);

// @route   POST api/patient-profile/:patient_id/parent/:parent_id
// @desc    Add parent to patient
// @access  Private
router.post(
  "/:patient_id/parent/:parent_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Patient.findById({ _id: req.params.patient_id })
      .then(patient => {
        if (!patient) {
          return res.status(400).json({ err: "Nenhum perfil encontrado" });
        } else {
          Parent.findById({ _id: req.params.parent_id })
            .then(parent => {
              patient.parent.forEach(elem => {
                if (elem == req.params.parent_id) {
                  return res
                    .status(400)
                    .json({ err: "User já está associado ao paciente" });
                }
              });
              parent.patient.push(patient);
              parent
                .save()
                .then(parent => {
                  patient.parent.push(parent);
                  patient
                    .save()
                    .then(patient => res.json(patient))
                    .catch(err => {
                      res.json(err);
                    });
                })
                .catch(err => {
                  res.json(err);
                });
              res.json(parent);
            })
            .catch(err => {
              res.json(err);
            });
        }
      })
      .catch(err => {
        res.json(err);
      });
  }
);

// @route   DELETE api/patient-profile/:patient_id/parent/:parent_id
// @desc    Remove parent from patient
// @access  Private
router.delete(
  "/:patient_id/parent/:parent_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Patient.findById({ _id: req.params.patient_id })
      .then(patient => {
        if (!patient) {
          return res.status(400).json({ err: "Nenhum perfil encontrado" });
        } else {
          Parent.findById({ _id: req.params.parent_id })
            .then(parent => {
              let association = false;
              patient.parent.forEach(elem => {
                if (elem == req.params.parent_id) {
                  association = true;
                }
              });
              if (association) {
                let removeIndex = patient.parent
                  .map(parent => parent.id)
                  .indexOf(req.params.parent_id);
                // Splice out of array
                patient.parent.splice(removeIndex, 1);

                // Save
                patient
                  .save()
                  .then(patient => res.json(patient))
                  .catch(err => {
                    res.json(err);
                  });
              } else {
                return res.status(400).json({ err: "Nenhum user por remover" });
              }
            })
            .catch(err => {
              res.json(err);
            });
        }
      })
      .catch(err => {
        res.json(err);
      });
  }
);

// @route   POST api/patient-profile/:patient_id/therapist/:therapist_id
// @desc    Add therapist to patient
// @access  Private
router.post(
  "/:patient_id/therapist/:therapist_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Patient.findById({ _id: req.params.patient_id })
      .then(patient => {
        if (!patient) {
          return res.status(400).json({ err: "Nenhum perfil encontrado" });
        } else {
          Therapist.findById({ _id: req.params.therapist_id })
            .then(therapist => {
              if (therapist) {
                patient.therapist.forEach(elem => {
                  if (elem == req.params.therapist_id) {
                    return res
                      .status(400)
                      .json({ err: "User já está associado ao paciente" });
                  }
                });

                therapist.patient.forEach(elem => {
                  if (elem == req.params.patient_id) {
                    return res
                      .status(400)
                      .json({ err: "User já está associado ao paciente" });
                  }
                });
                therapist.patient.push(patient.id);
                therapist
                  .save()
                  .then(therapist => {
                    patient.therapist.push(therapist.id);
                    patient
                      .save()
                      .then(patient => res.json(patient))
                      .catch(err => {
                        res.json(err);
                      });
                  })
                  .catch(err => {
                    res.json(err);
                  });
              } else {
                return res
                  .status(404)
                  .json({ err: "Nenhum perfil encontrado" });
              }
            })
            .catch(err => {
              res.json(err);
            });
        }
      })
      .catch(err => {
        res.json(err);
      });
  }
);

// @route   DELETE api/patient-profile/:patient_id/therapist/:therapist_id
// @desc    Remove therapist from patient
// @access  Private
router.delete(
  "/:patient_id/therapist/:therapist_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Patient.findById({ _id: req.params.patient_id })
      .then(patient => {
        if (!patient) {
          return res.status(400).json({ err: "Nenhum perfil encontrado" });
        } else {
          Therapist.findById({ _id: req.params.therapist_id })
            .then(therapist => {
              if (!therapist) {
                return res
                  .status(400)
                  .json({ err: "Nenhum perfil encontrado" });
              }
              let association = false;
              patient.therapist.forEach(elem => {
                if (elem == req.params.therapist_id) {
                  association = true;
                }
              });
              if (association) {
                let removeIndex = patient.therapist
                  .map(therapist => therapist.id)
                  .indexOf(req.params.therapist_id);
                // Splice out of array
                patient.therapist.splice(removeIndex, 1);
                patient.previousTherapists.push(therapist.id);

                // Save
                patient
                  .save()
                  .then(patient => {
                    let removeIndex = therapist.patient
                      .map(patient => patient.id)
                      .indexOf(req.params.patient_id);
                    // Splice out of array
                    therapist.patient.splice(removeIndex, 1);
                    therapist.previousPatients.push({
                      name: patient.name,
                      age: patient.age,
                      clinicalStatus: patient.clinicalStatus,
                      schoolName: patient.schoolName,
                      schoolSchedule: patient.schoolSchedule,
                      medicine: patient.medicine,
                      parent: patient.parent,
                      therapeuticNote: patient.therapeuticNote
                    });
                    therapist
                      .save()
                      .then(therapist => res.json(therapist))
                      .catch(err => res.json(err));
                  })
                  .catch(err => {
                    res.json(err);
                  });
              } else {
                return res.status(400).json({ err: "Nenhum user por remover" });
              }
            })
            .catch(err => {
              res.json(err);
            });
        }
      })
      .catch(err => {
        res.json(err);
      });
  }
);

module.exports = router;
