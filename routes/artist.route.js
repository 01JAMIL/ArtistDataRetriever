const express = require("express");
const { searchArtist } = require("../controllers/artist.controller");

const router = express.Router();

router.post("/search", searchArtist);

module.exports = router;