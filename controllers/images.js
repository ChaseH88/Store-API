const Image = require("../models/image");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utilities/errorResponse");
const uniqid = require('uniqid');
const moment = require("moment");
const path = require("path");

/**
 * @description Create new image
 * @method POST
 * @route /api/images
 * @access Public
 */
exports.createNewImage = asyncHandler(async (req, res, next) => {

  // Check if a file exist
  if(!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  // Grab the file
  const { file } = req.files;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check File Size
  if(file.size > process.env.MAX_FILE_SIZE_UPLOAD){
    return next(new ErrorResponse(`Please upload an image less than ${bytesToSize(process.env.MAX_FILE_SIZE_UPLOAD)}`, 400));
  }

  // Create custom file name
  file.name = `${uniqid('photo_')}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if(err){
      console.log(err);
      return next(
        new ErrorResponse(`Problem with file upload`, 500)
      );
    }

      let image = await Image.create({
        name: "T-Shirt",
        author: "5dc4e507d72cb83dac6d1181",
        path: file.name,
        alt: "Picture of a t-shirt",
        description: "This is an image of a t-shirt.",
        archive: false
      });

      res.status(200).json({
        success: true,
        data: image
      });

  });
  
});

function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}