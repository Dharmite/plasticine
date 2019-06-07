const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email inválido";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Este campo tem que ser preenchido";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Este campo tem que ser preenchido";
  }

  return { errors, isValid: isEmpty(errors) };
};
