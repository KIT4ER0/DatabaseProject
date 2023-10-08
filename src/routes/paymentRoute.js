const express = require("express");
const { createPayment, getPaymentsByCustomerId } = require("../controllers/paymentController");
const router = express.Router();

router.post("/", createPayment);
router.get("/:id", getPaymentsByCustomerId);

module.exports = router;