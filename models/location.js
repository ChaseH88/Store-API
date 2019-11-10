const mongoose = require("mongoose");
const geocoder = require("../utilities/geocoder");

const LocationSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: false
    },
    coordinates: {
      type: {
        longitude: Number,
        latitude: Number
      },
      required: false,
      index: '2dsphere'
    },
    formattedAddress1: String,
    formattedAddress2: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
    addressProvider: String
  }
}, { timestamps: true });


// For Geolocation
LocationSchema.pre('save', async function(next){

  // Grab the data from the API
  const loc = await geocoder.geocode(this.address).reduce(data => data);
  
  // Construct the Data
  this.location = {
    type: 'Point',
    coordinates: {
      longitude: loc.longitude,
      latitude: loc.latitude
    },
    formattedAddress1: loc.formattedAddress,
    street: loc.streetName,
    city: loc.city,
    state: loc.stateCode,
    zipcode: loc.zipcode,
    country: loc.countryCode,
    addressProvider: loc.provider
  }

  // Remove address string
  this.address = undefined

  next();
});

module.exports = mongoose.model('Location', LocationSchema);