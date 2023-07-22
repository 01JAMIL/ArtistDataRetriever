const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");
const path = require("path");

exports.writeToCsv = async (fileName, data) => {
  // Create a 'generated' directory if it doesn't exist
  const dir = "./GeneratedArtistsCSVFiles";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  // Define the CSV writer
  const csvWriter = createCsvWriter({
    path: path.join(dir, `${fileName}.csv`), // Use the actual artist name as part of the fileName
    header: [
      { id: "name", title: "NAME" },
      { id: "mbid", title: "MBID" },
      { id: "url", title: "URL" },
      { id: "image_small", title: "IMAGE_SMALL" },
      { id: "image", title: "IMAGE" },
    ],
  });

  // Write to CSV
  await csvWriter.writeRecords(data);
};
