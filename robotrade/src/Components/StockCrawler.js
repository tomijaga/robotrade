import React, { useState, useEffect } from "react";
import OgStockCrawler from "react-stock-crawler/dist/index";
import ErrorBoundary from "../Components/ErrorBoundary";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { API_KEY } from "../Essential";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "./StockCrawler.css";

const StockCrawler = () => {
  const [anchorElement, setAnchorElement] = useState(null);
  const [stocks, setStocks] = useState();
  const [display, setDisplay] = useState("grid");

  const handleRemove = () => {
    //remove item in server then reload
  };

  const handeleAdd = () => {
    //
  };

  const handleHide = () => {
    handleClose();
    setDisplay("none");
  };

  const handleClick = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <ErrorBoundary>
      <div
        style={{
          display: display,
          gridTemplateColumns: "1fr 40px",
          justifyContent: "center",
          alignItems: "center",
          background: "black",
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>
              <OgStockCrawler
                style={{ maxHeight: "4rem" }}
                stocks={stocks}
                apiKey={API_KEY}
              ></OgStockCrawler>
            </Typography>
          </Grid>
        </Grid>
        <div>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
            size="small"
            color="inherit"
          >
            <MoreVertIcon
              style={{ color: "lightseagreen" }}
              onClick={handleClick}
            />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorElement}
            keepMounted
            open={Boolean(anchorElement)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>+ Add Symbol </MenuItem>
            <MenuItem onClick={handleClose}>Remove Symbol</MenuItem>
            <MenuItem onClick={handleHide}>Hide Crawler</MenuItem>
          </Menu>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default StockCrawler;
