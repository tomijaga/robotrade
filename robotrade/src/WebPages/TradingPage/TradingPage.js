import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MaxDiv from "../../Components/MaxDiv";
import GridDiv from "../../Components/GridDiv";
import WatchlistSideBar from "../../PageElements/WatchlistSideBar";
import ChartTab from "../../PageElements/ChartTab";
import OrderEntry from "../../PageElements/Orders/OrderEntry";
import CustomTab from "../../PageElements/CustomTab";
import OrdersTab from "../../PageElements/Orders/OrdersTab";
import SymbolSearchContainer from "../../PageElements/SymbolSearchContainer";
import { connect } from "react-redux";
import { changeTradingPageSymbol } from "./Redux/actions";
import PositionsTable from "../../PageElements/Positions/PositionsTable";
import { setSelectedNavbarItem } from "../../Redux/appActions";
import StockChart from "../../Components/Charts/StockChart";

const mapDispatchToProps = (dispatch) => {
  return {
    changeTradingPageSymbol: (symbol) =>
      dispatch(changeTradingPageSymbol(symbol)),
    setSelectedNavbarItem: (index) => dispatch(setSelectedNavbarItem(index)),
  };
};

const mapStateToProps = (state) => {
  return {
    tradingPageSymbol: state.tradingPage.symbol,
    positions: state.positions,
  };
};

export const TradingPage = ({
  positions,
  tradingPageSymbol,
  changeTradingPageSymbol,
  setSelectedNavbarItem,
}) => {
  useEffect(() => {
    setSelectedNavbarItem(5);
  }, []);

  const searchContainerOptions = {
    id: "trading-page-chart",
    selectedSymbol: tradingPageSymbol,
    onSymbolChange: (symbol) => changeTradingPageSymbol(symbol),
  };

  return (
    <GridDiv container column="minmax(auto, auto) auto" row="1fr">
      <GridDiv
        className="outline-right"
        container
        column="200px"
        row="200px minmax(1fr, auto)"
      >
        <GridDiv className="outline-bottom" item column="1/2 " row="1/2">
          1
        </GridDiv>
        <GridDiv item column="1/2 " row="2/3">
          <WatchlistSideBar
            onSymbolChange={(event) => {
              const symbol = event.currentTarget.querySelector(".symbol")
                .innerText;
              changeTradingPageSymbol(symbol);
            }}
          />
        </GridDiv>
      </GridDiv>

      <GridDiv
        container
        column="minmax(0px, auto) minmax(0px, auto)"
        row="auto auto 1fr"
      >
        <GridDiv className="outline-bottom" item column="1/3 " row="1/2">
          <div>
            <SymbolSearchContainer {...searchContainerOptions} />
            <StockChart
              symbol={tradingPageSymbol}
              chartType="CandleStickChart"
            />
          </div>
        </GridDiv>
        <GridDiv className="outline-bottom" item column="1/3 " row="2/3">
          <SymbolSearchContainer {...searchContainerOptions}>
            {" "}
            <OrderEntry orderSymbol={tradingPageSymbol} />
          </SymbolSearchContainer>
        </GridDiv>
        <GridDiv className="outline-bottom" item column="1/2 " row="3/4">
          <OrdersTab />
        </GridDiv>
        <GridDiv item column="2/3 " row="3/4">
          <CustomTab tabs={["Positions"]}>
            {[<PositionsTable positions={positions} />]}
          </CustomTab>
        </GridDiv>
      </GridDiv>
    </GridDiv>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TradingPage);
