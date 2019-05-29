const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMedicineInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.observation = !isEmpty(data.observation) ? data.observation : "";
  data.dosage = !isEmpty(data.dosage) ? data.dosage : "";
  data.time = !isEmpty(data.time) ? data.time : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Este campo tem que ser preenchido";
  }

  if (Validator.isEmpty(data.observation)) {
    errors.observation = "Este campo tem que ser preenchido";
  }

  if (Validator.isEmpty(data.dosage)) {
    errors.dosage = "Este campo tem que ser preenchido";
  }

  if (Validator.isEmpty(data.time)) {
    errors.time = "Este campo tem que ser preenchido";
  }


  return { errors, isValid: isEmpty(errors) };
};
