const { Schema, model } = require("mongoose");

const influenceSchema = new Schema(
  {
    band: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Influence = model("Influence", influenceSchema);

module.exports = Influence;
