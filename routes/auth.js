const express = require("express");
const router = express.Router();
const { createNewUser, getActions, login, getUser, logout } =  require('../controllers/auth');
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
  .route("/get-actions")
    .post(getActions);

router
  .route("/signup")
    .post(createNewUser);

router
  .route("/login")
    .post(login)

router
  .route("/logout")
    .get(protect, logout)
    

// router.get(`/login`, () => console.log("test"));
// router.get(`/signout`, () => console.log("test"));


module.exports = router;