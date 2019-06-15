const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "therapist"
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  subCategory: {
    type: String
  },
  observation: {
    type: String,
    required: true
  },
  application: {
    type: String
  },
  feedback: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "therapist"
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
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Resource = mongoose.model("resource", resourceSchema);
