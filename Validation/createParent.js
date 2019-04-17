const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateParentInput(data) {
    let errors = {};
  
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
  
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
  
    if (Validator.isEmpty(data.password)) {
      errors.password = "Este campo tem que ser preenchido";
    }
  
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = "Password deverá conter pelo menos 6 caracteres";
    }
  
    return { errors, isValid: isEmpty(errors) };
  };