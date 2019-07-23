const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  birthday: {
    type: String,
    required: true
  },

  clinicalStatus: {
    type: String
  },

  observation: {
    type: String
  },

  schoolName: {
    type: String,
    required: true
  },

  schoolSchedule: {
    type: String,
    required: true
  },
  // Meter user aqui --> terapeuta
  medicine: [
    {
      user_id: {
        type: String
      },
      user_name: {
        type: String
      },
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

  history: [
    {
      user_id: {
        type: String
      },
      user_name: {
        type: String
      },
      user_email: {
        type: String
      },
      user_specialty: {
        type: String
      },

      dates: [
        {
          addedDate: {
            type: Date
          },
          removedDate: {
            type: Date
          }
        }
      ]
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
