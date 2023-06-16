import { MongoClient } from "mongodb";
import mysql from "mysql2/promise";

import { mongoURI } from "./credentials.js";
import { sqlLogin } from "./credentials.js";

const db = await mysql.createConnection(sqlLogin);
const [movieList] = await db.execute("SELECT * FROM movies")
db.end();

console.log(movieList)

const mongoConnection = new MongoClient(mongoURI);
await mongoConnection.connect();
const mongoDatabase = mongoConnection.db("c11-practice");

await mongoDatabase.collection("movies").insertMany(movieList);

mongoConnection.close();