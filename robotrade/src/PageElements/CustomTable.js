import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const CustomTable = ({ headers, data }) => {
  const getHeader = () => {};

  return (
    <div>
      {getHeader()}
      {getBody()}
    </div>
  );
};

export default CustomTable;
