import React, { useEffect, useState } from "react";

const Time = (props) => {
  //function for determining AM or PM
  const am_pm = (hour_24) => {
    if (hour_24 >= 12) {
      return "pm";
    } else {
      return "am";
    }
  };

  //return the current time
  const getTime = (value = "12hr") => {
    const mod = (n, m) => ((n % m) + m) % m;

    let timeValue = new Date();
    let hour_24 = mod(timeValue.getUTCHours() - 5, 24);
    let min = timeValue.getUTCMinutes();
    let sec = timeValue.getUTCSeconds();

    if (value === "24hr") {
      return `${hour_24}:${min}:${sec} `;
    } else {
      //changing to 12hr format
      let hour_12 = hour_24;

      if (hour_24 > 12) {
        hour_12 = hour_24 % 12;
      }
      if (hour_12 === 0) {
        hour_12 = 12;
      }
      if (min < 10) {
        min = `0${min}`;
      }
      if (sec < 10) {
        sec = `0${sec}`;
      }

      return `${hour_12}:${min}:${sec} ${am_pm(hour_24)}`;
    }
  };

  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime(props.format));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
};

export default Time;
