// API service for communicating with the backend
const API_URL = '/api';

// Get all market prices
export const getMarketPrices = async () => {
  try {
    const response = await fetch(`${API_URL}/market-prices`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching market prices:', error);
    throw error;
  }
};

// User authentication
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || `Login failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || `Registration failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Search market prices by commodity name
export const searchMarketPrices = async (query) => {
  try {
    const response = await fetch(`${API_URL}/market-prices/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching market prices:', error);
    throw error;
  }
};

// Get location data using OpenStreetMap Nominatim API
export const searchLocation = async (query) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}, Nepal`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching location:', error);
    throw error;
  }
};

// Get all farm produce data
export const getFarmProduceData = async () => {
  try {
    const response = await fetch(`${API_URL}/farm-produce`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching farm produce data:', error);
    throw error;
  }
};

// Get farm produce data by category
export const getFarmProduceByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/farm-produce/category/${encodeURIComponent(category)}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching farm produce data for category ${category}:`, error);
    throw error;
  }
};

// Get price history for a specific commodity
export const getPriceHistory = async (commodity) => {
  try {
    const response = await fetch(`${API_URL}/price-history/${encodeURIComponent(commodity)}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching price history for ${commodity}:`, error);
    throw error;
  }
};

// Get all marketplace listings
export const getMarketplaceListings = async () => {
  try {
    const response = await fetch(`${API_URL}/marketplace`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching marketplace listings:', error);
    throw error;
  }
};

// Add a new marketplace listing
export const addMarketplaceListing = async (listing) => {
  try {
    const response = await fetch(`${API_URL}/marketplace`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(listing)
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding marketplace listing:', error);
    throw error;
  }
};

// Update a marketplace listing
export const updateMarketplaceListing = async (id, updates) => {
  try {
    const response = await fetch(`${API_URL}/marketplace/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating marketplace listing ${id}:`, error);
    throw error;
  }
};

// Delete a marketplace listing
export const deleteMarketplaceListing = async (id) => {
  try {
    const response = await fetch(`${API_URL}/marketplace/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deleting marketplace listing ${id}:`, error);
    throw error;
  }
};

export default {
  getMarketPrices,
  searchMarketPrices,
  searchLocation,
  getFarmProduceData,
  getFarmProduceByCategory,
  getPriceHistory,
  getMarketplaceListings,
  addMarketplaceListing,
  updateMarketplaceListing,
  deleteMarketplaceListing
};