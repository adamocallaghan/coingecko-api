import mongoose from 'mongoose';
import { User } from "./models.js";
import { Coin } from "./coinSchema.js";

import * as dotenv from 'dotenv';
dotenv.config()

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoCluster = process.env.MONGO_CLUSTER;

const connectionString = `mongodb+srv://${mongoUsername}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(connectionString);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const saveCoin = async (request, response) => {
  const coin = new Coin({
    "coinId":"idia",
    "coinPrices_Object":{"Day 0":{"todaysPrice":"0.0766","todaysDate":"2022-10-17T00:00:00.000Z"},"Day 1":{"todaysPrice":"0.0753","todaysDate":"2022-10-18T00:00:00.000Z"},"Day 2":{"todaysPrice":"0.0726","todaysDate":"2022-10-19T00:00:00.000Z"},"Day 3":{"todaysPrice":"0.0832","todaysDate":"2022-10-20T00:00:00.000Z"},"Day 4":{"todaysPrice":"0.0775","todaysDate":"2022-10-21T00:00:00.000Z"},"Day 5":{"todaysPrice":"0.0776","todaysDate":"2022-10-21T10:29:12.000Z"}}
  });

  try {
    await coin.save();
    console.log(coin);
  } catch (error) {
    console.log(error);
  }
};

saveCoin();