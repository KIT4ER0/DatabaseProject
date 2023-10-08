const express = require("express");
const { loginUser, getUserInfoById } = require("../controllers/loginController");
const router = express.Router();

router.post("/", loginUser);
router.get("/", getUserInfoById);

module.exports = router;