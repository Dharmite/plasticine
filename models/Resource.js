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
  observation: {
    type: String,
    required: true
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

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Resource = mongoose.model("resource", resourceSchema);
