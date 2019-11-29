const express = require("express");
const router = express.Router();
const { 
  getModels,
  getModelInfo,
  getPrivileges,
  getRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById
} =  require('../controllers/site');
const { protect, authorize } = require('../middleware/auth');
require("../models/role");

// Permissions for this route
const admin_role = [
  { role: "admin", priv: ['read', 'write', 'delete'] }
]

/**
 * URL: <HOST>/api/site
 */
router
  .route("/models")
    .get(protect, authorize('site', admin_role), getModels);

router
  .route("/models/:model")
    .get(protect, authorize('site', admin_role), getModelInfo);

router
  .route("/get-privileges")
    .get(protect, authorize('site', admin_role), getPrivileges);

router
  .route("/roles")
    .get(protect, authorize('site', admin_role), getRoles);

router
  .route("/role/:id")
    .get(protect, authorize('site', admin_role), getRoleById)
    .put(protect, authorize('site', admin_role), updateRoleById)
    .delete(protect, authorize('site', admin_role), deleteRoleById);





module.exports = router;