const express = require("express");
const router = express.Router();

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

router
  .route("/")
    .get(getAllProducts)
    .post(createNewProduct);
    
router
  .route("/:id")
    .get(getSingleProduct)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;