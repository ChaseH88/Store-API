const Location = require("../models/location");
const ErrorResponse = require("../utilities/errorResponse");
const status = require("../utilities/status-codes");
const asyncHandler = require("../middleware/async");

/**
 * @description Get all locations
 * @method GET
 * @route /api/locations
 * @access Public
 */
exports.getAllLocations = asyncHandler(async (req, res, next) => {
  
    const locations = await Location.find();
    
    res.status(200).json({
      success: true,
      count: locations.length,
      data: locations
    });
    
});


/**
 * @description Get single location by ID
 * @method GET
 * @route /api/locations/:id
 * @access Public
 */
exports.getSingleLocation = asyncHandler(async (req, res, next) => {
  
    const location = await Location.findById(req.params.id);

    // Not found
    if(!location){
      return next(
        new ErrorResponse(`Location not found with id of ${req.params.id}`, status.ERROR_NOT_FOUND)
      );
    }

    // Found and Return
    res.status(200).json({
      success: true,
      data: location
    });

});


/**
 * @description Create new location
 * @method POST
 * @route /api/locations
 * @access Public
 */
exports.createNewLocation = asyncHandler(async (req, res, next) => {
    console.log(req.body)
  const location = await Location.create(req.body);
  
  res.status(201).json({
    success: true,
    data: location
  });
  
});


/**
 * @description Update existing location by ID
 * @method PUT
 * @route /api/locations/:id
 * @access Private
 */
exports.updateLocation = asyncHandler(async (req, res, next) => {

  const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  // Not found
  if(!location){
    return next(
      new ErrorResponse(`Location not found with id of ${req.params.id}`, status.ERROR_NOT_FOUND)
    );
  }

  res.status(200).json({
    success: true,
    data: location
  });
  
});


/**
 * @description Delete existing location by ID
 * @method DELETE
 * @route /api/locations/:id
 * @access Private
 */
exports.deleteLocation = asyncHandler(async (req, res, next) => {

  const location = await Location.findByIdAndDelete(req.params.id);

  // Not found
  if(!location){
    return next(
      new ErrorResponse(`Location not found with id of ${req.params.id}`, status.ERROR_NOT_FOUND)
    );
  }    

  // Found and Return
  res.status(200).json({
    success: true,
    message: `Location has been deleted`
  });
  
});