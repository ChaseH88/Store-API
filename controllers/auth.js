const User = require("../models/user");
const { hashPassword, signToken, comparePassword, sendToken } = require("../middleware/password");
const asyncHandler = require("../middleware/async");

/**
 * @description Create new user
 * @method POST
 * @route /api/users/account/signup
 * @access Public
 */
exports.createNewUser = asyncHandler(async (req, res, next) => {

  password = await hashPassword(req.body.password);
  const user = await User.create({ ...req.body, password });
  sendToken(user.id, 201, res);
  
});



/**
 * @description Logs an existing user in.
 * @method POST
 * @route /api/users/account/login
 * @access Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  // grab the body params
  let { username = null, password } = req.body;
  // check if a username and password was provided.
  if(!username || !password){
    return(next(
      new Error(`Please provide a username and password.`, 400)
    ))
  }
  // Find the user in the database
  username = username.toLowerCase().trim();
  const user = await User.findOne({ username }).select('+password');
  if(!user){
    return(next(
      new Error(`Invalid Username or Password.`, 401)
    ))
  }

  // Check if password matches
  const isMatch = await comparePassword(password, user.password);
  
  if(!isMatch){
    return(next(
      new Error(`Invalid Username or Password.`, 401)
    ))
  }

  sendToken(user.id, 200, res);

});



/**
 * @description Get Logged in User Information
 * @method GET
 * @route /api/users/account
 * @access Private
 */
exports.getUser = asyncHandler(async (req, res, next) => {

  const user = await User.findById(req.user.id);
  
  res.status(200).json({
    success: true,
    data: user
  });
  
});