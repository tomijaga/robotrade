import React, { useState, useEffect } from "react";
//import EmptyIcon from "../Components/EmptyIcon";
import Scrollbar from "../Components/Scrollbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { finnhub } from "../Essential";
import "./NewsTab.css";
import getDateFormat from "../UsefullFunctions/getDateFormat";
import ErrorBoundary from "../Components/ErrorBoundary";
import MaxDiv from "../Components/MaxDiv";
import { isArrayValid } from "../Essential";
import RingLoader from "react-spinners/RingLoader";
import Center from "../Components/Center";

const NewsTab = ({ stockSymbols, market, merger, header, days }) => {
  const [isNewsAvailable, setIsNewsAvailable] = useState(false);
  const [news, setNews] = useState([]);

  useEffect(() => {
    if (market) {
      getMarketNews();
    } else if (merger) {
      getMergerNews();
    } else {
      getNewsFromFinnhub(stockSymbols, days);
    }
  }, [stockSymbols]);

  const getMarketNews = async () => {
    const url = finnhub("", "marketNews");

    await fetch(url)
      .then((resp) => resp.json())
      .then((resp) => setNews(resp));
  };

  const getMergerNews = async () => {
    const url = finnhub("", "mergerNews");

    await fetch(url)
      .then((resp) => resp.json())
      .then((resp) => setNews(resp));
  };

  const getNewsFromFinnhub = async (symbol, days = 0) => {
    let currentTime = Math.floor(Date.now() / 1000);

    const to = new Date();
    const from = new Date(to - 1000 * 3600 * 24 * days);

    // console.log(to);
    // console.log(from);
    console.log(getDateFormat(from), " --> ", getDateFormat(to));
    console.log(stockSymbols);
    const urls = stockSymbols.map((symbol) => {
      return finnhub(symbol, "companyNews", from, to);
    });
    console.log("urls", urls);

    let rawData;
    await Promise.all(
      urls.map((url) => {
        return fetch(url).then((resp) => resp.json());
      })
    ).then((resp) => {
      rawData = resp.reduce((acc, resp) => {
        return [...acc, ...resp];
      }, []);
      rawData.sort((v1, v2) => {
        return v2.datetime - v1.datetime;
      });
      setNews(rawData);
    });
  };

  const howMuchTimePast = (pastTime) => {
    const currentTime = Math.floor(Date.now() / 1000);

    let x = new Date((currentTime - pastTime) * 1000);

    if (x.getTime() > 1000 * 60 * 60 * 24) {
      return `${x.getUTCDate()}d_ago`;
    } else if (
      x.getTime() < 1000 * 60 * 60 * 24 &&
      x.getTime() > 1000 * 60 * 60
    ) {
      return `${x.getUTCHours()}h_ago`;
    } else if (x.getTime() > 1000 * 60) {
      return `${x.getUTCMinutes()}m_ago`;
    } else {
      return `0m_ago`;
    }
  };

  const addNewsTicker = (ticker) => {
    if (header) {
      return (
        <ErrorBoundary>
          <Grid item>
            <span
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                width: "55pt",
              }}
            >
              {ticker}
            </span>
          </Grid>
        </ErrorBoundary>
      );
    }
  };

  const addHeader = () => {
    if (header) {
      return (
        <div style={{ fontSize: "1.5rem", borderBottom: " dotted 2px white" }}>
          News
        </div>
      );
    }
  };

  const deliverNews = () => {
    if (news) {
      return news.map((newsItem, i) => {
        return (
          <a
            className="newsItem"
            key={i}
            rel="noopener noreferrer"
            href={newsItem.url}
            target="_blank"
            style={{
              textDecoration: "none",
              color: "inherit",
              gridTemplateColumns: "auto auto",
              fontSize: "0.8rem",
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <div style={{ margin: "10px 5px" }}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.5)",
                      width: "45pt",
                      textAlign: "left",
                    }}
                  >
                    {howMuchTimePast(newsItem.datetime)}
                  </span>
                </Grid>
                <Grid item>|</Grid>
                {addNewsTicker(newsItem.related)}

                <Grid item sm={5} zeroMinWidth>
                  <div
                    style={{
                      minWidth: "0px",
                      width: "100px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Typography
                      display="inline"
                      variant="inherit"
                      align="left"
                      noWrap
                    >
                      <strong>{newsItem.headline}</strong>
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </div>
          </a>
        );
      });
    }
  };

  return (
    <div>
      {addHeader()}
      <ErrorBoundary>
        {isArrayValid(news) ? (
          <Scrollbar height="400px">{deliverNews()}</Scrollbar>
        ) : (
          <MaxDiv>
            <Center>
              <RingLoader size={40} color="#34D7B7" />
            </Center>
          </MaxDiv>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default NewsTab;
