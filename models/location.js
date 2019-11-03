const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere'
    },
    formattedAddress1: String,
    formattedAddress2: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Location', LocationSchema);