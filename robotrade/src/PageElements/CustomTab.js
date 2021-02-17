import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../Components/TabPanel";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import ErrorBoundary from "../Components/ErrorBoundary";
import Toolbar from "@material-ui/core/Toolbar";

const CustomTab = ({
  tabs,
  children,
  vertical,
  header,
  icons,
  onTabValueChange,
  initialTabValue,
}) => {
  const [value, setValue] = useState(initialTabValue || 0);
  const handleSelect = (event, newValue) => {
    setValue(newValue);
  };

  const createIcons = () => {
    if (icons) {
      return (
        <Grid item xs={2}>
          {icons.map((icon, i) => {
            return icon;
          })}
        </Grid>
      );
    }
  };

  const createTabs = () => {
    if (tabs) {
      return tabs.map((tab, i) => {
        return (
          <Tab
            label={tab}
            key={i}
            id={`tab-${i}`}
            disableRipple={Boolean(!header)}
            aria-controls={`tabpanel-${i}`}
          ></Tab>
        );
      });
    }
  };

  const createTabPanels = () => {
    if (children) {
      return children.map((tabPanel, i) => {
        return (
          <ErrorBoundary>
            <TabPanel key={i} value={value} index={i}>
              {tabPanel}
            </TabPanel>
          </ErrorBoundary>
        );
      });
    }
  };

  return (
    <ErrorBoundary>
      <div>
        <Grid container direction="column">
          <Grid item xs>
            <AppBar position="static" color="default">
              <Toolbar
                variant="dense"
                disableGutters
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                }}
              >
                <Grid container direction="row">
                  <Grid item xs>
                    <Tabs
                      className={header ? "header" : "plainTab"}
                      value={value}
                      onChange={(event, newValue) => {
                        handleSelect(event, newValue);
                        if (onTabValueChange) onTabValueChange(event, newValue);
                      }}
                      indicatorColor="primary"
                      textColor="inherit"
                      variant="scrollable"
                      scrollButtons="auto"
                      centered={Boolean(header)}
                      variant={Boolean(header) ? "fullWidth" : "scrollable"}
                      id="tabs"
                      selectionFollowsFocus
                      vertical={vertical ? "vertical" : "horizontal"}
                    >
                      {createTabs()}
                    </Tabs>
                  </Grid>
                  {createIcons()}
                </Grid>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs>
            {createTabPanels()}
          </Grid>
        </Grid>
      </div>
    </ErrorBoundary>
  );
};

export default CustomTab;
