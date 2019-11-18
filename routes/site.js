const express = require("express");
const router = express.Router();
const { getModels, getModelInfo } =  require('../controllers/site');
const User = require("../models/user");
const advancedResults = require("../middleware/advanced-results");
const { protect, authorize } = require('../middleware/auth');
require("../models/roles");

/**
 * URL: <HOST>/api/site
 */
router
  .route("/models")
    .get(protect, getModels);

router
  .route("/models/:model")
    .get(protect, authorize('products', [
      { role: "admin", priv: ['read, write, delete'] }
    ]), getModelInfo);

module.exports = router;