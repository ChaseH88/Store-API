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

    let data = models.map(m => ({
      role: m.toLowerCase(),
      access: ['read', 'write', 'delete']
    }));

    // Add the site role
    data.push({
      role: 'site',
      access: ['read', 'write', 'delete']
    })

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
      model_name: model,
      model: collection.obj
    }
  });

});



/**
 * 
 */
exports.getPrivileges = asyncHandler(async (req, res, next) => {

  // Find the models
  let models = await mongoose.modelNames();
  if(!models) return next(new ErrorResponse('Something went wrong.', status.ERROR_SERVER_ERROR));

  // Find the site admin privilege group
  const admin = await mongoose.model('Role').findOne({ name: 'admin' });
  if(!admin) return next(new ErrorResponse('Something went wrong.', status.ERROR_SERVER_ERROR));

  // Build the permissions object
  let privileges = new Promise((resolve, reject) => {
    let actions = models.map((model) => {
      return {
        privileges: [ "read", "write", "delete" ],
        page: model.toLowerCase()
      }
    });
    actions.push({
      privileges: [ "read", "write", "delete" ],
      page: 'site'
    });
    resolve(actions);
  });

  // Update the Admin priviliges
  privileges.then( async(result) => {

    // Update the document
    let actions = { actions: result };
    let updatedAdmin = await admin.updateOne(actions);

    if(!updatedAdmin) return next(new ErrorResponse('Something went wrong.', status.ERROR_SERVER_ERROR));

    res.status(200).json({
      success: true,
      data: { message: "Privileges have been successfully updated." }
    });

  });

});


// /api/site/roles
exports.getRoles = asyncHandler(async (req, res, next) => {
  
  const roles = await mongoose.model('Role').find();

  res.status(200).json({
    success: true,
    data: roles
  });

});


/**
 * Get role by ID
 * @param id - ObjectID
 * @returns Role with provided ID
 */
exports.getRoleById = asyncHandler(async (req, res, next) => {
  
  const role = await mongoose.model('Role').findById(req.params.id);

  res.status(200).json({
    success: true,
    data: role
  });

});


/**
 * Update the users role including the name and the actions
 * @param id - ObjectID
 * @returns Role with provided ID
 */
exports.updateRoleById = asyncHandler(async (req, res, next) => {
  
console.log(
`

${req.body}

`
);

  let role = await mongoose.model('Role').findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: role
  });

});


/**
 * Delete the role with a given ID
 * @param id - ObjectID
 * @returns Message
 */
exports.deleteRoleById = asyncHandler(async (req, res, next) => {
  
  const role = await mongoose.model('Role').findById(req.params.id);

  if(role.name.toLowerCase() === 'admin'){
    return next(
      new ErrorResponse('Cannot delete Administrator account.', status.ERROR_SERVER_ERROR)
    );
  }

  await role.remove();

  // Found and Return
  res.status(200).json({
    success: true,
    message: `Role has been deleted`
  });

});

