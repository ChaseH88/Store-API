const express = require("express");
const router = express.Router();
const { 
  getModels,
  getModelInfo,
  getPrivileges,
  getRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
  findAllUsersWithRole
} =  require('../controllers/site');
const { protect, authorize } = require('../middleware/auth');
require("../models/role");

// Permissions for this route
const page = 'site';
const admin_role = [
  { role: "admin", priv: ['read', 'write', 'delete'] }
]

/**
 * URL: <HOST>/api/site
 */
router
  .route("/models")
    .get(protect, authorize(page, admin_role, 3), getModels);

router
  .route("/models/:model")
    .get(protect, authorize(page, admin_role), getModelInfo);

router
  .route("/get-privileges")
    .get(protect, authorize(page, admin_role), getPrivileges);

router
  .route("/roles")
    .get(protect, authorize(page, admin_role), getRoles);

router
  .route("/role/:id")
    .get(protect, authorize(page, admin_role), getRoleById)
    .put(protect, authorize(page, admin_role), updateRoleById)
    .delete(protect, authorize(page, admin_role), deleteRoleById);

router
  .route("/get-users-by-role")
    .get(protect, authorize(page, admin_role), findAllUsersWithRole)




module.exports = router;