const express = require("express");
const { searchConcertByName } = require("../controllers/searchController");
const router = express.Router();

router.get("/", searchConcertByName);

module.exports = router;