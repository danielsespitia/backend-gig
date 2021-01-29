const { Schema, model } = require("mongoose");

const instrumentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    ownsInstrument: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Genre = model("Instrument", instrumentSchema);

module.exports = Instrument;