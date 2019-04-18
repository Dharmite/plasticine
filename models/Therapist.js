const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Base = require("./Base");

const TherapistSchema = new Schema({
  specialty: {
    type: String,
    required: true
  },
  specialtyList: [
    "Psicologia",
    "Terapia da Fala",
    "Psicomotricidade",
    "Fisioterapia",
    "Terapia Ocupacional"
  ],
  patient: [
    {
      type: Schema.Types.ObjectId,
      ref: "patient"
    }
  ],

  previousPatients: [
    {
      name: {
        type: String,
        required: true
      },

      age: {
        type: String,
        required: true
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
      ]
    }
  ],

  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "therapeuticnote"
    }
  ]
});

module.exports = Therapist = Base.discriminator("therapist", TherapistSchema);
