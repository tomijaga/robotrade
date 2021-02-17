import React, { useEffect } from "react";
import ChartTab from "../../PageElements/ChartTab";
import NewsTab from "../../PageElements/NewsTab";
import CustomTab from "../../PageElements/CustomTab";
import WatchlistSideBar from "../../PageElements/WatchlistSideBar";
import StockInfoBar from "../../PageElements/StockInfoBar";
import { connect } from "react-redux";
import { setSelectedNavbarItem } from "../../Redux/appActions";
import { setStocksPageSymbol } from "./Redux/actions";
import StockChart from "../../Components/Charts/StockChart";
import "./StockPage.css";

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedNavbarItem: (index) => dispatch(setSelectedNavbarItem(index)),
    setStocksPageSymbol: (symbol) => dispatch(setStocksPageSymbol(symbol)),
  };
};

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.loginStatus.userIsLoggedIn,
    watchlists: state.watchlists.data,
    events: state.events,
    isUserDataPending: state.userDataObj.isPending,
    stocksPageSymbol: state.stocksPage.symbol,
  };
};

const StocksPage = ({
  setSelectedNavbarItem,
  setStocksPageSymbol,
  watchlists,
  stocksPageSymbol,
}) => {
  useEffect(() => {
    setSelectedNavbarItem(3);
  }, []);

  return (
    <div className="parentGrid">
      <div
        className="outline-right stockPageDiv1"
        style={{
          gridColumn: " 1/2 ",
          gridRow: "1/3",
          width: "100%",
          height: "100%",
        }}
      >
        <WatchlistSideBar
          onSymbolChange={(event) => {
            const symbol = event.currentTarget.querySelector(".symbol")
              .innerText;
            setStocksPageSymbol(symbol);
          }}
          recentStocks={["CHGG", "DIS"]}
        />
      </div>
      <div
        style={{
          alignItems: "stretch",
          gridColumn: "2/3",
          gridRow: "1/3",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="outline-bottom"
          style={{
            backgroundColor: "transparent",

            height: "100%",
          }}
        >
          <StockChart
            websocket
            chartType="CandleStickChart"
            symbol={stocksPageSymbol}
          />
        </div>

        <div
          style={{
            backgroundColor: "tansparent",

            height: "100%",
          }}
        >
          {
            <CustomTab
              tabs={[
                "News",
                "Financials",
                "Analysis",
                "Press Release",
                "About",
              ]}
            >
              {[
                <NewsTab days={1} stockSymbols={["TSLA"]}></NewsTab>,
                <div>Coming Soon!</div>,
                <div>Coming Soon!</div>,

                <div>Coming Soon!</div>,

                <div>Coming Soon!</div>,
              ]}
            </CustomTab>
          }
        </div>
      </div>

      <div
        className="outline-left"
        style={{
          backgroundColor: "transparent",
          gridColumn: "3/4",
          gridRow: "1/3",
          height: "100%",
          width: "100%",
        }}
      >
        <StockInfoBar symbol={stocksPageSymbol} />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StocksPage);
