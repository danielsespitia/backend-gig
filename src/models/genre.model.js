const { Schema, model } = require("mongoose");

const genreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    main: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Genre = model("Genre", genreSchema);

module.exports = Genre;
