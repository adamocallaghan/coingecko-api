import mongoose from 'mongoose';

import * as dotenv from 'dotenv';
dotenv.config()

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoCluster = process.env.MONGO_CLUSTER;

const connectionString = `mongodb+srv://${mongoUsername}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(connectionString);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error xyz: "));
db.once("open", function () {
  console.log("Connected successfully");
});