const User = require("../models/user");
const ErrorResponse = require("../utilities/errorResponse");
const status = require("../utilities/status-codes");
const asyncHandler = require("../middleware/async");
const jwt = require('jsonwebtoken');
const Image = require("../models/image");
const mongoose = require("mongoose");
/**
 * @description Get all users
 * @method GET
 * @route /api/users
 * @access Public
 */
exports.getAllUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});


/**
 * @description Get single user by ID
 * @method GET
 * @route /api/users/:id
 * @access Public
 */
exports.getSingleUser = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.params.id).populate([
      { path: 'locations', model: 'Location', select: "location" },
      { path: 'images', model: 'Image', select: "name path alt" },
      { path: 'current_image', model: 'Image', select: "name path alt" },
      { path: 'role', model: 'Role', select: 'name actions' }
    ])

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
 * @description Returns basic user information based on the token in the req.header.authorization
 * @method GET
 * @route /api/users/info
 * @access Private
 */
exports.getSingleUserByToken = asyncHandler(async (req, res, next) => {
  
  if(
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ){
    return res.status(200).json({
      actions: []
    });
  }

  const throwError = () => next(
    new Error(`Something went wrong.`, 500)
  )

  // Decode the token
  const token = req.headers.authorization.replace('Bearer ', '');
  const decoded = jwt.decode(token, {complete: true});

  if(!decoded || !decoded.payload || !decoded.payload.id) throwError();

  // // Extract the user id and lookup the user
  const { id } = decoded.payload;
  const user = await User.findById(id).select("_id username email current_image"); 
  
  if(!user) throwError();
  
  res.status(200).json({
    success: true,
    user
  });

});



/**
 * @description Update existing user by ID
 * @method PUT
 * @route /api/users/:id
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