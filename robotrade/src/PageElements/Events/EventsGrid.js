import { MoreVert } from "@material-ui/icons";
import React from "react";
import { useState, useEffect } from "react";
import { finnhub, alphaVantage } from "../../Essential";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { DataGrid } from "@material-ui/data-grid";
import { useDemoData } from "@material-ui/x-grid-data-generator";
import "../WatchlistGrid.css";
import shortenNumber from "../../UsefullFunctions/shortenNumber";
import "../Grids/Grid.css";
import { connect } from "react-redux";
import CustomTab from "../CustomTab";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  createNewEvent,
  changeActiveStatus,
  deleteEvent,
} from "./Redux/actions";
import { isArrayValid } from "../../Essential";

const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: (eventObj) => dispatch(createNewEvent(eventObj)),
    setEventActive: (id, active) => dispatch(changeActiveStatus(id, active)),
    deleteEvent: (id) => dispatch(deleteEvent(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.loginStatus.userIsLoggedIn,
    events: state.events.data,
  };
};

const EventsGrid = ({
  events,
  isUserLoggedIn,
  eventProp,
  deleteEvent,
  setEventActive,
  createEvent,
}) => {
  const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);
  const [currTarget, setCurrTarget] = useState("");
  const [data, setData] = useState([]);

  const menuForEvent = {
    open: (event, row) => {
      setMoreMenuAnchor(event.currentTarget);
      setCurrTarget(row.data);
      console.log(row.data);
    },
    close: () => setMoreMenuAnchor(null),

    deactivate: (event) => {
      console.log("deactivate", currTarget);
      let activityValue = currTarget.active === "Yes" ? false : true;
      setEventActive(currTarget.id, activityValue);

      menuForEvent.close();
    },
    delete: (event) => {
      console.log("delete", currTarget);
      deleteEvent(currTarget.id);
      menuForEvent.close();
    },
  };

  const setDataIntoRows = () => {
    if (isArrayValid(events)) {
      return events
        .filter((row) => {
          return row.prop === eventProp.toUpperCase();
        })
        .map((row, i) => {
          // console.log(row);
          const {
            _id,
            symbol,
            prop,
            level,
            stat,
            action,
            active,
            actionQuantity,
          } = row;
          const newStat =
            prop === "PRICE"
              ? "$" + shortenNumber(stat, 2)
              : prop === "CHANGE"
              ? stat + "%"
              : shortenNumber(stat, 2);

          const newAction =
            action === "ALERT" ? action : `${action} ${actionQuantity} shares`;

          return {
            id: _id,
            symbol: symbol,
            condition: `${level} ${newStat}`,
            action: newAction,
            active: active ? "Yes" : "No",
          };
        });
    }
    return [];
  };

  useEffect(() => {
    setData(setDataIntoRows());
  }, [events]);

  return (
    <div>
      <div style={{ height: "300px", width: "100%" }} className="grid">
        <DataGrid
          rowHeight={28}
          headerHeight={32}
          disableMultipleSelection
          scrollbarSize={10}
          hideFooter
          showColumnRightBorder={false}
          columns={[
            {
              hide: true,
              field: "id",
              headerName: "",
              type: "string",
            },
            {
              field: "menuIcon",
              headerName: ".",
              sortable: false,
              align: "left",
              type: "string",
              width: 50,
              renderCell: (row) => {
                return (
                  <Tooltip title="more">
                    <IconButton
                      onClick={(event) => menuForEvent.open(event, row)}
                      size="small"
                      color="inherit"
                    >
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </Tooltip>
                );
              },
            },
            {
              field: "symbol",
              headerName: "Symbol",
              width: 90,
              align: "left",
              type: "string",
            },
            {
              field: "condition",
              headerName: "Condition",
              width: 150,
              align: "left",
              type: "string",
            },
            {
              field: "action",
              headerName: "Action",
              width: 150,
              align: "left",
              type: "string",
            },
            {
              headerName: "Active",
              field: "active",

              type: "string",
              width: 80,
            },
          ]}
          rows={setDataIntoRows()}
        />

        <Menu
          id="more-event-options"
          open={Boolean(moreMenuAnchor)}
          getContentAnchorEl={null}
          anchorEl={moreMenuAnchor}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          onClose={menuForEvent.close}
        >
          <MenuItem onClick={menuForEvent.deactivate}>
            {currTarget.active === "Yes" ? "Deactivate" : "Activate"}
          </MenuItem>
          <MenuItem onClick={menuForEvent.delete}>Delete</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsGrid);
