const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEditTherapistInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.specialty = !isEmpty(data.specialty) ? data.specialty : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Nome deve conter entre e e 30 caracteres";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Este campo tem que ser preenchido";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Este campo tem que ser preenchido";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email invalido";
  }

  if (Validator.isEmpty(data.specialty)) {
    errors.specialty = "Este campo tem que ser preenchido";
  }

  return { errors, isValid: isEmpty(errors) };
};
