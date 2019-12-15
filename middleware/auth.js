const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utilities/errorResponse');
const User = require('../models/user');
const errorHandler = require("../middleware/error");
require("../models/role");

exports.protect = asyncHandler(async (req, res, next) => {
  
  // Check for a token
  let token;
  if(
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ){
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token, return the user
  if(!token){
    return next(
      new ErrorResponse('Not Authorized.', 401)
    );
  }

  // Decode the token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  try {

    // Add the user's information to the request payload
    req.user = await User.findById(decoded.id).populate({ path: "role", model: "Role" });
    next();

  }
  catch(err){
    console.log(err);
  }

});

/**
 * 
 * @param {*} route_name String- Name of the route/model/page - EX: 'example'
 * @param {*} roles Array - Options for what users can access what - EX: ['read', 'write', 'delete']
 * @param {*} access_level Number - The level of access required - EX: 3 
 */
exports.authorize = (route_name, roles, access_level) => {

  return (req, res, next) => {
    if(!req.user || !req.user.role){
      return(next(
        new ErrorResponse(`Something went wrong.`, 500)
      ))
    }

    // Grab the Role Name and Actions/privileges
    const { name, actions } = req.user.role;

    // Admins skip all checks
    //if(name === 'admin') return next();

    // Grab the current action on the user if it exist
    let current_priv = actions.filter(actions => (
      actions.page === route_name
    ));

    // If the user doesn't have this access to this permission
    if(!current_priv.length){
      return(next(
        new ErrorResponse(`User Role: ${name} is unauthorized.`, 403)
      ))
    }

    // Remove the single item array
    current_priv = current_priv.reduce(arr => arr);

    // Check the access level with a boolean
    const level_check = (current_priv.access >= access_level);
    
    // Check the roles and decide what the response should be
    const check_user = new Promise((resolve, reject) => {
      roles.map(({ role, priv }) => {
        
        // Check if the user has correct priv
        let check = current_priv.privileges.some(_priv => (
          priv[0].includes(_priv)
        ));
  
        // Make sure all checks pass before authorizing
        if(
          check &&
          level_check &&
          role === name &&
          actions.some((action) => action.page === route_name)
        ){
          return resolve(true)
        }
      });
      return resolve(false)
    });

    check_user.then((passed) => {
      if(passed){
        return next();
      } else {
        return(next(
          new ErrorResponse(`User Role: ${name} is unauthorized.`, 403)
        ))
      }
    });

  }
}

