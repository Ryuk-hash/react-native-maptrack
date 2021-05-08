const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  timestamp: Number,

  coordinates: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});

const trackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    name: String,

    locations: [pointSchema],
  },
  { timestamps: true }
);

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
