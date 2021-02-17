import React, { useState, useEffect } from "react";
import Region from "../PageElements/Region";
import { SettingsSystemDaydreamTwoTone } from "@material-ui/icons";
import StockCrawler from "../Components/StockCrawler";
import { SERVER_URL, morningStar, finnhub } from "../Essential";
import Container from "@material-ui/core/Container";
import GridDiv from "../Components/GridDiv";
import CustomTab from "../PageElements/CustomTab";
import NewsTab from "../PageElements/NewsTab";
import MoversGrid from "../PageElements/MoversGrid";
import EarningsGrid from "../PageElements/Grids/EarningsGrid";
import ChartTab from "../PageElements/ChartTab";
import { connect } from "react-redux";
import { setSelectedNavbarItem } from "../Redux/appActions";
import Grid from "@material-ui/core/Grid";
import { TypeChooser } from "react-stockcharts/lib/helper";
import CandleStickChart from "../Components/Charts/HeikinAshiChart";
import StockChart from "../Components/Charts/StockChart";
import { timeParse } from "d3-time-format";

const parseDate = timeParse("%Y-%m-%d");

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedNavbarItem: (index) => dispatch(setSelectedNavbarItem(index)),
  };
};

const mapStateToProps = (state) => {
  return {};
};

const MarketPage = ({ match, setSelectedNavbarItem }) => {
  const [data, setData] = useState([]);
  const [movers, setMovers] = useState([]);
  const [earnings, setEarnings] = useState([]);

  console.log("earnings date", earnings);

  useEffect(() => {
    setSelectedNavbarItem(1);
    getMovers();
    getEarnings();
  }, []);

  const getMovers = () => {
    morningStar().then((resp) => setMovers(resp));
  };

  const getEarnings = () => {
    const from = new Date();
    const url = finnhub("", "earningsCalendar", from, from);
    fetch(url)
      .then((resp) => resp.json(0))
      .then((resp) => setEarnings(resp));
  };
  console.log({ match });

  return (
    <Container disableGutters={true} maxWidth="lg">
      <Grid item lg>
        <StockCrawler />
      </Grid>

      <GridDiv container row="1fr 1fr" column="50% 50%">
        <GridDiv item row="1/2" column="1/2">
          <CustomTab
            tabs={["SPY (S&P 500)", "DIA (Dow Jones)", "NDAQ (Nasdaq)"]}
          >
            {[
              <StockChart singleDay symbol="SPY" chartType="LineChart" />,
              <StockChart symbol="DIA" singleDay chartType="LineChart" />,
              <StockChart symbol="NDAQ" singleDay chartType="LineChart" />,
            ]}
          </CustomTab>
        </GridDiv>
        <GridDiv item row="1/2" column="2/3">
          <CustomTab tabs={["Market News", "Merger News"]}>
            {[<NewsTab market />, <NewsTab merger />]}
          </CustomTab>
        </GridDiv>

        <GridDiv item row="2/3" column="1/2">
          <CustomTab
            vertical
            tabs={["Top Gainers", "Top Losers", "Most Active"]}
          >
            {[
              <MoversGrid data={movers ? movers.gainers : []} />,
              <MoversGrid data={movers ? movers.losers : []} />,
              <MoversGrid active data={movers ? movers.actives : []} />,
            ]}
          </CustomTab>
        </GridDiv>
        <GridDiv item row="2/3" column="2/3">
          <CustomTab tabs={["Earnings", "IPO"]}>
            {[<EarningsGrid data={earnings.earningsCalendar} />]}
          </CustomTab>
        </GridDiv>
      </GridDiv>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketPage);
