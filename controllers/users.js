const User = require("../models/user");
const ErrorResponse = require("../utilities/errorResponse");
const status = require("../utilities/status-codes");
const asyncHandler = require("../middleware/async");

/**
 * @description Get all users
 * @method GET
 * @route /api/users
 * @access Public
 */
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  
    const users = await User.find();
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
    
});


/**
 * @description Get single user by ID
 * @method GET
 * @route /api/users/:id
 * @access Public
 */
exports.getSingleUser = asyncHandler(async (req, res, next) => {
  
    const user = await User.findById(req.params.id);

    // Not found
    if(!user){
      return next(
        new ErrorResponse(`User not found with id of ${req.params.id}`, status.ERROR_NOT_FOUND)
      );
    }

    // Found and Return
    res.status(200).json({
      success: true,
      data: user
    });

});


/**
 * @description Create new user
 * @method POST
 * @route /api/users/signup
 * @access Public
 */
exports.createNewUser = asyncHandler(async (req, res, next) => {
    
  const user = await User.create(req.body);
  
  res.status(201).json({
    success: true,
    data: user
  });
  
});


/**
 * @description Update existing user by ID
 * @method PUT
 * @route /api/users/signup
 * @access Private
 */
exports.updateUser = asyncHandler(async (req, res, next) => {

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  // Not found
  if(!user){
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, status.ERROR_NOT_FOUND)
    );
  }

  res.status(200).json({
    success: true,
    data: user
  });
  
});


/**
 * @description Delete existing user by ID
 * @method DELETE
 * @route /api/users/:id/delete
 * @access Private
 */
exports.deleteUser = asyncHandler(async (req, res, next) => {

  const user = await User.findByIdAndDelete(req.params.id);

  // Not found
  if(!user){
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, status.ERROR_NOT_FOUND)
    );
  }    

  // Found and Return
  res.status(200).json({
    success: true,
    message: `${user.username} has been deleted`
  });
  
});