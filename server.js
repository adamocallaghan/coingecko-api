import fetch from 'node-fetch';

/*      #############################################################
        ###                                                       ###
        ###   Get coin ids from from Coingecko markets endpoint   ###
        ###                                                       ###
        #############################################################
*/

const loadCoins = async() => {
    let coinNames = [];
    // const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=bitcoin&category=arbitrum-ecosystem&order=market_cap_rank&per_page=100&page=1&sparkline=false";
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=bitcoin&category=impossible-launchpad&order=market_cap_rank&per_page=5&page=1&sparkline=false";
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

const coinPrices = [];

const loadPrices = async() => {
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
        const coinPrice = [];
        let newCoinPrice;

        for(const day in data["prices"]) {
            // console.log(data["prices"][day]);
            const todaysDate = new Date(data["prices"][day][0]);
            console.log(new Date(data["prices"][day][0]));
            const todaysPrice = data["prices"][day][1];
            console.log(todaysPrice.toFixed(4));
            coinPrice.push(data["prices"][day]);
            newCoinPrice = {
                coinPrice: todaysPrice,
                coinPriceDate: todaysDate
            }
        }

        const coinObject = {
            id: coinId,
            yestPrice: coinPrice,
            coinPrices: newCoinPrice
        }
        coinPrices.push(coinObject);
        
        console.log("PRICE DATES IN READABLE FORMAT...");
        // const date = new Date((coinPrices[id]["yestPrice"][1][0])); // coinPrices -- first element in object -- "yestPrice" selected -- first sub-array in yestPrice -- first element of sub-sub-array (i.e the milliseconds since 1970)
        // console.log(new Date((coinPrices[id]["yestPrice"][0][0])));
        // console.log(new Date((coinPrices[id]["yestPrice"][1][0])));
        // console.log(new Date((coinPrices[id]["yestPrice"][2][0])));
        // console.log(new Date((coinPrices[id]["yestPrice"][3][0])));
    }

    return coinPrices;
}

const coinPricesArray = await loadPrices().then(data => data);  // Async-Await returns a Promise, hence we need to resolve it in order to use it
console.log("============== coinPrices[] is... =============");
console.log(coinPricesArray); // won't expand the nested price arrays
console.log(JSON.stringify(coinPricesArray)); // stringify to see all the data

// ***** Mongoose will do it's magic here and persist the coinPrices[] array to MongoDB cloud *****