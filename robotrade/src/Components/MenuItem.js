import React from "react";
import "./MenuItem.css";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const MenuItem = ({
  hover,
  symbol,
  name,
  price,
  change,
  percentChange,
  ...others
}) => {
  const addHover = () => {
    if (hover) {
      return "hoverItem";
    }
    return "";
  };

  const displayPrice = () => {
    if (price) {
      const PnL = change >= 0 ? "profit" : "loss";
      return (
        <Grid item xs={5}>
          <div className={"rightItems " + PnL}>
            <Typography
              className="symbol"
              variant="subtitle2"
              display="inline"
              align="right"
              noWrap
            >
              {price}
            </Typography>
            {change || percentChange ? (
              <Typography
                display="inline"
                align="right"
                variant="subtitle2"
                noWrap
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    variant="subtitle2"
                    className="name"
                    style={{ marginRight: "8px" }}
                  >
                    {change.toFixed(2)}
                  </Typography>
                  <Typography variant="subtitle2" className="name">
                    {percentChange.toFixed(2) + "%"}
                  </Typography>
                </div>
              </Typography>
            ) : (
              <></>
            )}
          </div>
        </Grid>
      );
    }
  };

  return (
    <span {...others}>
      <div className={` MenuItem ` + addHover()}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs={7} zeroMinWidth>
            <Typography display="inline" variant="inherit" align="left" noWrap>
              <p className="symbol"> {symbol}</p>
            </Typography>

            {name ? (
              <Typography
                display="inline"
                variant="inherit"
                align="left"
                noWrap
              >
                <p className="name"> {name}</p>
              </Typography>
            ) : (
              <></>
            )}
          </Grid>
          {displayPrice()}
        </Grid>
      </div>
    </span>
  );
};

export default MenuItem;
