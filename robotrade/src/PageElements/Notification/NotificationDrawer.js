import React, { useEffect, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import CloseIcon from "@material-ui/icons/Close";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { seenAllNotifications } from "./Redux/actions";
import Chip from "@material-ui/core/Chip";
import AlertCard from "./AlertCard";
import { isArrayValid } from "../../Essential";

const mapDispatchToProps = (dispatch) => {
  return {
    seenAllNotifications: () => dispatch(seenAllNotifications()),
  };
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications.data,
  };
};

const NotificationDrawer = ({ notifications, open, handleClose }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData();
  }, [notifications]);
  return (
    <Drawer
      className={open ? "notificationDrawer" : "noDisplay"}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: "10px",
        }}
      >
        <span>Notifications</span>
        <IconButton size="small" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
      <hr className="hr" />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Chip label="Event" onClick={console.log} variant="outlined" />
        <Chip label="Filled" onClick={console.log} variant="outlined" />

        <Chip
          label="Partially-Filled"
          onClick={console.log}
          variant="outlined"
        />
        <Chip label="Terminated" onClick={console.log} variant="outlined" />
      </div>

      <div style={{ padding: "10px 20px" }}>
        {notifications.map((alert, i) => {
          return <AlertCard type={alert.type} alert={alert} />;
        })}
      </div>
    </Drawer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDrawer);
