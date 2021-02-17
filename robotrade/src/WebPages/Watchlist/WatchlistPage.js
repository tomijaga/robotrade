import React, { useState, useEffect } from "react";
import NewsTab from "../../PageElements/NewsTab";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import GridDiv from "../../Components/GridDiv";
import WatchlistContainer from "../../PageElements/WatchlistContainer";
import { connect } from "react-redux";
import { setSelectedWatchlistIndex } from "./actions";
import EventsGrid from "../../PageElements/Events/EventsGrid";
import CustomTab from "../../PageElements/CustomTab";
import { isArrayValid } from "../../Essential";
import { setSelectedNavbarItem } from "../../Redux/appActions";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import ToolTip from "@material-ui/core/Tooltip";
import EventDialog from "../../PageElements/Events/NewEventDialog";

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedWatchlist: (index) => dispatch(setSelectedWatchlistIndex(index)),
    setSelectedNavbarItem: (index) => dispatch(setSelectedNavbarItem(index)),
  };
};

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.loginStatus.userIsLoggedIn,
    watchlists: state.watchlists.data,
    isWatchlistPending: state.watchlists.isPending,
    isUserDataPending: state.userDataObj.isPending,
    selectedWatchlistIndex: state.watchlists.selectedIndex,
  };
};

const WatchlistPage = ({ watchlists, selectedWatchlistIndex }) => {
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  useEffect(() => {
    setSelectedNavbarItem(2);
  }, []);

  useEffect(() => {
    console.log("selectedWatchlistIndex", selectedWatchlistIndex);
  }, [selectedWatchlistIndex]);

  const eventDialogClose = () => {
    setEventDialogOpen(false);
  };

  return (
    <GridDiv container column="50% 50%" row="1fr 1fr">
      <GridDiv item column="1/3" row="1/2" className="outline-bottom">
        <WatchlistContainer />
      </GridDiv>

      <GridDiv item column="1/2" row="2/3" className="outline-right">
        <h2 style={{ borderBottom: "2px dotted azure", margin: "0px" }}>
          Events
        </h2>
        <CustomTab
          icons={[
            <ToolTip title="Add Event">
              <IconButton onClick={() => setEventDialogOpen(true)}>
                <AddCircleOutlineIcon />
              </IconButton>
            </ToolTip>,
          ]}
          tabs={["Price", "Change", "Volume"]}
        >
          <EventsGrid eventProp="price" />
          <EventsGrid eventProp="change" />
          <EventsGrid eventProp="volume" />
        </CustomTab>
        <EventDialog handleClose={eventDialogClose} open={eventDialogOpen} />
      </GridDiv>

      <GridDiv item column="2/3" row="2/3">
        <NewsTab
          header
          stockSymbols={
            isArrayValid(watchlists)
              ? watchlists[selectedWatchlistIndex].symbols
              : []
          }
        ></NewsTab>
      </GridDiv>
    </GridDiv>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistPage);
