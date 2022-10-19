# Coingecko API

Uses fetch() to call the Coingecko V3 API.

Done:
* Fetches "/coins/markets"
* Uses returned coin ids to fetch prices history from "/coins/${coinId}/market_chart"

Next:
* combine specific data to single js objects
* use mongoose to save to MongoDB cloud
* set up chron jobs to periodically fetch API requests

- Adam