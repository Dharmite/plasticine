const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePasswordInput(data) {
  let errors = {};

  data.oldpassword = !isEmpty(data.oldpassword) ? data.oldpassword : "";
  data.newpassword = !isEmpty(data.newpassword) ? data.newpassword : "";
  data.newpassword2 = !isEmpty(data.newpassword2) ? data.newpassword2 : "";

  if (Validator.isEmpty(data.oldpassword)) {
    errors.oldpassword = "Este campo tem que ser preenchido";
  }

  if (Validator.isEmpty(data.newpassword)) {
    errors.newpassword = "Este campo tem que ser preenchido";
  }

  if (Validator.isEmpty(data.newpassword2)) {
    errors.newpassword2 = "Este campo tem que ser preenchido";
  }

  if (!Validator.equals(data.newpassword, data.newpassword2)) {
    errors.newpassword2 = "Password não corresponde";
  }

  return { errors, isValid: isEmpty(errors) };
};
