const apiKey = 'YOUR_API_KEY'; // Replace with your actual MarketStack API key
const stocksInfoDiv = document.getElementById('stocksInfo');
const errorDiv = document.getElementById('error');

document.getElementById('fetchStocks').addEventListener('click', fetchNiftyStocks);

function fetchNiftyStocks() {
    // List of 10 popular NSE stocks
    const symbols = 'RELIANCE, HDFCBANK, TCS, INFY, ICICIBANK, HINDUNILVR, AXISBANK, KOTAKBANK, SBI, BAJFINANCE';
    const url = `http://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=${symbols}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.data) {
                const stocksList = data.data.map(stock => `
                    <div class="stock">
                        <h2>${stock.symbol}</h2>
                        <p>Current Price: ₹${stock.close}</p>
                        <p>Open: ₹${stock.open}</p>
                        <p>High: ₹${stock.high}</p>
                        <p>Low: ₹${stock.low}</p>
                        <p>Volume: ${stock.volume}</p>
                    </div>
                `).join('');
                stocksInfoDiv.innerHTML = stocksList;
                errorDiv.textContent = ""; // Clear any previous errors
            } else {
                showError(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorDiv.textContent = "Error fetching data. Please try again later.";
        });
}

function showError(data) {
    errorDiv.textContent = "Error fetching data. Please check the API.";
}
