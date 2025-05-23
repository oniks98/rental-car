import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.monobank.ua/",
});

const CURRENCY_CACHE_KEY = "currencyRates";

const fetchCurrencyData = async () => {
  try {
    const response = await instance.get("bank/currency");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getCachedCurrencyData = () => {
  const cachedData = JSON.parse(localStorage.getItem(CURRENCY_CACHE_KEY));
  if (cachedData && Date.now() - cachedData.timestamp < 3600000) {
    return cachedData;
  }
  return null;
};

const cacheCurrencyData = (data) => {
  const now = Date.now();
  const usd = data.find(
    (item) => item.currencyCodeA === 840 && item.currencyCodeB === 980
  );

  const currencyData = {
    timestamp: now,
    usdRate: usd
      ? { rateBuy: usd.rateBuy.toFixed(2), rateSell: usd.rateSell.toFixed(2) }
      : null,
  };

  localStorage.setItem(CURRENCY_CACHE_KEY, JSON.stringify(currencyData));
  return currencyData;
};

export const getCurrencyRates = async () => {
  let currencyData = getCachedCurrencyData();

  if (currencyData?.usdRate) {
    return currencyData;
  }

  try {
    const data = await fetchCurrencyData();
    currencyData = cacheCurrencyData(data);

    if (!currencyData.usdRate) {
      throw new Error("Incomplete data fetched from API");
    }

    return currencyData;
  } catch {
    throw new Error("Failed to fetch valid currency data");
  }
};
