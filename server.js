const https = require('https');

let coinIds = [];
let coinPriceHistory = [];
/*
        ##### Get all CoinGecko coins #####
        1) Loop over API results
        2) Push the ID of each coin to a 'coinIds' array for later use
*/

const getCoindIds = async() => {
    let coinIdsReturnArray = [];
    https.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=bitcoin&category=arbitrum-ecosystem&order=market_cap_rank&per_page=100&page=1&sparkline=false', res => {
    let data = [];
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.statusCode);
    console.log('Date in Response header:', headerDate);

    res.on('data', chunk => {
        data.push(chunk);
    });

    res.on('end', () => {
        console.log('Response ended: ');
        const cgCoinsData = JSON.parse(Buffer.concat(data).toString());

        for(coin in cgCoinsData) {
            // console.log(cgCoinsData[coin]["id"]);
            const coinId = cgCoinsData[coin]["id"];
            coinIdsReturnArray.push(coinId);
        }

        console.log("START >>>>> BIG ARRAY OF COIN IDS");
        console.log(coinIdsReturnArray);
        console.log("END >>>>> BIG ARRAY OF COIN IDS");
    });
    }).on('error', err => {
    console.log('Error: ', err.message);
    });
    return coinIdsReturnArray;
}

/*
        ##### Get Price History for coin based using the coinIds array #####
*/

const getPriceHistory = () => {
    console.log("SUMMMMOOONNNNNNNNERRRRRR!");
    const coinIdsArray = getCoindIds(); // it's returning a "Promise { [] }"", try to figure out the fix to get this bit done
    console.log(coinIdsArray);
    //console.log(coinIds);
    for(id in coinIds) {
        console.log("ID at position" + id + " is " + coinIds[id]);
        https.get('https://api.coingecko.com/api/v3/coins/`{id}`/market_chart?vs_currency=USD&days=3&interval=daily', res => {
        let data = [];
        const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
        console.log('Status Code:', res.statusCode);
        console.log('Date in Response header:', headerDate);
    
        res.on('data', chunk => {
            data.push(chunk);
        });
    
        res.on('end', () => {
            console.log('Response ended: ');
            const solanaHistory = JSON.parse(Buffer.concat(data).toString());
            console.log(solanaHistory);
            const solanaPrices = solanaHistory['prices'];
    
            for(price in solanaPrices) {
                console.log(solanaPrices[price][1]);
            }
    
        });
        }).on('error', err => {
        console.log('Error: ', err.message);
        })
    };
}

getPriceHistory();
