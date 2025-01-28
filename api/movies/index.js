const connectToDatabase = require("../db");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const db = await connectToDatabase();
    const movies = await db.collection("movies").find({}).toArray(); // Query all movies
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching movies");
  }
};
