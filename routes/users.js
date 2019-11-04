const express = require("express");
const router = express.Router();
const { getAllUsers, getSingleUser, createNewUser, updateUser, deleteUser } =  require('../controllers/users');

/**
 * URL: <HOST>/api/users
 */

router
  .route("/")
    .get(getAllUsers);
    
router
  .route("/:id")
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router
  .route("/signup")
    .post(createNewUser);
    

// router.get(`/login`, () => console.log("test"));
// router.get(`/signout`, () => console.log("test"));


module.exports = router;