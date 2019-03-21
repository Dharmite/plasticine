const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Base = require("./Base");

const ParentSchema = new Schema({
  childName: {
    type: String,
    required: true
  },
  childAge: {
    type: Number,
    required: true
  }
});

module.exports = Parent = Base.discriminator("parent", ParentSchema);
