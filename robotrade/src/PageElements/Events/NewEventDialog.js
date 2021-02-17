import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ErrorBoundary from "../../Components/ErrorBoundary";
import {
  changeActiveStatus,
  createNewEvent,
  deleteEvent,
} from "./Redux/actions";
import Search from "../../Components/Search";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {
    changeActiveStatus: (id, active) =>
      dispatch(changeActiveStatus(id, active)),
    createNewEvent: (eventObj) => dispatch(createNewEvent(eventObj)),
    deleteEvent: (id) => dispatch(deleteEvent(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.loginStatus.userIsLoggedIn,
  };
};

const NewEventDialog = ({
  changeActiveStatus,
  createNewEvent,
  deleteEvent,
  symbol,
  open,
  handleClose,
}) => {
  const [prop, setProp] = useState("PRICE");
  const [eventSymbol, setEventSymbol] = useState(symbol);
  const [level, setLevel] = useState("ABOVE");
  const [stat, setStat] = useState(0);
  const [action, setAction] = useState("ALERT");
  const [actionQuantity, setActionQuantity] = useState(0);

  return (
    <ErrorBoundary>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle
          style={{ backgroundColor: "rgba(0,0,0, 0.2)" }}
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {eventSymbol ? (
            `New Event (${eventSymbol})`
          ) : (
            <Search
              searchBoxSize="small"
              height="100px"
              onClick={(event) => {
                let symbol = event.currentTarget.querySelector(".symbol")
                  .innerText;
                setEventSymbol(symbol);
              }}
            />
          )}
        </DialogTitle>
        <DialogContent dividers>
          <Card
            style={{
              display: "flex",
              justifyContent: "flex-end",
              backgroundColor: "rgba(0,0,0, 0.2)",
            }}
          >
            <TextField
              style={{ paddingLeft: "5px" }}
              id="prop-select"
              select
              value={prop}
              SelectProps={{
                native: true,
              }}
              onChange={(event) => {
                setProp(event.target.value.toUpperCase());
              }}
            >
              <option value={"PRICE"}>Price</option>
              <option value={"CHANGE"}>Change</option>
              <option value={"VOLUME"}>Volume</option>
            </TextField>
            <TextField
              style={{ paddingLeft: "5px" }}
              id="level-select"
              select
              value={level}
              SelectProps={{
                native: true,
              }}
              onChange={(event) => {
                let value = event.target.value.toUpperCase();
                setLevel(value);
              }}
            >
              <option value={"ABOVE"}>Above</option>
              <option value={"BELOW"}>Below</option>
            </TextField>

            <input
              type="number"
              onChange={(event) => setStat(event.target.value)}
            />
          </Card>
          <p />
          <h3 style={{ margin: "0px" }}>Event Action</h3>
          <Card
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "rgba(0,0,0, 0.2)",
            }}
          >
            <TextField
              id="action-select"
              select
              value={action}
              SelectProps={{
                native: true,
              }}
              onChange={(event) => {
                setAction(event.target.value.toUpperCase());
              }}
            >
              <option value={"ALERT"}>Alert</option>
              <option value={"BUY"}>Buy</option>
              <option value={"SELL"}>Sell</option>
            </TextField>

            <input
              type="number"
              onChange={(event) => setActionQuantity(event.target.value)}
            />
          </Card>
          <Typography gutterBottom></Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleClose();
              let type = action === "ALERT" ? "EVENT" : "ORDER";

              let eventObj = {
                stat,
                level,
                prop,
                symbol: eventSymbol,
                action,
                actionQuantity,
                type,
              };
              console.log({ eventObj });
              createNewEvent(eventObj);
            }}
            color="primary"
          >
            Create Event
          </Button>
          <Button
            autoFocus
            onClick={() => {
              handleClose();
            }}
            color="inherit"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </ErrorBoundary>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NewEventDialog);
