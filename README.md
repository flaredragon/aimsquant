# aimsquant

Instructions to Use - 
 1) Clone the Repository.
 2) Navigate into the Directory of Repository via terminal
 3) npm install
 4) node server.js

Problem statement:

Create an API to fetch stock price for a security from an external API. In this API, the main server will receive user request to fetch the stock prices.

/stock (GET): This query will return the stock prices of a stock. If the stock doesn't exist in the database, then first the stock is created, data is populated in the database and then sent back to the user.

Query fields
1. ticker or array of ticker (tickers separated by "-") (required: true) [*Ticker: Code of stock. For ex: WIPRO, TATAMOTORS, INFY etc..]
3. dataType (required: false, default: "Close") [*learn more about the types from external API output]
2. startDate (required: false)
3. endDate (required: false)

Stock has following schema.
1. ticker (Code of the stock)
2. priceHistory: (Object of stock prices {dateType: Array of prices}). For ex: "Close":[Array],"Open":[Array]) and so on). This is DIFFERENT from how data is stored in external API.
3. createdDate: Datetime the data was first added to the database
4. updatedDate: Datetime at which priceHistory was updated

How is the data populated (via inter-server communication)?

1. The API server process launches (when starts) a separate web-socket server as well (server at a different port)

2. This web-socket server is responsible for doing any computation and fetching the prices from an external third-party API.

3.  On getting, user request the API checks whether the data for the stock is present in the database. If it's not present, a request is sent to the web-socket server to fetch the data. On successful data retrieval, the data is returned back to the main server (via web-socket) and updated in the database. After update, the data is sent back to the user for the relevant query.

External API:
https://www.quandl.com/api/v3/datasets/NSE/{SYMBOL}.json?api_key=MX4zkypoSjUzp8CyotQg

Example:
https://www.quandl.com/api/v3/datasets/NSE/TCS.json?api_key=MX4zkypoSjUzp8CyotQg

Other Codes that can be used: WIPRO, INFY, TATAMOTORS

In the JSON file, complete history of TCS stock data is fetched. The relevant fields are column_names and data. Please let me know if there is any confusion about the data file.
