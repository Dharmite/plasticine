const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Base = require("./Base");

const ParentSchema = new Schema({
  patient: [
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

  birthday: {
    type: String,
    required: true
  },

  relationship: {
    type: String,
    required: true
  },
  work_status:{
    type: String
  }
});

module.exports = Parent = Base.discriminator("parent", ParentSchema);
