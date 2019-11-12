const express = require("express");
const router = express.Router();

// Controllers
const { 
  createNewImage
} =  require('../controllers/images');

/**
 * URL: <HOST>/api/images
 */

router
  .route("/")
    .post(createNewImage);
    
// router
//   .route("/:id")
//     .get(getSingleLocation)
//     .put(updateLocation)
//     .delete(deleteLocation);

module.exports = router;