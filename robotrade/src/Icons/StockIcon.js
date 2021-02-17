import React from "react";

const StockIcon = ({ className, size, fill = "lightblue" }) => (
  <svg
    className={className}
    id="Layer_5"
    enableBackground="new 0 0 64 64"
    height={size}
    viewBox="0 0 64 64"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <linearGradient
      id="SVGID_1_"
      gradientUnits="userSpaceOnUse"
      x1="32"
      x2="32"
      y1="63"
      y2="1"
    >
      <stop offset="0" stopColor="#9f2fff" />
      <stop offset="1" stopColor="#0bb1d3" />
    </linearGradient>
    <path
      d="m47 23v-2h-3v-3h2v1h3c.552 0 1-.448 1-1s-.448-1-1-1h-2c-1.654 0-3-1.346-3-3s1.346-3 3-3v-2h2v2h3v3h-2v-1h-3c-.552 0-1 .448-1 1s.448 1 1 1h2c1.654 0 3 1.346 3 3s-1.346 3-3 3v2zm1 4c-6.065 0-11-4.935-11-11s4.935-11 11-11 11 4.935 11 11-4.935 11-11 11zm0-2c4.963 0 9-4.037 9-9s-4.037-9-9-9-9 4.037-9 9 4.037 9 9 9zm15-9c0 3.923-1.526 7.488-4 10.164v36.836h-58v-2.376l14.546-16.624h11.954l6-8h9.086l5.02-5.02c-.97-.025-1.917-.137-2.833-.339l-3.359 3.359h-7.96l-7 8h-12.017l-11.703 12.679-1.469-1.357 12.297-13.322h11.983l7-8h8.04l2.02-2.02c-5.61-2.172-9.605-7.612-9.605-13.98 0-8.271 6.729-15 15-15s15 6.729 15 15zm-15 13c7.168 0 13-5.832 13-13s-5.832-13-13-13-13 5.832-13 13 5.832 13 13 13zm2.665 1.749-3.665 3.665v26.586h4v-30.302c-.11.022-.224.031-.335.051zm-9.665 7.251v23h4v-24.586l-1.586 1.586zm-26 9.662-4 4.571v8.767h4zm2 13.338h4v-15h-4zm6 0h4v-15h-4zm6 0h4v-21l-4 5.333zm6 0h4v-23h-4zm-31.671 0h5.671v-6.481zm53.671 0v-33.028c-1.206.909-2.551 1.639-4 2.153v30.875zm-48-43v4h2v12h-2v4h-2v-4h-2v-12h2v-4zm0 6h-2v8h2zm8-9v4h2v10h-2v4h-2v-4h-2v-10h2v-4zm0 6h-2v6h2zm8-11v4h2v8h-2v4h-2v-4h-2v-8h2v-4zm0 6h-2v4h2z"
      fill={fill || "url(#SVGID_1_)"}
    />
  </svg>
);

export default StockIcon;
