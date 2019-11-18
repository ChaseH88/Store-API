const express = require("express");
const router = express.Router();
const { createNewUser, login, getUser } =  require('../controllers/auth');
const User = require("../models/user");
const advancedResults = require("../middleware/advanced-results");
const { protect } = require("../middleware/auth");

/**
 * URL: <HOST>/api/user/account/
 */

router
  .route("/")
    .get(protect, getUser);

router
  .route("/signup")
    .post(createNewUser);

router
  .route("/login")
    .post(login)
    

// router.get(`/login`, () => console.log("test"));
// router.get(`/signout`, () => console.log("test"));


module.exports = router;