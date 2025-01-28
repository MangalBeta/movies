const { MongoClient } = require("mongodb");

const username = encodeURIComponent("moviedb");
const password = encodeURIComponent("admin@123");

const uri = `mongodb+srv://${username}:${password}@moviedb.8nude.mongodb.net/?retryWrites=true&w=majority&appName=movieDb`;

const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db("moviedb"); // Set the correct database name
    console.log("MongoDB Connected...");
  }
  return db;
}

module.exports = connectToDatabase;
