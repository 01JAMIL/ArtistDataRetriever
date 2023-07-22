const express = require("express");
const { searchArtistByName } = require("../controllers/artist.controller");

const router = express.Router();

router.post("/search", searchArtistByName);

module.exports = router;