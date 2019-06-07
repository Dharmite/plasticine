const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTherapeuticNoteInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.observation = !isEmpty(data.observation) ? data.observation : "";

  if (!Validator.isLength(data.title, { min: 2, max: 30 })) {
    errors.title = "Nome deve conter entre e e 30 caracteres";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Este campo tem que ser preenchido";
  }
  if (!Validator.isLength(data.observation, { min: 2, max: 30 })) {
    errors.observation = "Nome deve conter entre e e 30 caracteres";
  }

  if (Validator.isEmpty(data.observation)) {
    errors.observation = "Este campo tem que ser preenchido";
  }

  return { errors, isValid: isEmpty(errors) };
};
