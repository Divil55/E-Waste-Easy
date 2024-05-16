const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

// Function to scrape the price from the provided URL
async function scrapePrice(url, name, isCommodity = true) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Extracting the price from the webpage using CSS selectors
        const priceString = $('.price-section__current-value').text().trim();

        // Removing the currency symbol and formatting the price
        const priceInUSD = parseFloat(priceString.replace('$', '').replace(',', ''));

        // Converting USD to INR using the current exchange rate
        const exchangeRate = await scrapeExchangeRate();
        const priceInINRPerUnit = isCommodity ? priceInUSD * exchangeRate : priceInUSD * exchangeRate / 31.1035;

        return { name, price: priceInINRPerUnit };
    } catch (error) {
        console.error(`Error scraping price for ${name}:`, error);
        return null;
    }
}

// Function to scrape the exchange rate from the provided URL
async function scrapeExchangeRate() {
    try {
        const response = await axios.get('https://markets.businessinsider.com/currencies/usd-inr');
        const $ = cheerio.load(response.data);

        // Extracting the exchange rate from the webpage using CSS selectors
        const exchangeRateString = $('.price-section__current-value').text().trim();

        // Parsing the exchange rate
        const exchangeRate = parseFloat(exchangeRateString);

        return exchangeRate;
    } catch (error) {
        console.error('Error scraping exchange rate:', error);
        return null;
    }
}

// URLs of the commodities along with their names
const commodityUrls = [
    { url: 'https://markets.businessinsider.com/commodities/iron-ore-price', name: 'Iron' },
    { url: 'https://markets.businessinsider.com/commodities/copper-price', name: 'Copper' },
    { url: 'https://markets.businessinsider.com/commodities/zinc-price', name: 'Zinc' },
    { url: 'https://markets.businessinsider.com/commodities/lead-price', name: 'Lead' },
    { url: 'https://markets.businessinsider.com/commodities/aluminum-price', name: 'Aluminum' }
];

// URLs of the additional commodities along with their names
const additionalUrls = [
    { url: 'https://markets.businessinsider.com/commodities/silver-price', name: 'Silver' },
    { url: 'https://markets.businessinsider.com/commodities/gold-price', name: 'Gold' },
    { url: 'https://markets.businessinsider.com/commodities/palladium-price', name: 'Palladium' }
];

// Function to scrape prices for both commodities and additional commodities
async function scrapeAllPrices() {
    const allPrices = {};

    // Scraping commodity prices
    const commodityPrices = [];
    for (const commodity of commodityUrls) {
        const price = await scrapePrice(commodity.url, commodity.name);
        commodityPrices.push(price);
    }
    allPrices.commodities = commodityPrices;

    // Scraping additional commodity prices
    const additionalPrices = [];
    for (const additional of additionalUrls) {
        const price = await scrapePrice(additional.url, additional.name, false);
        additionalPrices.push(price);
    }
    allPrices.additionalCommodities = additionalPrices;

    return allPrices;
}

// Exporting the functions
module.exports = {
    scrapePrice,
    scrapeExchangeRate,
    scrapeAllPrices
};
