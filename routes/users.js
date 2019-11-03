const express = require("express");
const router = express.Router();
const { getAllUsers, getSingleUser, createNewUser, updateUser, deleteUser } =  require('../controllers/users');

/**
 * URL: <HOST>/api/users
 */

router.route(`/`).get(getAllUsers);
router.route(`/:id`).get(getSingleUser);
router.route(`/:id/edit`).put(updateUser);
router.route(`/:id/delete`).delete(deleteUser);

router.get(`/:id/edit`, () => console.log("test"));

router.delete(`/:id/delete`, () => console.log("test"));

router.route(`/signup`).put(createNewUser);

router.get(`/login`, () => console.log("test"));

router.get(`/signout`, () => console.log("test"));


module.exports = router;