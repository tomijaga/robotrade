import React, { Component } from "react";
import MenuItem from "./MenuItem";
// import './SearchItems.css';
import Scrollbar from "./Scrollbar";
import { Link } from "react-router-dom";

const SearchItems = ({ items, height, href, style, onClick }) => {
  const displayItems = () => {
    return items === undefined ? (
      <div style={{ background: "rgba(255, 20, 20, 0.4)" }}>
        <MenuItem
          symbol="Error!!!"
          name="Api Limit Has Been Reached!! Try again in 5s"
        ></MenuItem>
      </div>
    ) : (
      items
        .filter((item, i) => {
          return item["4. region"] === "United States";
        })
        .map((item, i) => {
          return (
            <div
              key={i}
              style={{
                background: "rgb(38, 38, 39)",
              }}
            >
              <Link
                key={i}
                href={href}
                style={{
                  background: "rgb(38, 38, 39)",

                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {" "}
                <MenuItem
                  hover={true}
                  symbol={item["1. symbol"]}
                  name={item["2. name"]}
                  onClick={onClick}
                ></MenuItem>
              </Link>
            </div>
          );
        })
    );
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        width: "100%",
        height: "auto",
        ...style,
      }}
    >
      <Scrollbar height={height} background="red">
        {displayItems()}
      </Scrollbar>
    </div>
  );
};

export default SearchItems;
