import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import React from "react";

const KeyValue = ({ entry }) => {
  const { key, value } = entry;
  return (
    <Container maxWidth="lg">
      <Grid container direction="row" wrap="nowrap" spacing={2}>
        <Grid item xs zeroMinWidth style={{ textAlign: "left" }}>
          <Typography
            display="inline"
            align="left"
            variant="body2"
            noWrap
            style={{ color: "inherit", opacity: "0.7" }}
          >
            {key ? key : "--"}
          </Typography>
        </Grid>
        <Grid item xs zeroMinWidth>
          <Typography variant="subtitle2" display="inline" align="right">
            {value ? value : "--"}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default KeyValue;
