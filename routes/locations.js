const express = require("express");
const router = express.Router();

// Controllers
const { 
  getAllLocations, 
  getSingleLocation, 
  createNewLocation, 
  updateLocation, 
  deleteLocation, 
  getLocationsInRadius 
} =  require('../controllers/locations');

/**
 * URL: <HOST>/api/locations
 */

router
  .route("/:zipcode/:distance")
  .get(getLocationsInRadius);

router
  .route("/")
    .get(getAllLocations)
    .post(createNewLocation);
    
router
  .route("/:id")
    .get(getSingleLocation)
    .put(updateLocation)
    .delete(deleteLocation);

module.exports = router;