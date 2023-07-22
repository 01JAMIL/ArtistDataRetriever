const { searchArtist } = require("../services/artist.service");
const asyncHandler = require("express-async-handler");

const searchArtistByName = asyncHandler(async (req, res) => {
    const result = await searchArtist(
        req.body.artistName,
        req.body.fileName
    );
    res.status(200).json({
        message: result
    });
})


module.exports = {
    searchArtistByName
}