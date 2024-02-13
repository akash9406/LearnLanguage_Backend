const express = require("express");
const UserController = require("../controller/User");
const router = express.Router();
const Auth = require("../middleware/Auth");
router
  .post("/signup", UserController.SignUp)
  .post("/login", UserController.Login)
  .get("/me", Auth, UserController.getUser);

exports.router = router;
