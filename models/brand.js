const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    type: mongoose.Schema.ObjectId,
    ref: "Image"
  }], 
  icon: {
    type: String,
    default: "default"
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, 'Please enter an owner/author ID.']
  },
  sale: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Brand', BrandSchema);