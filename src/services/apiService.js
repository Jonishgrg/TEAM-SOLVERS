const API_BASE = 'http://localhost:5000/api';

export const apiService = {
  // Market Prices API
  getMarketPrices: async () => {
    try {
      const response = await fetch(`${API_BASE}/market-prices`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching market prices:', error);
      return { data: [] };
    }
  },

  refreshMarketPrices: async () => {
    try {
      const response = await fetch(`${API_BASE}/market-prices/refresh`, { method: 'POST' });
      return await response.json();
    } catch (error) {
      console.error('Error refreshing market prices:', error);
      return { success: false };
    }
  },

  searchPrices: async (query) => {
    try {
      const response = await fetch(`${API_BASE}/market-prices/search?q=${query}`);
      return await response.json();
    } catch (error) {
      console.error('Error searching prices:', error);
      return { data: [] };
    }
  },

  // Health Check
  healthCheck: async () => {
    try {
      const response = await fetch(`${API_BASE}/health`);
      return await response.json();
    } catch (error) {
      console.error('Error health check:', error);
      return { status: 'down' };
    }
  },
};

export default apiService;
