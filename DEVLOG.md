# Development Log for Artist Search App

This document outlines the development process of the Artist Search App, including the steps taken, decisions made, and the rationale behind them.

## Project Overview

The final product we produced is a Node.js REST API application. This application interacts with the Last.fm API to search for information about artists and write the results to a CSV file.

## Project Setup

The project was set up using Node.js and Express. The initial structure of the project was a simple Express server with a single route. As the project grew, it was refactored to follow the MVC (Model-View-Controller) pattern for better organization and separation of concerns.

We used the following commands to set up the project:

```bash
mkdir ArtistDataRetriever
cd ArtistDataRetriever
npm init -y
npm install express axios csv-writer dotenv express-async-handler
npm install -D nodemon
touch index.js
touch nodemon.json
touch .env
touch .env.example
touch .gitignore
```

We also added scripts to the package.json file to start the server using either Node.js or Nodemon:

```json
"scripts": {
"start": "node index.js",
"dev": "nodemon index.js"
}
```

The application uses environment variables for configuration, which are stored in a .env file. The dotenv package was used to load these variables. We created an example .env file (env.example) to guide users in setting up their own .env file.

We created a nodemon.json file to prevent Nodemon from restarting the server when the artists.json file changes:

```json
{
  "ignore": ["artists.json"]
}
```

Finally, we created a .gitignore file to prevent certain files and directories from being tracked by Git:

```gitignore
node_modules/
artists.json
.env
```

## Fetching Artist Data

The data for the artists is fetched from the Last.fm API. An initial list of top artists is fetched and stored in a JSON file (artists.json) when the server starts. This list is used as a fallback in case the user's search does not return any results.

We decided to fetch the artist names from the same API we used for the search to ensure that we always have relevant artist names. For safety, we included a static name "Taylor Swift" just in case the fetch does not work.

## Handling User Searches

When our application receives a request, it makes a call to the Last.fm API's artist.search endpoint using the artist name provided by the user. If no results are returned, the application retrieves a random artist name from the artists.json file and makes another search request. This process is repeated up to 10 times until a result is found.

If the user-provided name didn't return any results, but a name from our JSON file did, we still write the results to the CSV file. The goal is to always provide the user with some results, even if they're not for the artist they initially searched for.

## Generating CSV Files

Once the artist data is retrieved, it is written to a CSV file. The filename is either provided by the user or, in the case of a random artist search, the artist's name is used. The CSV files are stored in a GeneratedArtistsCSVFiles directory, which is created if it doesn't already exist.

## Error Handling

Errors are handled at both the service and controller levels. The express-async-handler package was used in our controller to catch and handle exceptions without the need for try-catch blocks. This makes the code cleaner and easier to read. If an error occurs during the search process (such as reaching the maximum number of attempts without finding an artist), an error message is returned to the user.

## Hosting and Documentation

Finally, we hosted our code on GitHub and wrote a README file with instructions on how to install and run the application. This is a common practice in software development that makes it easier for other developers to use and contribute to our code.

We initialized a GitHub repository and started committing our changes one at a time to demonstrate our teamwork.

## Conclusion

The development of the Artist Search App involved careful planning, thoughtful decision-making, and iterative development. Each step of the process was taken with consideration for best practices, performance, and user experience.
