const axios = require("axios");
const fs = require("fs");

const apiKey = process.env.API_KEY;

exports.fetchArtists = async () => {
  try {
    const response = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${apiKey}&format=json`
    );

    const artists = response.data.artists.artist.map((artist) => artist.name);

    // Add "Taylor Swift" as a static artist name
    artists.push("Taylor Swift");

    fs.writeFileSync("artists.json", JSON.stringify(artists), "utf8");
  } catch (error) {
    console.error(error);
  }
};
