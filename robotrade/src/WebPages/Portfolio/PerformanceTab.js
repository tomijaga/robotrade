import React, { useState, useEffect } from "react";
import MaxDiv from "../../Components/MaxDiv";
import GridDiv from "../../Components/GridDiv";
import Chart from "react-google-charts";
import RingLoader from "react-spinners/RingLoader";
import Center from "../../Components/Center";
import Typography from "@material-ui/core/Typography";
import { isArrayValid } from "../../Essential";
import { connect } from "react-redux";
import PositionsTable from "../../PageElements/Positions/PositionsTable";
import format from "date-fns/format";
import classnames from "classnames";

const IndustryComponent = ({ data, onClick, highlight }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          color: "rgba(255, 255, 255, 0.7)",
          width: "400px",
          padding: "0px 10px",
          margin: "10px 0px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          wrap: "nowrap",
        }}
      >
        <div style={{ width: "140px", textAlign: "left" }}>
          <Typography variant="subtitle2">Industry</Typography>
        </div>
        <div style={{ width: "70px", textAlign: "center" }}>
          <Typography variant="subtitle2">no. of stocks</Typography>
        </div>
        <div style={{ width: "70px", textAlign: "right" }}>
          <Typography variant="subtitle2">Equity</Typography>
        </div>
        <div style={{ width: "70px", textAlign: "right" }}>
          <Typography variant="subtitle2">PnL</Typography>
        </div>
      </div>
      {isArrayValid(data) ? (
        data.map((d, i) => {
          return (
            <div
              key={i}
              onClick={onClick}
              className={classnames("component-hover", {
                highlight: Boolean(highlight),
              })}
              style={{
                width: "400px",
                padding: "5px 10px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "space-between",
                wrap: "nowrap",
              }}
            >
              <div style={{ width: "140px", textAlign: "left" }}>
                <Typography
                  style={{ color: "lightskyblue" }}
                  variant="subtitle2"
                >
                  {d.industry}
                </Typography>
              </div>
              <div style={{ width: "70px", textAlign: "center" }}>
                <Typography variant="subtitle2">{d.stocksInSector}</Typography>
              </div>
              <div style={{ width: "70px", textAlign: "right" }}>
                <Typography variant="subtitle2">
                  {d.equity.toFixed(2)}
                </Typography>
              </div>
              <div
                className={d.PnL >= 0 ? "profit" : "loss"}
                style={{ width: "70px", textAlign: "right" }}
              >
                <Typography variant="subtitle2">{d.PnL.toFixed(2)}</Typography>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.loginStatus.userIsLoggedIn,
    isUserDataPending: state.userDataObj.isPending,
    positions: [
      {
        symbol: "TSLA",
        executionPrice: 234,
        currentPrice: 342,
        quantity: 25,
        industry: "Technology",
      },
      {
        symbol: "PLTR",
        executionPrice: 21.62,
        currentPrice: 27.37,
        quantity: 51,
        industry: "Technology",
      },
    ],
    daily: [
      {
        date: format(
          new Date(Date.now() - 1000 * 60 * 60 * 24 * 24),
          "dd/MM/yyyy"
        ),
        net_account_value: 2000,

        PnL: 0,
      },
      {
        date: format(
          new Date(Date.now() - 1000 * 60 * 60 * 24 * 23),
          "dd/MM/yyyy"
        ),
        net_account_value: 2150,

        PnL: 150,
      },
      {
        date: format(
          new Date(Date.now() - 1000 * 60 * 60 * 24 * 22),
          "dd/MM/yyyy"
        ),
        net_account_value: 2050,

        PnL: 50,
      },
      {
        date: format(
          new Date(Date.now() - 1000 * 60 * 60 * 24 * 24),
          "dd/MM/yyyy"
        ),
        net_account_value: 1950,

        PnL: -50,
      },
      {
        date: format(
          new Date(Date.now() - 1000 * 60 * 60 * 24 * 24),
          "dd/MM/yyyy"
        ),
        net_account_value: 1850,

        PnL: -150,
      },
    ],
  };
};

const PerformanceTab = ({ positions, daily }) => {
  const sectors = [
    "Healthcare",
    "Telecommunications Services",
    "Energy",
    "Basic Materials",
    "Consumer Cyclicals",
    "Technology",
    "Financials",
    "Utilities",
    "Consumer Non-Cyclicals",
    "Industrials",
  ];

  const [sectorData, setSectorData] = useState([]);
  const [pieData, setPieData] = useState([]);

  const [areaChartData, setAreaChartData] = useState([]);
  const [selectedSector, setSelectedSector] = useState("Healthcare");

  useEffect(() => {
    let pieInit = {
      ["Healthcare"]: 0,
      ["Telecommunications Services"]: 0,
      ["Energy"]: 0,
      ["Basic Materials"]: 0,
      ["Consumer Cyclicals"]: 0,
      ["Technology"]: 0,
      ["Financials"]: 0,
      ["Utilities"]: 0,
      ["Consumer Non-Cyclicals"]: 0,
      ["Industrials"]: 0,
    };
    if (!isArrayValid(positions)) {
      Object.keys(pieInit).map((key) => {
        pieInit[key] = 0.00000000000000000000000000000000000000001;
      });
    }

    let sectorInit = [
      { industry: "Healthcare", stocksInSector: 0, equity: 0, PnL: 0 },
      {
        industry: "Telecommunications Services",
        stocksInSector: 0,
        equity: 0,
        PnL: 0,
      },
      { industry: "Energy", stocksInSector: 0, equity: 0, PnL: 0 },
      { industry: "Basic Materials", stocksInSector: 0, equity: 0, PnL: 0 },
      {
        industry: "Consumer Cyclicals",
        stocksInSector: 0,
        equity: 0,
        PnL: 0,
      },
      { industry: "Technology", stocksInSector: 0, equity: 0, PnL: 0 },
      { industry: "Financials", stocksInSector: 0, equity: 0, PnL: 0 },
      { industry: "Utilities", stocksInSector: 0, equity: 0, PnL: 0 },
      {
        industry: "Consumer Non-Cyclicals",
        stocksInSector: 0,
        equity: 0,
        PnL: 0,
      },
      { industry: "Industrials", stocksInSector: 0, equity: 0, PnL: 0 },
    ];

    if (isArrayValid(positions)) {
      positions.forEach((d, i) => {
        const { executionPrice, currentPrice, quantity } = d;
        const equity = quantity * currentPrice;
        const PnL = equity - quantity * executionPrice;

        pieInit[d.industry] += equity;

        const sc = sectorInit[sectors.indexOf(d.industry)];
        sc.stocksInSector++;
        sc.equity += equity;
        sc.PnL = PnL;
      });

      sectorInit = sectorInit.filter((obj) => {
        return obj.stocksInSector > 0;
      });

      setSelectedSector(sectorInit[0].industry);
    }

    pieInit = Object.entries(pieInit);
    pieInit.unshift(["Industry", "Invested Equity "]);
    console.dir({ pieInit });

    setPieData(() => pieInit);
    setSectorData(() => sectorInit);
  }, [positions]);

  useEffect(() => {
    let data = daily.map((day) => {
      return [day.date, day.net_account_value, day.PnL];
    });

    data.unshift(["Date", "Equity", "PnL"]);

    setAreaChartData(data);
  }, [selectedSector, daily]);

  return (
    <GridDiv container column="auto auto " row="auto auto">
      <GridDiv item column="1/3" row="1/2">
        <MaxDiv
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "auto",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            <Chart
              width={300}
              height={300}
              chartType="PieChart"
              loader={
                <MaxDiv>
                  <Center>
                    <RingLoader size={60} color="#34D7B7" />
                  </Center>
                </MaxDiv>
              }
              data={pieData}
              options={{
                fontSize: 14,
                backgroundColor: "transparent",
                title: "Sector Distribution",
                titleTextStyle: {
                  bold: true,
                  fontSize: 14,
                },
                legend: "none",
                pieSliceText: "label",
                sliceVisibilityThreshold: 0,

                // Just add this option
                pieHole: isArrayValid(positions) ? 0.4 : 0,
              }}
              legendToggle
            />
            <IndustryComponent
              onClick={(event) => {
                let sector = event.currentTarget.children[0].innerText;
                setSelectedSector(sector);
              }}
              highlight={sectors.indexOf(selectedSector)}
              data={sectorData}
            />
          </div>

          <Chart
            style={{ backgroundColor: "darkslategray" }}
            width={600}
            height={400}
            chartType="AreaChart"
            loader={
              <MaxDiv>
                <Center>
                  <RingLoader size={60} color="#34D7B7" />
                </Center>
              </MaxDiv>
            }
            data={areaChartData}
            options={{
              backgroundColor: "transparent",
              isStacked: true,
              legend: { position: "top", maxLines: 3 },
              vAxis: {
                minValue: 0,
                textStyle: {
                  color: "azure",

                  fontSize: 13,
                  bold: false,
                },
                hAxis: {
                  textStyle: {
                    color: "azure",

                    fontSize: 13,
                    bold: false,
                  },
                },
              },
            }}
            legendToggle
          />
        </MaxDiv>
      </GridDiv>
      <GridDiv item column="1/3" row="2/3">
        <div style={{ marginTop: "20px", width: "100%", textAlign: "center" }}>
          <Typography variant="subtitle1">
            {selectedSector + " Stocks"}
          </Typography>
        </div>

        <PositionsTable
          simple
          customPositions={positions.filter((p) => {
            return p.industry === selectedSector;
          })}
        />
      </GridDiv>
    </GridDiv>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceTab);
