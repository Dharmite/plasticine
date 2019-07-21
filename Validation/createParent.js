const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateParentInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.relationship = !isEmpty(data.relationship) ? data.relationship : "";
  data.birthday = !isEmpty(data.birthday) ? data.birthday : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Nome deve conter entre e 2 e 30 caracteres";
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

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password deverá conter pelo menos 6 caracteres";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Este campo tem que ser preenchido";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password não corresponde";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Este campo tem que ser preenchido";
  }


  if (Validator.isEmpty(data.relationship)) {
    errors.relationship = "Este campo tem que ser preenchido";
  }

  if (Validator.isEmpty(data.birthday)) {
    errors.birthday = "Este campo tem que ser preenchido";
  }

  return { errors, isValid: isEmpty(errors) };
};
