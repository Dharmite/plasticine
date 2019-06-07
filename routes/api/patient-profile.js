const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Therapist = require("../../models/Therapist");
const Parent = require("../../models/Parent");
const Patient = require("../../models/Patient");

const auth_middleware = require("../../middlewares/auth");

const validateMedicineInput = require("../../validation/createMedicine");
const validatePatientInput = require("../../validation/createPatient");

// @route   GET api/patient-profile/all
// @desc    Get all patient profiles
// @access  Private

router.get("/all", (req, res) => {
  const errors = {};

  Patient.find()
    .populate("therapist")
    .then(patients => {
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
    .populate("therapist")
    .populate("parent")
    .populate("therapist")
    .populate("previousTherapists")
    .populate("therapeuticNote")
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

    const { errors, isValid } = validatePatientInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

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
    const { errors, isValid } = validateMedicineInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Patient.findById({ _id: req.params.patient_id })
      .then(patient => {
        if (!patient) {
          return res.status(400).json({ err: "Nenhum perfil encontrado" });
        } else {
          const newMedicine = {
            name: req.body.name,
            observation: req.body.observation,
            dosage: req.body.dosage,
            time: req.body.time,
            startingDate: req.body.startingDate,
            finishedDate: req.body.finishedDate
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
            time: req.body.time,
            startingDate: req.body.startingDate,
            finishedDate: req.body.finishedDate
          };
          let medicines = patient.medicine;
          let medicineIndex = medicines
            .map(medicine => medicine.id)
            .indexOf(req.params.medicine_id);

          medicines[medicineIndex].name = newMedicine.name;
          medicines[medicineIndex].observation = newMedicine.observation;
          medicines[medicineIndex].dosage = newMedicine.dosage;
          medicines[medicineIndex].time = newMedicine.time;
          medicines[medicineIndex].startingDate = newMedicine.startingDate;
          medicines[medicineIndex].finishedDate = newMedicine.finishedDate;

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

// @route   GET api/patient-profile/:patient_id/medicine/:medicine_id
// @desc    Show medicine
// @access  Private
router.get(
  "/:patient_id/medicine/:medicine_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Patient.findById({ _id: req.params.patient_id })
      .then(patient => {
        if (!patient) {
          return res.status(400).json({ err: "Nenhum perfil encontrado" });
        } else {
          let medicineObj = {};
          patient.medicine.forEach(medicine => {
            if (medicine._id == req.params.medicine_id) {
              medicineObj = medicine;
            }
          });

          res.json(medicineObj);
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

              parent.patient.forEach(elem => {
                if (elem == req.params.patient_id) {
                  association = true;
                }
              });

              if (association) {
                let removeIndex1 = patient.parent
                  .map(parent => parent.id)
                  .indexOf(req.params.parent_id);

                let removeIndex2 = parent.patient
                  .map(patient => patient.id)
                  .indexOf(req.params.patient_id);

                // Splice out of array

                patient.parent.splice(removeIndex1, 1);
                parent.patient.splice(removeIndex2, 1);

                parent.save();
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
      .populate("therapist")
      .then(patient => {
        if (!patient) {
          return res.status(400).json({ err: "Nenhum perfil encontrado" });
        } else {
          Therapist.findById({ _id: req.params.therapist_id })
            .then(therapist => {
              let user_association = false;

              if (therapist) {
                patient.therapist.forEach(elem => {
                  if (elem == req.params.therapist_id) {
                    user_association = true;

                    return res
                      .status(400)
                      .json({ err: "User já está associado ao paciente" });
                  }
                });
                therapist.patient.forEach(elem => {
                  if (elem == req.params.patient_id) {
                    user_association = true;

                    return res
                      .status(400)
                      .json({ err: "User já está associado ao terapeuta" });
                  }
                });

                if (user_association == false) {
                  therapist.patient.push(patient._id);
                  therapist
                    .save()
                    .then(therapist => {
                      let isPreviousTherapist = false;
                      let removeIndex;

                      for (
                        let index = 0;
                        index < patient.previousTherapists.length;
                        index++
                      ) {
                        if (
                          patient.previousTherapists[index] ==
                          req.params.therapist_id
                        ) {
                          removeIndex = patient.previousTherapists[index];
                          isPreviousTherapist = true;
                        }
                      }

                      if (isPreviousTherapist) {
                        patient.previousTherapists.splice(removeIndex, 1);

                        patient.previousTherapists = patient.previousTherapists;
                      }

                      patient.therapist.push(therapist._id);
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
                    .status(400)
                    .json({ err: "Utilizador já está associado" });
                }
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
          return res.status(404).json({ err: "Nenhum perfil encontrado" });
        } else {
          Therapist.findById({ _id: req.params.therapist_id })
            .then(therapist => {
              if (!therapist) {
                return res
                  .status(404)
                  .json({ err: "Nenhum perfil encontrado" });
              }
              let association = false;
              patient.therapist.forEach(elem => {
                if (elem == req.params.therapist_id) {
                  association = true;
                }
              });
              if (association) {
                let lista = [];
                patient.therapist.forEach(element => {
                  if (!element.equals(req.params.therapist_id)) {
                    lista.push(element);
                  }
                });

                patient.therapist = lista;

                let isPreviousTherapist = false;

                patient.previousTherapists.forEach(therapist => {
                  if (therapist.equals(req.params.therapist_id)) {
                    isPreviousTherapist = true;
                  }
                });

                if (!isPreviousTherapist) {
                  patient.previousTherapists.push(req.params.therapist_id);
                }

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
                      .then(therapist => res.json(patient))
                      .catch(err => res.json(err));
                  })
                  .catch(err => {
                    res.json(err);
                  });
              } else {
                return res
                  .status(400)
                  .json({ err: "Nenhum utilizador por remover" });
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
