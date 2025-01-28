const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(cors());
app.use(bodyParser.json());


const username = encodeURIComponent("moviedb");
const password = encodeURIComponent("admin@123");

let uri =
  `mongodb+srv://${username}:${password}@moviedb.8nude.mongodb.net/?retryWrites=true&w=majority&appName=movieDb`;

// MongoDB Connection String (Replace <username>, <password>, and <dbname>)

// Create MongoDB client
const client = new MongoClient(uri);

// Connect to MongoDB
let db;
client.connect()
  .then(() => {
    db = client.db("moviedb"); // Set the correct database name
    console.log("MongoDB Connected...");
  })
  .catch((err) => console.error("MongoDB Connection Failed:", err));

// API Endpoints

// Fetch all movies
app.get("/movies", async (req, res) => {
  try {
    const movies = await db.collection("movies").find({}).toArray(); // Query all movies
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching movies");
  }
});

// Fetch a movie by ID
app.get("/movies/:id", async (req, res) => {
  try {
    const movieId = req.params.id;

    // Query the database to find the document and the matching movie inside the `movies` array
    const result = await db.collection("movies").findOne(
      { "movies.id": movieId }, // Search for a document where `movies.id` matches `movieId`
      { projection: { "movies.$": 1 } } // Use projection to return only the matched movie
    );


    if (!result || !result.movies || result.movies.length === 0) {
      return res.status(404).send("Movie not found.");
    }

    // The matching movie is in the `movies` array
    const movie = result?.movies?.[0];
    console.log(movie,"moviemoviemoviemoviemovie")

    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching movie");
  }
});


// Delete a movie by ID
// Delete a movie by ID
app.delete("/movies/:id", async (req, res) => {
  try {
    const movieId = req.params.id;

    // Use the `$pull` operator to remove the movie with the matching `id` from the `movies` array
    const result = await db.collection("movies").updateOne(
      { "movies.id": movieId }, // Find the document containing the movie
      { $pull: { movies: { id: movieId } } } // Remove the movie from the array
    );

    if (result.modifiedCount === 0) {
      return res.status(404).send("Movie not found.");
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting movie");
  }
});


// Start Server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
