import React, { useState } from "react";
import InfoTip from "./InfoTip";
import Icon from "./Icon";

const IconWithInfoTip = (props) => {
  const [display, setDisplay] = useState("hidden");

  const divStyle = (value) => {
    let flex;
    switch ((value = "right")) {
      case "up":
        flex = "column";
        break;
      case "down":
        flex = "column-reverse";
        break;
      case "left":
        flex = "row";
        break;
      case "right":
        flex = "row-reverse";
        break;
      default:
        break;
    }

    return {
      display: "flex",
      flexDirection: flex,
      alignItems: "center",
      width: "auto",
    };
  };

  const onHover = (event) => {
    setDisplay("visible");
    console.log("!");
  };

  const displayTooltip = () => {
    if (display == "visible") {
      return <InfoTip position={props.infoTipPosition} info={props.info} />;
    }
  };

  const onHoverOut = (event) => {
    setDisplay("hidden");
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={divStyle(props.infoTipPosition)}>
        <Icon
          height={props.iconHeight}
          width={props.iconHeight}
          show={onHover}
          hide={onHoverOut}
          url={props.url}
        />

        {displayTooltip()}
      </div>
    </div>
  );
};

export default IconWithInfoTip;
