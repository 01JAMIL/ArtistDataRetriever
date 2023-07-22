require("dotenv").config();
const express = require("express");
const artistRoutes = require("./routes/artist");
const artistFetchService = require("./services/artistFetchService");

const app = express();

app.use(express.json());
app.use("/api/artist", artistRoutes);

// Fetch the list of artists and write to a JSON dictionary source file
artistFetchService.fetchArtists();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
