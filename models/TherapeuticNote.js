const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TherapeuticNoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "base"
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "patient"
  },
  title: {
    type: String,
    required: true
  },
  observation: {
    type: String,
    required: true
  },
  activity: {
    type: String
  },
  behavior: {
    type: String
  },
  feedback: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "base"
      },
      observation: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  availableTo: [
    {
      type: Schema.Types.ObjectId,
      ref: "base"
    }
  ],

  files: [
    {
      filename: {
        type: String
      },

      destination: {
        type: String
      },
      src: {
        type: String
      },
      fileType: {
        type: String
      },
      originalname: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = TherapeuticNote = mongoose.model(
  "therapeuticnote",
  TherapeuticNoteSchema
);
