const axios = require("axios");
const fs = require("fs");
const csvWriterUtil = require("../utils/csvWriter");

const apiKey = process.env.API_KEY;

const searchArtist = async (artistName, filename) => {
  let response = await axios.get(
    `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artistName}&api_key=${apiKey}&format=json`
  );

  // If no results are returned, retrieve a random artist name from the JSON dictionary source file
  let attempts = 0;
  const maxAttempts = 10; // Maximum number of attempts to find an artist with results
  const artistsFile = JSON.parse(fs.readFileSync("artists.json", "utf8"));

  while (
    response.data.results.artistmatches.artist.length === 0 &&
    attempts < maxAttempts
  ) {
    artistName = artistsFile[Math.floor(Math.random() * artistsFile.length)];
    response = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artistName}&api_key=${apiKey}&format=json`
    );
    attempts++;
    filename = artistName; // Use the random artist name as the filename
  }

  // If no results are found after maximum attempts, return an error
  if (response.data.results.artistmatches.artist.length === 0) {
    throw new Error("No artist found after maximum attempts.");
  }

  // Extract the relevant information
  const artists = response.data.results.artistmatches.artist.map((artist) => ({
    name: artist.name,
    mbid: artist.mbid,
    url: artist.url,
    image_small: artist.image.find((img) => img.size === "small")["#text"],
    image: JSON.stringify(artist.image),
  }));

  // Write to CSV
  await csvWriterUtil.writeToCsv(filename, artists);

  return "Successfully wrote to CSV file";
};

module.exports = {
  searchArtist,
};
