const Product = require("../models/product");
const Tag = require("../models/tags");
const ErrorResponse = require("../utilities/errorResponse");
const status = require("../utilities/status-codes");
const asyncHandler = require("../middleware/async");
const { useFilters } = require("../utilities/use-filter");

/**
 * @description Get all products
 * @method GET
 * @route /api/products
 * @query /api/products?<FIELD>[<OPERATOR>]=<NUMBER>
 * @access Public
 */
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  
  let query;

  // Copy the Query
  let reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'page', 'limit', 'sort'];

  let params = removeFields.forEach(param => delete reqQuery[param]);

  let queryStr = useFilters(reqQuery, ['gt', 'gte', 'lt', 'lte', 'in']);

  // Search the database
  query = Product.find(queryStr);

  // Select fields
  if(req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if(req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else { 
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Product.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Add Tags
  console.log(query);

  const products = await query;
  
  // Pagination Result
  let pagination = { }

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: products.length,
    pagination,
    data: products
  });
    
});


/**
 * @description Get single product by ID
 * @method GET
 * @route /api/products/:id
 * @access Public
 */
exports.getSingleProduct = asyncHandler(async (req, res, next) => {
  
    const product = await Product.findById(req.params.id);

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

