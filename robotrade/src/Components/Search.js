import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SearchItems from "./SearchItems";
import SearchBox from "./SearchBox";
import "./Search.css";
import debounce from "lodash/debounce";
import classnames from "classnames";
//import ErrorBoundary from "./ErrorBoundary";

import { alphaVantage } from "../Essential";
import axios from "axios";

const Search = ({ height, relative, href, onClick, searchBoxSize }) => {
  const [searchValue, setSearchValue] = useState("");
  const [stocks, setStocks] = useState([]);
  const [clear, setClear] = useState(false);

  const storeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    verifySearch();
  }, [searchValue]);

  const requestStocks = (searchValue) => {
    if (searchValue.length > 0) {
      const url = alphaVantage(searchValue, "search");
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          // console.log(url);
          // console.log(res["bestMatches"]);
          setStocks(res["bestMatches"]);
        })
        .catch((err) => console.log(err));
    }
  };

  const debounce_request = debounce(requestStocks, 500);

  const verifySearch = () => {
    let regex = /[` !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (
      !regex.test(searchValue) &&
      searchValue !== "" &&
      searchValue.length < 10 &&
      searchValue !== undefined
    ) {
      debounce_request(searchValue);
    } else if (searchValue.includes(" ")) {
    } else {
      setStocks([]);
    }
  };

  useEffect(() => {
    if (clear) {
      const timer = setTimeout(() => {
        setStocks([]);
        setClear(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [clear]);

  const clearValueOnBlur = (event) => {
    event.target.value = "";

    setClear(true);
  };

  return (
    <div className="search">
      {relative ? (
        <div>
          <SearchBox
            style={{
              width: classnames({ ["100px"]: searchBoxSize === "small" }),
            }}
            onBlur={clearValueOnBlur}
            placeholder="Search Stocks"
            onChange={storeSearchValue}
          />
          <SearchItems
            href={href}
            items={stocks}
            height={height}
            onClick={onClick}
            style={{
              position: "relative",
              top: "100%",

              // transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      ) : (
        <div>
          <SearchBox
            onBlur={clearValueOnBlur}
            placeholder="Search Stocks"
            onChange={storeSearchValue}
          />
          <SearchItems
            href={href}
            items={stocks}
            height={height}
            onClick={onClick}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
