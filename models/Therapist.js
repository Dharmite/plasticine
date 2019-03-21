const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Base = require('./Base');

const TherapistSchema = new Schema({
  specialty: {
    type: String,
    required: true
  }
});

module.exports = Therapist = Base.discriminator("therapist", TherapistSchema);
