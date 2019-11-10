const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: {
    type: String
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, 'Please enter an author ID.']
  },
  path: {
    type: String
  },
  alt: {
    type: String
  },
  description: {
    type: String
  },
  archive: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Image', ImageSchema);