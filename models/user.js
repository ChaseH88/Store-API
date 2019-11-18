const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter a username.'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email address.']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    select: false
  },
  firstName: {
    type: String,
    trim: true
  },
  middleName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  lastLogin: [{
    type: Date
  }],
  active: {
    type: Boolean,
    default: true
  },
  locked: {
    type: Boolean,
    default: false
  },
  locations: [{
    type: mongoose.Schema.ObjectId,
    ref: "Location"
  }],
  current_image: {
    type: mongoose.Schema.ObjectId,
    ref: "Image"
  },
  images: [{
    type: mongoose.Schema.ObjectId,
    ref: "Image"
  }],
  slug: String,
  role: {
    type: mongoose.Schema.ObjectId,
    ref: "Role"
  },
  resetToken: {
    type: String
  },
  resetTokenExpiry: {
    type: Date
  },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);