const connectToDatabase = require("../db");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const movieId = req.query.id; // `req.query` is used for dynamic routes in Vercel
    const db = await connectToDatabase();

    const result = await db.collection("movies").findOne(
      { "movies.id": movieId }, // Search for a document where `movies.id` matches `movieId`
      { projection: { "movies.$": 1 } } // Use projection to return only the matched movie
    );

    if (!result || !result.movies || result.movies.length === 0) {
      return res.status(404).send("Movie not found.");
    }

    const movie = result.movies[0];
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching movie");
  }
};
