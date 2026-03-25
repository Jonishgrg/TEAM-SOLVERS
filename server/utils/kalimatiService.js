import axios from 'axios';
import * as cheerio from 'cheerio';

// Cache for prices with timestamp
let priceCache = {
  data: null,
  timestamp: null,
  ttl: 3600000 // 1 hour cache
};

/**
 * Fetch real-time market prices from Kalimati Market
 * Falls back to cached data if available
 */
export const fetchKalimatiPrices = async () => {
  try {
    // Check if cache is still valid
    if (priceCache.data && (Date.now() - priceCache.timestamp) < priceCache.ttl) {
      console.log('Using cached Kalimati prices');
      return {
        source: 'kalimati',
        prices: priceCache.data,
        cached: true,
        timestamp: priceCache.timestamp
      };
    }

    console.log('Attempting to fetch fresh Kalimati prices...');

    // Fetch the main page with timeout and error handling
    const response = await axios.get('https://kalimatimarket.gov.np/', {
      timeout: 8000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });

    const $ = cheerio.load(response.data);
    const prices = [];

    // Try multiple selectors to find price tables
    const tableSelectors = [
      'table tbody tr',
      'table tr',
      '.price-table tbody tr',
      '[role="table"] tr'
    ];

    for (const selector of tableSelectors) {
      $(selector).each((index, element) => {
        const cols = $(element).find('td, th');
        
        if (cols.length >= 4) {
          const commodity = $(cols[0]).text().trim();
          const unit = $(cols[1]).text().trim();
          const minPrice = $(cols[2]).text().trim().replace(/[^\d.]/g, '');
          const maxPrice = $(cols[3]).text().trim().replace(/[^\d.]/g, '');
          
          if (commodity && commodity.length > 2 && unit && minPrice && maxPrice) {
            const min = parseFloat(minPrice);
            const max = parseFloat(maxPrice);
            
            // Validate that we got proper numbers
            if (!isNaN(min) && !isNaN(max) && min > 0 && max > 0) {
              const avg = ((min + max) / 2).toFixed(2);
              
              prices.push({
                commodity: commodity,
                unit: unit,
                minPrice: min.toString(),
                maxPrice: max.toString(),
                average: avg,
                location: 'Kalimati Market, Kathmandu',
                source: 'kalimati',
                fetchedAt: new Date().toISOString()
              });
            }
          }
        }
      });
      
      // Stop if we found prices
      if (prices.length > 10) {
        console.log(`Found ${prices.length} prices using selector: ${selector}`);
        break;
      }
    }

    // If we found prices, cache them
    if (prices.length > 5) {
      // Remove duplicates
      const uniquePrices = Array.from(
        new Map(prices.map(p => [p.commodity, p])).values()
      );
      
      priceCache.data = uniquePrices;
      priceCache.timestamp = Date.now();
      
      console.log(`Successfully cached ${uniquePrices.length} prices from Kalimati`);
      
      return {
        source: 'kalimati',
        prices: uniquePrices,
        cached: false,
        timestamp: Date.now()
      };
    }

    console.log('No prices found from Kalimati (< 5 items), checking cache...');
    
    // Return cached data if available
    if (priceCache.data && priceCache.data.length > 0) {
      console.log(`Returning ${priceCache.data.length} cached prices`);
      return {
        source: 'kalimati',
        prices: priceCache.data,
        cached: true,
        timestamp: priceCache.timestamp,
        warning: 'Using cached data (fresh fetch returned insufficient data)'
      };
    }

    // Unable to get any data from Kalimati
    console.warn('Unable to fetch Kalimati prices and no cache available');
    return null;
  } catch (error) {
    console.error('Error fetching Kalimati prices:', error.message);
    
    // Return cached data if available on error
    if (priceCache.data && priceCache.data.length > 0) {
      console.log(`Returning ${priceCache.data.length} cached prices due to error`);
      return {
        source: 'kalimati',
        prices: priceCache.data,
        cached: true,
        timestamp: priceCache.timestamp,
        error: `Error during fetch: ${error.message}`,
        fallback: true
      };
    }

    return null;
  }
};

/**
 * Clear the price cache
 */
export const clearPriceCache = () => {
  priceCache = {
    data: null,
    timestamp: null,
    ttl: 3600000
  };
};

/**
 * Get cache status
 */
export const getCacheStatus = () => {
  return {
    hasData: !!priceCache.data,
    timestamp: priceCache.timestamp,
    isValid: priceCache.data && (Date.now() - priceCache.timestamp) < priceCache.ttl,
    itemCount: priceCache.data ? priceCache.data.length : 0
  };
};
