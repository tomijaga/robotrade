import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

const AlertCard = ({ alert, ...rest }) => {
  const displayCard = () => {
    if (alert.type === "ORDER") {
      return (
        <Card
          {...rest}
          style={{
            background:
              alert.status === "TERMINATED"
                ? "red"
                : alert.status === "FILLED"
                ? "green"
                : "gold",
          }}
        >
          <div
            style={{
              fontSize: "1rem",
              display: "flex",
              justifyContent: "space-between",
              padding: "2px 6px",
            }}
          >
            <b>
              {alert.status === "FILLED"
                ? "FILLED"
                : alert.status === "TERMINATED"
                ? "TERMINATED"
                : "PARTIALLY-FILLED"}
            </b>
            <b>{alert.symbol}</b>
          </div>

          <hr className="hr" />

          <CardContent>
            <div>
              <div>{alert.side}</div>

              <div>{alert.stat}</div>
            </div>
          </CardContent>
        </Card>
      );
    } else {
      return (
        <Card {...rest} style={{ background: "rgb(0, 0, 0, 0.3" }}>
          <div
            style={{
              padding: "2px 6px",
              fontSize: "1rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <b>Event</b>
            <span>{alert.symbol}</span>
          </div>

          <hr className="hr" style={{ margin: "0px", padding: "0px" }} />

          <CardContent>
            <div>
              <div>{alert.prop}</div>
              <div>{alert.level}</div>
              <div>{alert.stat}</div>
            </div>
          </CardContent>
        </Card>
      );
    }
  };

  return <div>{displayCard()}</div>;
};

export default AlertCard;
