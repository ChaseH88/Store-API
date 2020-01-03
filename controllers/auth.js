const User = require("../models/user");
const { hashPassword, signToken, comparePassword, sendToken } = require("../middleware/password");
const asyncHandler = require("../middleware/async");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

/**
 * @description Create new user
 * @method POST
 * @route /api/users/account/signup
 * @access Public
 */
exports.createNewUser = asyncHandler(async (req, res, next) => {

  password = await hashPassword(req.body.password);

  // If no role specified, assign them to the 'user' role level
  if(!req.body.role){
    let role = await mongoose.model('Role').findOne({ name: 'user' });
    if(!role || !role._id){
      return(next(
        new Error(`Error while creating account.`, 500)
      ));
    }
    // Add the role to the req object
    req.body['role'] = role._id;
  }

  // Creat the user
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



/**
 * @description Logs an existing user out.
 * @method GET
 * @route /api/users/account/logout
 * @access Private
 */
exports.logout = asyncHandler(async (req, res, next) => {
  req.user = null;
  res.status(200).json({
    success: true,
    message: "You have successfully logged out."
  });
});



/**
 * @description Returns an array of the user's permissions based on token
 * @method POST
 * @route /api/user/account/get-actions
 * @access Public
 */
exports.getActions = asyncHandler(async (req, res, next) => {

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

  // Extract the user id and lookup the user
  const { id } = decoded.payload;
  const user = await User.findById(id); 

  if(!user || !user.role) throwError();

  // Lookup the role
  const role = await mongoose.model('Role').findById(user.role);

  if(!role || !role.actions) throwError();
  
  res.status(200).json({
    actions: role.actions
  });

});