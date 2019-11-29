const express = require("express");
const router = express.Router();
const { getAllUsers, getSingleUser, updateUser, deleteUser } =  require('../controllers/users');
const User = require("../models/user");
const advancedResults = require("../middleware/advanced-results");
const { protect, authorize } = require('../middleware/auth');
require("../models/role");

/**
 * URL: <HOST>/api/users
 */
router
  .route("/")
    .get(advancedResults(User,
      [
        { path: 'locations', model: 'Location', select: "location" },
        { path: 'images', model: 'Image', select: "name path alt" },
        { path: 'current_image', model: 'Image', select: "name path alt" },
        { path: 'role', model: 'Role', select: 'name actions' }
      ]
    ), protect, getAllUsers);

    
    
router
  .route("/:id")
    .get(protect, getSingleUser)
    .put(protect, updateUser)
    .delete(protect, deleteUser);

module.exports = router;