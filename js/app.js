const stockApi = new StockAPI();
let currentChart = null;

async function searchStock() {
    const symbol = document.getElementById('stockSearch').value.toUpperCase();
    if (!symbol) return;

    try {
        const stockData = await stockApi.getStockPrice(symbol);
        updateStockInfo(stockData);
        await updateChart(symbol, '1W'); // Default to 1 week view
    } catch (error) {
        alert('Error fetching stock data. Please try again.');
    }
}

function updateStockInfo(data) {
    document.getElementById('stockSymbol').textContent = data.symbol;
    document.getElementById('currentPrice').textContent = 
        `$${data.latestPrice.toFixed(2)}`;
    
    const change = data.change.toFixed(2);
    const changePercent = (data.changePercent * 100).toFixed(2);
    const priceChange = document.getElementById('priceChange');
    
    priceChange.textContent = `${change >= 0 ? '+' : ''}${change} (${changePercent}%)`;
    priceChange.style.color = change >= 0 ? 'green' : 'red';
}

async function updateChart(symbol, period) {
    const historicalData = await stockApi.getHistoricalData(symbol, period);
    
    const ctx = document.getElementById('stockChart').getContext('2d');
    
    if (currentChart) {
        currentChart.destroy();
    }
    
    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: historicalData.map(data => data.date),
            datasets: [{
                label: `${symbol} Stock Price`,
                data: historicalData.map(data => data.close),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// Event listeners for time period buttons
document.querySelectorAll('.time-btn').forEach(button => {
    button.addEventListener('click', async (e) => {
        const period = e.target.dataset.period;
        const symbol = document.getElementById('stockSymbol').textContent;
        
        // Update active button
        document.querySelectorAll('.time-btn').forEach(btn => 
            btn.classList.remove('active'));
        e.target.classList.add('active');
        
        if (symbol) {
            await updateChart(symbol, period);
        }
    });
});
