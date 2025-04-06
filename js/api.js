class StockAPI {
    constructor() {
        // You'll need to sign up for an API key from a stock data provider
        this.API_KEY = 'YOUR_API_KEY';
        this.BASE_URL = 'https://api.example.com/v1'; // Replace with actual API endpoint
    }

    async getStockPrice(symbol) {
        try {
            const response = await fetch(
                `${this.BASE_URL}/stock/${symbol}/quote?token=${this.API_KEY}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching stock price:', error);
            throw error;
        }
    }

    async getHistoricalData(symbol, period) {
        try {
            const response = await fetch(
                `${this.BASE_URL}/stock/${symbol}/historical/${period}?token=${this.API_KEY}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching historical data:', error);
            throw error;
        }
    }
}
