const express = require("express");
const router = express.Router();
const advancedResults = require("../middleware/advanced-results");
const Product = require("../models/product");

// Controllers
const { 
  getAllProducts, 
  getSingleProduct, 
  createNewProduct, 
  updateProduct, 
  deleteProduct
} =  require('../controllers/products');

/**
 * URL: <HOST>/api/products
 */


// .populate({ path: "brand", select: "name" })
// .populate({ path: "category", select: "name icon" });


router
  .route("/")
    .get(advancedResults(Product,
      [
        { path: "tags", select: "name icon", model: "Tag" },
        { path: "brand", select: "name", model: "Brand" },
        { path: "category", select: "name icon", model: 'Category' }
      ]
    ), getAllProducts)
    .post(createNewProduct);
    
router
  .route("/:id")
    .get(advancedResults(Product,
      [
        { path: "tags", select: "name icon", model: "Tag" },
        { path: "brand", select: "name", model: "Brand" },
        { path: "category", select: "name icon", model: 'Category' }
      ]
    ), getSingleProduct)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;