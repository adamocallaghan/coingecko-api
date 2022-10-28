import fetch from 'node-fetch';
import { connectMongoCloud, saveCoin } from "./mongotest.js";

/*      #############################################################
        ###                                                       ###
        ###   Get coin ids from from Coingecko markets endpoint   ###
        ###                                                       ###
        #############################################################
*/

const loadCoins = async() => {
    let coinNames = [];
    // const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=bitcoin&category=arbitrum-ecosystem&order=market_cap_rank&per_page=100&page=1&sparkline=false";
    // const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=bitcoin&category=impossible-launchpad&order=market_cap_rank&per_page=5&page=1&sparkline=false";
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=gmx%2Cmagic%2Cdopex&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    const res = await fetch(url);
    console.log("Coingecko markets endpoint responsed successfully: " + res.ok);

    const data = await res.json();

    for(const coin in data) {
        const coinId = data[coin]["id"];
        coinNames.push(coinId);
    }

    return coinNames;
}

const coinIdsArray = await loadCoins().then(data => data); // Async-Await returns a Promise, hence we need to resolve it in order to use it
// console.log(coinIdsArray);

/*      ################################################################
        ###                                                          ###
        ###   Get Price History for coin based on the coinIdsArray   ###
        ###                                                          ###
        ################################################################
*/

const loadPrices = async() => {

    const coinPrices = [];

    for(const id in coinIdsArray) {
        // Access 'coinid' for use in API request
        const coinId = coinIdsArray[id];

        // API request
        const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=USD&days=5&interval=daily`;
        const res = await fetch(url);
        console.log(coinId + " request was successful: " + res.ok);

        // Get response + convert to json
        const data = await res.json();

        // Create coinObject using data from both API requests + push to array
        const coinPriceArray = [];
        let coinPriceObject = {};

        for(const day in data["prices"]) {

            // Push day array to coinPriceArray array
            coinPriceArray.push(data["prices"][day]);

            // Objects created for each day and saved to/nested in main newCoinPrice object
            const todaysDate = new Date(data["prices"][day][0]);
            const todaysPrice = (data["prices"][day][1]).toFixed(4);
            coinPriceObject["Day " + day] = {
                todaysPrice: todaysPrice,
                todaysDate: todaysDate,
                todaysDateMilliseconds: data["prices"][day][0],
                todaysPriceLong: data["prices"][day][1]
            }
        }

        const coinObject = {
            coinId: coinId,
            // coinPrices_Array: coinPriceArray,
            coinPrices_Object: coinPriceObject
        }
        coinPrices.push(coinObject);
    }

    return coinPrices;
}

const coinPricesArray = await loadPrices().then(data => data);  // Async-Await returns a Promise, hence we need to resolve it in order to use it
console.log("============== coinPrices[] is... =============");
// console.log(coinPricesArray); // won't expand the nested price arrays
// console.log(JSON.stringify(coinPricesArray)); // stringify to see all the data

// ***** Mongoose will do it's magic here and persist the coinPrices[] array to MongoDB cloud *****

const theCoin = {
    "coinId":"badangax",
    "coinPrices_Object":{
      "Day 0":{"todaysPrice":"0.0766","todaysDate":"2022-10-17T00:00:00.000Z","todaysDateMilliseconds":1665964800000,"todaysPriceLong":0.07662291659226893},
      "Day 1":{"todaysPrice":"0.0753","todaysDate":"2022-10-18T00:00:00.000Z","todaysDateMilliseconds":1666051200000,"todaysPriceLong":0.07534350952689779},
      "Day 2":{"todaysPrice":"0.0726","todaysDate":"2022-10-19T00:00:00.000Z","todaysDateMilliseconds":1666137600000,"todaysPriceLong":0.07263690517706178},
      "Day 3":{"todaysPrice":"0.0832","todaysDate":"2022-10-20T00:00:00.000Z","todaysDateMilliseconds":1666224000000,"todaysPriceLong":0.08320276019215789},
      "Day 4":{"todaysPrice":"0.0775","todaysDate":"2022-10-21T00:00:00.000Z","todaysDateMilliseconds":1666310400000,"todaysPriceLong":0.07751429281678977},
      "Day 5":{"todaysPrice":"0.0774","todaysDate":"2022-10-21T11:13:38.000Z","todaysDateMilliseconds":1666350818000,"todaysPriceLong":0.07737231837606312}
    }
    }

connectMongoCloud; // connect to MongoDB cloud

// Loop over CoinPricesArray and save each coin to MongoDB Cloud
for (var coin in coinPricesArray) {
    await saveCoin(coinPricesArray[coin]).then(data => data);
    // console.log(coinPricesArray[coin]);
}

