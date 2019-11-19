const Product = require("../models/product");
const ErrorResponse = require("../utilities/errorResponse");
const status = require("../utilities/status-codes");
const asyncHandler = require("../middleware/async");
const { useFilters } = require("../utilities/use-filter");

// Require Reference to Other Models for .populate()
require("../models/category");
require("../models/brand");
require("../models/tags");


/**
 * @description Get all products
 * @method GET
 * @route /api/products
 * @query /api/products?<FIELD>[<OPERATOR>]=<NUMBER>
 * @access Public
 */
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);  
});


/**
 * @description Get single product by ID
 * @method GET
 * @route /api/products/:id
 * @access Public
 */
exports.getSingleProduct = asyncHandler(async (req, res, next) => {
  
    const product = await Product
                            .findById(req.params.id)
                            .populate({ path: "tags", select: "name icon" })
                            .populate({ path: "brand", select: "name" })
                            .populate({ path: "category", select: "name icon" });

    // Not found
    if(!product){
      return next(
        new ErrorResponse(`Product not found with id of ${req.params.id}`, status.ERROR_NOT_FOUND)
      );
    }

    // Found and Return
    res.status(200).json({
      success: true,
      data: product
    });

});


/**
 * @description Create new product
 * @method POST
 * @route /api/products
 * @access Public
 */
exports.createNewProduct = asyncHandler(async (req, res, next) => {
  
  const product = await Product.create(req.body);
  
  res.status(201).json({
    success: true,
    data: product
  });
  
});


/**
 * @description Update existing product by ID
 * @method PUT
 * @route /api/products/:id
 * @access Private
 */
exports.updateProduct = asyncHandler(async (req, res, next) => {

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  // Not found
  if(!product){
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, status.ERROR_NOT_FOUND)
    );
  }

  res.status(200).json({
    success: true,
    data: product
  });
  
});


/**
 * @description Delete existing product by ID
 * @method DELETE
 * @route /api/products/:id
 * @access Private
 */
exports.deleteProduct = asyncHandler(async (req, res, next) => {

  const product = await Product.findByIdAndDelete(req.params.id);

  // Not found
  if(!product){
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, status.ERROR_NOT_FOUND)
    );
  }    

  // Found and Return
  res.status(200).json({
    success: true,
    message: `Product has been deleted`
  });
  
});

