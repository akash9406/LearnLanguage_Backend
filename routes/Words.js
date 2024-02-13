const express = require("express");
const wordController = require("../controller/Words");
const Auth = require("../middleware/Auth");
const router = express.Router();

router
  .post("/storedata", Auth, wordController.StoreWords)
  .get("/storedata", Auth, wordController.getWords);
exports.router = router;
