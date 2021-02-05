const { Schema, model, models } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      async validator(email) {
        try {
          const user = await models.User.findOne({ email });
          return !user;
        } catch (err) {
          return false;
        }
      },
      message: "Este correo electrónico ya está en uso",
    },
  },
  password: {
    type: String,
    required: true,
  },
  terms: {
    type: Boolean,
    required: true,
  },
  video: {
    type: String,
  },
  videoStart: {
    type: Number,
  },
  videoEnd: {
    type: Number,
  },
  description: {
    type: String,
  },
  city: {
    type: String,
  },
  instruments: {
    type: [{ type: Schema.Types.ObjectId, ref: "Instrument" }],
  },
  youtubeAccount: {
    type: String,
  },
  twitterUsername: {
    type: String,
  },
  facebookAccount: {
    type: String,
  },
  instagramAccount: {
    type: String,
  },
  genres: {
    type: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  },
  influences: {
    type: [{ type: Schema.Types.ObjectId, ref: "Influence" }],
  },
  isProfessional: {
    type: Boolean,
  },
  bands: {
    type: String,
  },
  lookingFor: {
    type: String,
  },
  isProducer: {
    type: Boolean,
  },
  premiumAccount: {
    type: Boolean,
  },
});

const User = model("User", userSchema);

module.exports = User;
