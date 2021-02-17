import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const PriceQuote = ({ price, change, percentChange }) => {
  return (
    <div>
      <Paper elevation={3}>
        <Grid container wrap="nowrap">
          <Grid item xs>
            <Typography variant="h4">{price}</Typography>
          </Grid>
          <Grid item xs>
            <div>
              <Typography variant="subtitle2">{change}</Typography>
              <Typography variant="subtitle2">{percentChange}</Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default PriceQuote;
