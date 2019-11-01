const express = require("express");
const router = express.Router();
const { getAllUsers } =  require('../controllers/users');


router.route(`/`).get(getAllUsers);


router.get(`/:id`, () => console.log("test"));

router.get(`/:id/edit`, () => console.log("test"));

router.delete(`/:id/delete`, () => console.log("test"));

router.get(`/signup`, () => console.log("test"));

router.get(`/login`, () => console.log("test"));

router.get(`/signout`, () => console.log("test"));


module.exports = router;