import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { isArrayValid } from "../../Essential";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import format from "date-fns/format";

const OrderTable = ({ orders }) => {
  const getRows = () => {
    if (isArrayValid(orders)) {
      return (
        <TableBody>
          {orders.map((order, i) => {
            return (
              <TableRow key={i}>
                <TableCell>
                  <Tooltip title="orders-menu">
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>{order.symbol}</TableCell>
                <TableCell>{order.side}</TableCell>
                <TableCell>
                  {order.quantityFilled}/{order.quantity}
                </TableCell>
                <TableCell>
                  {order.limitPrice ? order.limitPrice : "--"}
                </TableCell>
                <TableCell>{order.orderType}</TableCell>
                <TableCell>{order.expireType}</TableCell>
                <TableCell>
                  <Typography noWrap>
                    {" "}
                    {format(new Date(order.startTime), "yyyy/MM/dd HH:mm:ss") +
                      " EDT"}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      );
    }
  };

  React.useEffect(() => {
    console.dir({ orders });
  }, [orders]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="customized table">
          <TableHead>
            <TableRow className="tableHeader">
              <TableCell></TableCell>
              <TableCell>Symbol</TableCell>
              {/* <TableCell>Name</TableCell> */}
              <TableCell>Side</TableCell>
              <TableCell>
                Filled&nbsp;Orders&nbsp;/&nbsp;Requsted&nbsp;Qty
              </TableCell>
              <TableCell>
                <Typography noWrap>Limit&nbsp;Price</Typography>
              </TableCell>
              <TableCell>Order&nbsp;Type</TableCell>
              <TableCell>Expiration</TableCell>
              <TableCell>Time&nbsp;Placed</TableCell>
            </TableRow>
          </TableHead>{" "}
          {getRows()}
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderTable;
