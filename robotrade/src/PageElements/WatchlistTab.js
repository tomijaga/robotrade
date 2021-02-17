import React, { useState, useEffect } from "react";
import WatchlistGrid from "./WatchlistGrid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../Components/TabPanel";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

const WatchlistTab = (props) => {
  const [value, setValue] = useState(0);
  const handleSelect = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="menu">
      <Grid container direction="column">
        <Grid item xs>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleSelect}
              indicatorColor="primary"
              textColor="inherit"
              variant="scrollable"
              scrollButtons="auto"
              id="tabs"
            >
              <Tab
                label="Oil Stocks"
                id="tab-1"
                disableRipple={true}
                aria-controls="tabpanel-1"
              ></Tab>
              <Tab
                label="Tech Stocks"
                id="tab-2"
                aria-controls="tabpanel-2"
                disableRipple={true}
              ></Tab>
              <Tab
                label="Boring Stocks"
                id="tab-3"
                aria-controls="tabpanel-3"
                disableRipple={true}
              ></Tab>
              <Tab
                label="Boring Stocks"
                id="tab-3"
                aria-controls="tabpanel-3"
                disableRipple={true}
              ></Tab>
            </Tabs>
          </AppBar>
        </Grid>

        <Grid item xs>
          <TabPanel value={value} index={0}>
            <WatchlistGrid height={400} stockSymbols={["TSLA"]} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <WatchlistGrid height={400} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            item 3
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
};

export default WatchlistTab;
