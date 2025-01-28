const connectToDatabase = require("../db");

module.exports = async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const movieId = req.query.id;
    const db = await connectToDatabase();

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
};
