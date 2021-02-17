export const getWatchlist = (userData, watchlistName) => {
  const w = userData.watchlists.find(
    (watchlist) => watchlist.name === watchlistName
  );
  return w;
};

export const createNewWatchlist = (userData, watchlistName) => {
  userData.watchlists.push({ name: watchlistName, symbols: [] });
  return;
};

export const deleteWatchlist = (userData, watchlistName) => {
  userData.watchlists = userData.watchlists.filter((watchlist) => {
    return watchlist.name !== watchlistName;
  });
};

export const removeWatchlistSymbol = (watchlist, symbol) => {
  watchlist.symbols = watchlist.symbols.filter((item) => {
    return symbol !== item;
  });
};
