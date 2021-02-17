import React, { useState, useEffect } from "react";

const RobotradeIcon = ({ className, size, fill = "lightblue", hoverFill }) => {
  const [hover_Fill, setHoverFill] = useState(null);

  const onEnter = () => {
    if (hoverFill) {
      console.log("entered");
      setHoverFill(hoverFill);
    }
  };

  const onExit = () => {
    if (hover_Fill) {
      console.log("left");
      setHoverFill(null);
    }
  };
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill={hover_Fill || fill}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
    >
      <g
        id="processor-robotics-brain-technology-artificial_intelligence"
        data-name="processor-robotics-brain-technology-artificial intelligence"
      >
        <path d="M56.18,28a3,3,0,1,0,0-2H54V20h2.18a3,3,0,1,0,0-2H54V13a1,1,0,0,0-1-1H47V10.72l2.32-.77A1.014,1.014,0,0,0,50,9V7.82a3,3,0,1,0-2,0v.46l-2.32.77A1.014,1.014,0,0,0,45,10v2H40V7.82a3,3,0,1,0-2,0V12H33V10a1.014,1.014,0,0,0-.68-.95L30,8.28V7.82a3,3,0,1,0-2,0V9a1.014,1.014,0,0,0,.68.95l2.32.77V12H25a1,1,0,0,0-1,1V23H23V8a1,1,0,0,0-1-1A14.015,14.015,0,0,0,8,21v6.59l-5.71,5.7A1.033,1.033,0,0,0,2,34v3a1,1,0,0,0,1,1H8V54a1,1,0,0,0,1,1h6a1.029,1.029,0,0,0,.6-.2L18,53.01V61a1,1,0,0,0,1,1h5a1.014,1.014,0,0,0,.8-.4l9-12A.984.984,0,0,0,34,49V42h3V61a1,1,0,0,0,1,1H62V60H39V42h2V57a1,1,0,0,0,1,1H57V56H43V42h2V53a1,1,0,0,0,1,1H62V52H47V42h2v7a1,1,0,0,0,1,1h7V48H51V42h2a1,1,0,0,0,1-1V36h2.18a3,3,0,1,0,0-2H54V28ZM59,26a1,1,0,1,1-1,1A1,1,0,0,1,59,26Zm0-8a1,1,0,1,1-1,1A1,1,0,0,1,59,18ZM49,4a1,1,0,1,1-1,1A1,1,0,0,1,49,4ZM29,6a1,1,0,1,1,1-1A1,1,0,0,1,29,6ZM39,4a1,1,0,1,1-1,1A1,1,0,0,1,39,4ZM32,48.67,23.5,60H20V51.53l5.6-4.17a1,1,0,0,0,.4-.8V42h6ZM35,40H25a1,1,0,0,0-1,1v5.06L14.67,53H10V37a1,1,0,0,0-1-1H4V34.41l5.71-5.7A1.033,1.033,0,0,0,10,28V21A12.018,12.018,0,0,1,21,9.04V24a1,1,0,0,0,1,1H35Zm1-17H30V18H48V36H37V24A1,1,0,0,0,36,23ZM52,40H37V38H49a1,1,0,0,0,1-1V17a1,1,0,0,0-1-1H29a1,1,0,0,0-1,1v6H26V14H52Zm7-6a1,1,0,1,1-1,1A1,1,0,0,1,59,34Z" />
      </g>
    </svg>
  );
};
export default RobotradeIcon;
