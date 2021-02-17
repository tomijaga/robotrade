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
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.loginStatus.userIsLoggedIn,
    isUserDataPending: state.userDataObj.isPending,
    positions: [
      {
        symbol: "TSLA",
        executionPrice: 234,
        currentPrice: 342,
        quantity: 25,
        industry: "Technology",
      },
    ],
  };
};

const PositionsTable = ({ positions, customPositions, simple }) => {
  const getRows = () => {
    if (isArrayValid(positions)) {
      return (
        <TableBody>
          {(customPositions || positions).map((position, i) => {
            const { symbol, quantity, executionPrice, currentPrice } = position;
            const equity = quantity * currentPrice;
            const cost = quantity * executionPrice;
            const PnL = equity - cost;
            return (
              <TableRow key={i} className="component-hover">
                <TableCell>
                  <Tooltip title="position-menu">
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>{symbol}</TableCell>

                <TableCell>{quantity}</TableCell>
                <TableCell>{equity.toFixed(2)}</TableCell>

                {simple ? (
                  <></>
                ) : (
                  <>
                    <TableCell>{currentPrice}</TableCell>
                    <TableCell>{executionPrice}</TableCell>
                  </>
                )}

                <TableCell>{PnL.toFixed(2)}</TableCell>
                <TableCell>{(PnL / cost).toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      );
    }
  };

  React.useEffect(() => {
    console.dir({ positions });
  }, [positions]);

  return (
    <div style={{ maxHeight: "500px" }}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="customized table">
          <TableHead>
            <TableRow className="tableHeader">
              <TableCell></TableCell>
              <TableCell>Symbol</TableCell>
              {/* <TableCell>Name</TableCell> */}

              <TableCell>Quantity</TableCell>
              <TableCell>Equity</TableCell>

              {simple ? (
                <></>
              ) : (
                <>
                  {" "}
                  <TableCell style={{ wrap: "nowrap" }}>
                    Current&nbsp;Price
                  </TableCell>
                  <TableCell>Ordered&nbsp;Price</TableCell>
                </>
              )}
              <TableCell>{simple ? "P&L" : "Unrealized P&L"}</TableCell>
              <TableCell>{simple ? "P&L % " : "Unrealized P&L %"}</TableCell>
            </TableRow>
          </TableHead>{" "}
          {getRows()}
        </Table>
      </TableContainer>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PositionsTable);
