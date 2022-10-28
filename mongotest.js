import mongoose from 'mongoose';
import { User } from "./models.js";
import { Coin } from "./coinSchema.js";

import * as dotenv from 'dotenv';
dotenv.config()

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoCluster = process.env.MONGO_CLUSTER;

const connectMongoCloud = async() => {
  const connectionString = `mongodb+srv://${mongoUsername}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;
  mongoose.connect(connectionString);
  
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });
}

connectMongoCloud();

const saveCoin = async (theCoin) => {

  // const theCoin = {
  //   "coinId":"blerbugh",
  //   "coinPrices_Object":{
  //     "Day 0":{"todaysPrice":"0.0766","todaysDate":"2022-10-17T00:00:00.000Z","todaysDateMilliseconds":1665964800000,"todaysPriceLong":0.07662291659226893},
  //     "Day 1":{"todaysPrice":"0.0753","todaysDate":"2022-10-18T00:00:00.000Z","todaysDateMilliseconds":1666051200000,"todaysPriceLong":0.07534350952689779},
  //     "Day 2":{"todaysPrice":"0.0726","todaysDate":"2022-10-19T00:00:00.000Z","todaysDateMilliseconds":1666137600000,"todaysPriceLong":0.07263690517706178},
  //     "Day 3":{"todaysPrice":"0.0832","todaysDate":"2022-10-20T00:00:00.000Z","todaysDateMilliseconds":1666224000000,"todaysPriceLong":0.08320276019215789},
  //     "Day 4":{"todaysPrice":"0.0775","todaysDate":"2022-10-21T00:00:00.000Z","todaysDateMilliseconds":1666310400000,"todaysPriceLong":0.07751429281678977},
  //     "Day 5":{"todaysPrice":"0.0774","todaysDate":"2022-10-21T11:13:38.000Z","todaysDateMilliseconds":1666350818000,"todaysPriceLong":0.07737231837606312}
  //   }
  //   }

  const coin = new Coin(theCoin);

  try {
    await coin.save();
    console.log(coin);
  } catch (error) {
    console.log(error);
  }
};

const saveTheCoin = {
  "coinId":"bolardero",
  "coinPrices_Object":{
    "Day 0":{"todaysPrice":"0.0766","todaysDate":"2022-10-17T00:00:00.000Z","todaysDateMilliseconds":1665964800000,"todaysPriceLong":0.07662291659226893},
    "Day 1":{"todaysPrice":"0.0753","todaysDate":"2022-10-18T00:00:00.000Z","todaysDateMilliseconds":1666051200000,"todaysPriceLong":0.07534350952689779},
    "Day 2":{"todaysPrice":"0.0726","todaysDate":"2022-10-19T00:00:00.000Z","todaysDateMilliseconds":1666137600000,"todaysPriceLong":0.07263690517706178},
    "Day 3":{"todaysPrice":"0.0832","todaysDate":"2022-10-20T00:00:00.000Z","todaysDateMilliseconds":1666224000000,"todaysPriceLong":0.08320276019215789},
    "Day 4":{"todaysPrice":"0.0775","todaysDate":"2022-10-21T00:00:00.000Z","todaysDateMilliseconds":1666310400000,"todaysPriceLong":0.07751429281678977},
    "Day 5":{"todaysPrice":"0.0774","todaysDate":"2022-10-21T11:13:38.000Z","todaysDateMilliseconds":1666350818000,"todaysPriceLong":0.07737231837606312}
  }
  }

// saveCoin(saveTheCoin);

export { connectMongoCloud };
export { saveCoin };

// export const connectMongoCloudFunction = connectMongoCloud();
// export const saveCoinFunction = saveCoin();