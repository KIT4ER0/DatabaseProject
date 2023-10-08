const express = require("express");
const { addPromotion } = require("../controllers/promotionController");
const router = express.Router();

router.post("/", addPromotion);

module.exports = router;