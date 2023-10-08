const express = require("express");
const { getAllConcerts, 
    getConcertById, 
    addConcert, 
    updateConcert, 
    deleteConcert } = require("../controllers/concertController");
const router = express.Router();

router.get("/", getAllConcerts);
router.get("/:id", getConcertById);
router.post("/", addConcert);
router.put("/:id", updateConcert);
router.delete("/:id", deleteConcert);

module.exports = router;