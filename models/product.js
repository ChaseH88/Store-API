const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  brand: {
    type: String
  },
  tags: {
    type: String
  },
  stockTotal: {
    type: Number,
    required: [true, 'Please the number in stock.'],
  },
  itemNumber: {
    type: Number,
    required: [true, 'Please enter an item number.'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter a price.'],
  },
  salePrice: {
    type: Number
  },
  active: {
    type: Boolean,
    default: true
  },
  sale: {
    type: Boolean,
    default: false
  },
  clearance: {
    type: Boolean,
    default: false
  },
  locked: {
    type: Boolean,
    default: false
  },
  slug: String
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);