const express = require("express");

const registerRoute = require("./registerRoute");
const loginRoute = require("./loginRoute");
const concertRoute = require("./concertRoute");
const ticketRoute = require("./ticketRoute");
const artistRoute = require("./artistRoute");
const searchRoute = require("./searchRoute");
const paymentRoute = require("./paymentRoute");
const promotionRoute = require("./promotionRoute");
const bookingRoute = require("./bookingRoute");

const router = express.Router();

router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/concert", concertRoute);
router.use("/ticket", ticketRoute);
router.use("/artist", artistRoute);
router.use("/search", searchRoute);
router.use("/payment", paymentRoute);
router.use("/promotion", promotionRoute);
router.use("/booking", bookingRoute);


module.exports = router;