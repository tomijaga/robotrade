import getDateFormat from "./UsefullFunctions/getDateFormat";

const SERVER_URL = "http://localhost:8080";

const API_KEY = "btmdn7v48v6uocf2j9i0";

export const ENDPOINT = "http://localhost:8080";

let alphaKeyIndex = 0;

export const isArrayValid = (arr) =>
  Array.isArray(arr) ? (arr.length > 0 ? true : false) : false;

export const isObjectValid = (obj) =>
  Object.keys(obj).length > 0 && obj.constructor === Object;

const alphaVantage = (symbol, choice) => {
  const keys = [
    `CVH0XQG208A1LHZ6`,
    "RNZT6A08GD0ICJQQ",
    "V0UEIWRO63HZJXYN",
    "DMIBNHTF48K1VJML",
  ];
  const apiKey = keys[alphaKeyIndex++ % 10];
  // console.log("keyIndex", alphaKeyIndex);
  let fn;
  switch (choice) {
    case "quote":
      fn = "GLOBAL_QUOTE";
      break;
    case "search":
      return `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${apiKey}`;
    case "financials":
      fn = "OVERVIEW";
      break;
    default:
      console.error("choice not Specified in AlphaVantage");
      break;
  }

  const url = `https://www.alphavantage.co/query?function=${fn}&symbol=${symbol}&apikey=${apiKey}`;
  return url;
};

const finnhub = (symbol, choice, from, to) => {
  let url = "";

  from = from ? getDateFormat(from) : "";
  to = to ? getDateFormat(to) : "";

  if (from || to) console.log(from, " --> ", to);

  switch (choice) {
    case "companyNews":
      url = `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${from}&to=${to}&token=btmdn7v48v6uocf2j9i0`;
      break;
    case "quote":
      url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=btmdn7v48v6uocf2j9i0`;
      break;
    case "profile":
      url = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=btmdn7v48v6uocf2j9i0`;
      break;
    case "financials":
      url = `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=price&token=btmdn7v48v6uocf2j9i0`;
      break;
    case "all-financials":
      url = `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=btmdn7v48v6uocf2j9i0`;
      break;
    case "mergerNews":
      url = `https://finnhub.io/api/v1/news?category=merger&token=btmdn7v48v6uocf2j9i0`;
      break;
    case "marketNews":
      url = `https://finnhub.io/api/v1/news?category=general&token=btmdn7v48v6uocf2j9i0`;
      break;
    case "earningsCalendar":
      url = `https://finnhub.io/api/v1/calendar/earnings?from=${from}&to=${to}&token=btmdn7v48v6uocf2j9i0`;
      break;
    case "ipoCalendar":
      url = `https://finnhub.io/api/v1/calendar/ipo?from=${from}&to=${to}&token=btmdn7v48v6uocf2j9i0`;
      break;
    default:
      console.error("choice not Specified in finnhub");
      break;
  }

  return url;
};

const morningStar = async () => {
  return fetch("https://morning-star.p.rapidapi.com/market/v2/get-movers", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "morning-star.p.rapidapi.com",
      "x-rapidapi-key": "469527c5e8mshad274ff20e7c63cp1472cejsn65a52919b258",
    },
  })
    .then((resp) => resp.json())
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export { SERVER_URL, finnhub, API_KEY, alphaVantage, morningStar };
