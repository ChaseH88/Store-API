const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a role name.'],
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Please enter a role description.']
  },
  actions: [
    {
      page: { type: String },
      privileges: [ String ],
      access: {
        type: Number,
        default: 1
      }
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Role', RoleSchema);