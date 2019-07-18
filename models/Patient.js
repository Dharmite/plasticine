const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Check if there is a way to update age dynamically


const PatientSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  birthday: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },

  clinicalStatus: {
    type: String,
    required: true
  },

  schoolName: {
    type: String,
    required: true
  },

  schoolSchedule: {
    type: String,
    required: true
  },

  medicine: [
    {
      name: {
        type: String,
        required: true
      },
      observation: {
        type: String,
        required: true
      },
      dosage: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      },
      startingDate: {
        type: Date
      },
      finishedDate: {
        type: Date
      }
    }
  ],

  therapist: [
    {
      type: Schema.Types.ObjectId,
      ref: "therapist"
    }
  ],

  previousTherapists: [
    {
      type: Schema.Types.ObjectId,
      ref: "therapist"
    }
  ],

  parent: [
    {
      type: Schema.Types.ObjectId,
      ref: "parent"
    }
  ],

  therapeuticNote: [
    {
      type: Schema.Types.ObjectId,
      ref: "therapeuticnote"
    }
  ],

  date: {
    type: Date,
    default: Date.now
  }
});


module.exports = Patient = mongoose.model("patient", PatientSchema);