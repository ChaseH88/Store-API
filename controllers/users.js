const User = require("../models/user");
const ErrorResponse = require("../utilities/errorResponse");

/**
 * @description Get all users
 * @method GET
 * @route /api/users
 * @access Public
 */
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
};


/**
 * @description Get single user by ID
 * @method GET
 * @route /api/users/:id
 * @access Public
 */
exports.getSingleUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({ success: true, data: user });
};


/**
 * @description Create new user
 * @method POST
 * @route /api/users/signup
 * @access Public
 */
exports.createNewUser = async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: user
  });
};


/**
 * @description Update existing user by ID
 * @method PUT
 * @route /api/users/signup
 * @access Private
 */
exports.updateUser = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if(!user){
    return(res.status(400).json({ success: false }))
  } else {
    res.status(200).json({
      success: true,
      data: user
    });
  }

};


/**
 * @description Delete existing user by ID
 * @method DELETE
 * @route /api/users/:id/delete
 * @access Private
 */
exports.deleteUser = async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  
  res.status(200).json({
    success: true,
    message: `${user.username} has been deleted`
  });

};