import fetch from 'node-fetch';

const loadCoins = async() => {
    let coinNames = [];
    // const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=bitcoin&category=arbitrum-ecosystem&order=market_cap_rank&per_page=100&page=1&sparkline=false";
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=bitcoin&category=impossible-launchpad&order=market_cap_rank&per_page=5&page=1&sparkline=false";
    const res = await fetch(url);
    console.log(res.ok);

    const data = await res.json();

    for(const coin in data) {
        const coinId = data[coin]["id"];
        coinNames.push(coinId);
    }

    return coinNames;
}

const coinIdsArray = await loadCoins().then(data => data);
// console.log(coinIdsArray);

/*
        ##### Get Price History for coin based using the coinIdsArray #####
*/

const loadPrices = async() => {
    console.log("Index 5 of coinIdsArray is " + coinIdsArray[0] + " and is type " + typeof coinIdsArray[0]);

    for(const id in coinIdsArray) {
        const coinId = coinIdsArray[id];
        console.log(id + " is: " + coinId);

        const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=USD&days=3&interval=daily`;
        const res = await fetch(url);
        console.log(res.ok);

        const data = await res.json();
        console.log(data["prices"][0]);
        // console.log(data);
    }

    // for(const coin in coinIdsArray) {
    //     const coinPrice = data[coin]["prices"];
    //     coinsPrices.push(coinPrice);
    //     console.log(coinPrice);
    // }

    // return coinsPrices;
}

loadPrices();