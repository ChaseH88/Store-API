const express = require("express");
const router = express.Router();
const { getAllLocations, getSingleLocation, createNewLocation, updateLocation, deleteLocation } =  require('../controllers/locations');

/**
 * URL: <HOST>/api/locations
 */

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