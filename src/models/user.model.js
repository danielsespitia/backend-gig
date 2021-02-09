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
  profilePicture: {
    type: String,
  },
  video: {
    type: String,
  },
  videoStartMin: {
    type: Number,
  },
  videoStartSec: {
    type: Number,
  },
  videoEndMin: {
    type: Number,
  },
  videoEndSec: {
    type: Number,
  },
  description: {
    type: String,
  },
  city: {
    type: String,
  },
  mainInstrument: {
    type: String,
  },
  sideInstrument: {
    type: String,
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
  mainGenre: {
    type: String,
  },
  sideGenre: {
    type: String,
  },
  influences: {
    type: String,
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
