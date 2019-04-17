const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baseOptions = {
  discriminatorKey: "userType", 
  collection: "users" 
};

const BaseSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, baseOptions);

module.exports = Base = mongoose.model("base", BaseSchema);