const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Base = require("./Base");

const ParentSchema = new Schema({
  patient: [
    {
      type: Schema.Types.ObjectId,
      ref: "patient"
    }
  ]
});

module.exports = Parent = Base.discriminator("parent", ParentSchema);
