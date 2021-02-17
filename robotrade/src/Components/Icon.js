import React from "react";

const Icon = (props) => {
  const size = (h = "50px", w = "50px") => {
    return {
      height: h,
      width: w,
    };
  };

  return (
    <div>
      <img
        src={props.url}
        alt="Watchlist Logo"
        style={size(props.height, props.width)}
        onMouseEnter={props.show}
        onMouseOut={props.hide}
      />
    </div>
  );
};

export default Icon;
