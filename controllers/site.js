const ErrorResponse = require("../utilities/errorResponse");
const asyncHandler = require("../middleware/async");
const status = require("../utilities/status-codes");
const mongoose = require("mongoose");

/**
 * Returns model names in the database
 */
exports.getModels = asyncHandler(async (req, res, next) => {

    let models = mongoose.modelNames();
    if(!models) return next(new ErrorResponse('Something went wrong.', status.ERROR_SERVER_ERROR));

    let data = models.map(m => m.toLowerCase());
    if(!data) return next(new ErrorResponse('Something went wrong.', status.ERROR_SERVER_ERROR));

    res.status(200).json({
      success: true,
      data
    });

});



/**
 * Returns model names in the database
 */
exports.getModelInfo = asyncHandler(async (req, res, next) => {
  
  const model = req.params.model.replace(/^\w/, function (chr) {
    return chr.toUpperCase();
  });
  
  const collection = await mongoose.model(model).schema;
  
  if(!collection){
    return next(
      new ErrorResponse(`${model}`, status.ERROR_NOT_FOUND)
    );
  }

  res.status(200).json({
    success: true,
    data: {
      model: collection.obj
    }
  });

});


  

