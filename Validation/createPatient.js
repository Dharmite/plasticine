const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePatientInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.age = !isEmpty(data.age) ? data.age : "";
  data.clinicalStatus = !isEmpty(data.clinicalStatus)
    ? data.clinicalStatus
    : "";
  data.schoolName = !isEmpty(data.schoolName) ? data.schoolName : "";
  data.schoolSchedule = !isEmpty(data.schoolSchedule)
    ? data.schoolSchedule
    : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Nome deve conter entre e 2 e 30 caracteres";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Este campo tem que ser preenchido";
  }

  if (!Validator.isNumeric(data.age)) {
    errors.age = "Este campo tem que ser preenchido com números";
  }

  if (Validator.isEmpty(data.age)) {
    errors.age = "Este campo tem que ser preenchido";
  }

  if (!Validator.isLength(data.clinicalStatus, { min: 2 })) {
    errors.clinicalStatus = "Este campo deve conter pelo menos 2 caracteres";
  }
  if (Validator.isEmpty(data.clinicalStatus)) {
    errors.clinicalStatus = "Este campo tem que ser preenchido";
  }
  if (!Validator.isLength(data.schoolName, { min: 2 })) {
    errors.schoolName = "Este campo deve conter pelo menos 2 caracteres";
  }

  if (Validator.isEmpty(data.schoolName)) {
    errors.schoolName = "Este campo tem que ser preenchido";
  }

  if (!Validator.isLength(data.schoolSchedule, { min: 2 })) {
    errors.schoolSchedule = "Este campo deve conter pelo menos 2 caracteres";
  }
  if (Validator.isEmpty(data.schoolSchedule)) {
    errors.schoolSchedule = "Este campo tem que ser preenchido";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
