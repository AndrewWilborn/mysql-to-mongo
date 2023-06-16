import { MongoClient } from "mongodb";
import mysql from "mysql2/promise";

import { mongoURI } from "./credentials.js";
import { sqlLogin } from "./credentials.js";

// Connect to SQL Database
const db = await mysql.createConnection(sqlLogin);
// Read data from database and store it in movieList
const [movieList] = await db.execute("SELECT * FROM movies")
// Close SQL connection
db.end();

// Connect to mongo database
const mongoConnection = new MongoClient(mongoURI);
await mongoConnection.connect();
// Select the c11-practice collection
const mongoDatabase = mongoConnection.db("c11-practice");

// Insert the data in movieList array into the collection
await mongoDatabase.collection("movies").insertMany(movieList);

// Close mongo connection
mongoConnection.close();