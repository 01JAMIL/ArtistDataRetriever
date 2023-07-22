# Artist Search App

This is a small Express.js application that allows you to search for an artist and generate a CSV file with the results.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/01JAMIL/ArtistDataRetriever.git
   ```
2. Navigate to the project directory:
   ```
   cd ArtistDataRetriever
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Configuration

The application uses environment variables for configuration. These are stored in a .env file. An example .env file is provided in the repository as .env.example.

To setup your own .env file, copy the .env.example file and rename it to .env:

```bash
cp .env.example .env
```

Open the .env file and replace the placeholder values with your actual values. For example, replace your-api-key with your actual
Last.fm API key, and replace 3000 with the port number you want the server to run on.

## Running the Application

You can run this application in two modes:

### Production Mode:

To start the application in the production environment, run the following command in the project directory:

```bash
npm start
```

### Development Mode:

If you are making changes to the application and want it to automatically restart every time you save, run the application in the development mode:

```bash
npm run dev
```

The application will start and listen on the port you specified in the .env file.

## Usage

To search for an artist, send a POST request to http://localhost:<YOUR_PORT_NUMBER>/api/artist/search with a JSON body containing artistName and fileName. For example:

```json
{
  "artistName": "Cher",
  "fileName": "cher-results"
}

The application will generate a CSV file with the search results in the GeneratedArtistsCSVFiles directory.
```
