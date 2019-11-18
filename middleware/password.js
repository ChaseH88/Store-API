const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * This function will encrypt the user's password
 * 
 * @param {*} password - User string of password
 */

exports.hashPassword = async password => {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_SIZE));
  return await bcrypt.hash(password, salt);
}



/**
 * This function will check the user's password
 * 
 * @param {*} input - User string of password
 * @param {*} pass - Hashed password in database
 */
exports.comparePassword = async (input, pass) => (
  await bcrypt.compare(input, pass)
);



function createToken(id){
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
}


/**
 * @param {*} userID - ID of the user
 * @param {*} statusCode - Response Status Code
 * @param {*} res - Response Object
 */
exports.sendToken = (userID, statusCode, res) => {

  let token = createToken(userID);

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  }

  if(process.env.NODE_ENV !== 'development'){
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token
  });

}