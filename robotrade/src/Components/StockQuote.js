import React from "react";
import PriceQuote from "./PriceQuote";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import MenuItem from "./MenuItem";
import Grid from "@material-ui/core/Grid";

const Quote = ({ quote, name, symbol }) => {
  return (
    <div>
      <Card>
        <CardContent>
          <MenuItem name={name || "Some Company"} symbol={symbol} />
          <PriceQuote />

          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quote;
