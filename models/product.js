const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, 'Please enter an author ID.']
  },
  description: {
    type: String
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: [true, 'Please enter a category.']
  },
  brand: {
    type: mongoose.Schema.ObjectId,
    ref: "Brand",
    required: [true, 'Please enter a brand.']
  },
  tags: [{
    type: mongoose.Schema.ObjectId,
    ref: "Tag"
  }],
  images: [{
    type: mongoose.Schema.ObjectId,
    ref: "Image"
  }],
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

// Cascade delete images when product is deleted
ProductSchema.pre('remove', async function(next){
  console.log(this._id);
  await this.model('Image').deleteMany({
    images: this._id
  });
});

module.exports = mongoose.model('Product', ProductSchema);