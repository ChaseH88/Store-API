const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: "default"
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, 'Please enter an owner/author ID.']
  },
  highlight: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Tag', TagSchema);