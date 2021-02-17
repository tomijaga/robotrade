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
import ErrorBoundary from "../../Components/ErrorBoundary";
import "../../Components/Scrollbar.css";

const FilledOrderTable = ({ orders, simple, height }) => {
  const getRows = () => {
    if (isArrayValid(orders)) {
      return (
        <TableBody>
          {orders.map((order, i) => {
            return (
              <TableRow key={i}>
                {simple ? (
                  <></>
                ) : (
                  <TableCell>
                    <Tooltip title="orders-menu">
                      <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                )}

                <TableCell>{order.symbol}</TableCell>
                <TableCell>{order.side}</TableCell>
                <TableCell>{order.quantityFilled}</TableCell>

                {Boolean(!simple) ? (
                  <>
                    {" "}
                    <TableCell>
                      {order.limitPrice ? order.limitPrice : "--"}
                    </TableCell>
                    <TableCell>{order.executionPrice}</TableCell>
                    <TableCell>{order.orderType}</TableCell>
                    <TableCell>{order.expireType}</TableCell>
                  </>
                ) : (
                  <></>
                )}

                <TableCell>
                  <Typography noWrap>
                    {" "}
                    {format(new Date(order.endTime), "yyyy/MM/dd HH:mm:ss") +
                      " EDT"}
                  </Typography>
                </TableCell>
                {!simple ? (
                  <TableCell>
                    <Typography noWrap>
                      {" "}
                      {format(
                        new Date(order.startTime),
                        "yyyy/MM/dd HH:mm:ss"
                      ) + " EDT"}
                    </Typography>
                  </TableCell>
                ) : (
                  <></>
                )}
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
    <ErrorBoundary>
      <TableContainer
        className="scroll"
        style={{ height: height ? height : "auto" }}
        component={Paper}
      >
        <Table stickyHeader={true} size="small" aria-label="customized table">
          <TableHead>
            <TableRow className="tableHeader">
              {simple ? <></> : <TableCell></TableCell>}
              <TableCell>Symbol</TableCell>
              {/* <TableCell>Name</TableCell> */}
              <TableCell>Side</TableCell>
              <TableCell>Filled&nbsp;Qty</TableCell>
              {!simple ? (
                <>
                  {" "}
                  <TableCell style={{ wrap: "nowrap" }}>
                    <Typography noWrap>Limit&nbsp;Price</Typography>
                  </TableCell>
                  <TableCell>Avg&nbsp;Price</TableCell>
                  <TableCell>Order&nbsp;Type</TableCell>
                  <TableCell>Expiration</TableCell>
                </>
              ) : (
                <></>
              )}

              <TableCell>Filled&nbsp;Time</TableCell>
              {!simple ? <TableCell>orders&nbsp;Placed</TableCell> : <></>}
            </TableRow>
          </TableHead>{" "}
          {getRows()}
        </Table>
      </TableContainer>
    </ErrorBoundary>
  );
};

export default FilledOrderTable;
