const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Base = require("./Base");

const TherapistSchema = new Schema({
  specialty: {
    type: String,
    required: true
  },
  patient: [
    {
      type: Schema.Types.ObjectId,
      ref: "patient"
    }
  ],

  previousPatients: [
    {
      type: Schema.Types.ObjectId,
      ref: "patient"
    }
  ],

  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "therapeuticnote"
    }
  ],
  resources: [
    {
      type: Schema.Types.ObjectId,
      ref: "resource"
    }
  ]
});

module.exports = Therapist = Base.discriminator("therapist", TherapistSchema);
