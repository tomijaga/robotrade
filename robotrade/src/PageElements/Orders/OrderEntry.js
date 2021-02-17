import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Accordion from "@material-ui/core/Accordion";
import ErrorBoundary from "../../Components/ErrorBoundary";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import "./OrderEntry.css";
import Menu from "@material-ui/core/Menu";
import classnames from "classnames";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import { connect } from "react-redux";
import { createOrder, getOrders } from "./Redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: () => dispatch(getOrders()),

    createOrder: (orderObj) => dispatch(createOrder(orderObj)),
  };
};

const mapStateToProps = (state) => {
  return {
    tradingPageSymbol: state.tradingPageSymbol,
  };
};

const OrderEntry = ({ orderSymbol, createOrder, getOrders }) => {
  const [side, setSide] = useState("Buy");
  const [symbol, setSymbol] = useState(orderSymbol);
  const [type, setType] = useState("Limit");
  const [quantity, setQuantity] = useState(0);
  const [limitPrice, setLimitPrice] = useState(0);
  const [expiration, setExpiration] = useState("Day");

  const isNaN = (x) => x !== x;

  React.useEffect(() => {
    setSymbol(orderSymbol);
  }, [orderSymbol]);

  const handleQuantityChange = (event) => {
    let number = event.target.value * 1;
    if (!isNaN(number) && Number.isInteger(number) && number > 0) {
      setQuantity(number);
    }
  };
  const handleLimitPriceChange = (event) => {
    let number = event.target.value * 1;
    if (!isNaN(number) && number > 0) {
      setLimitPrice(number);
    }
  };

  return (
    <ErrorBoundary>
      <div style={{ height: "140px", width: "100%" }}>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="customized table">
            <TableHead>
              <TableRow className="tableHeader">
                <TableCell></TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>Side</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Type</TableCell>
                {type.toUpperCase() === "LIMIT" ? (
                  <TableCell>Limit Price</TableCell>
                ) : (
                  <></>
                )}

                <TableCell>Expiration</TableCell>
              </TableRow>
            </TableHead>{" "}
            <TableBody>
              <TableRow
                className={classnames("orderRow ", {
                  rowColorRed: side === "Sell",
                  rowColorGreen: side === "Buy",
                })}
              >
                <TableCell>
                  <Tooltip title="Delete">
                    <IconButton size="small" className="deleteButton">
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <div>{symbol}</div>
                </TableCell>
                <TableCell>
                  <div
                    className="pointer"
                    onClick={() =>
                      setSide((prevSide) =>
                        prevSide === "Buy" ? "Sell" : "Buy"
                      )
                    }
                  >
                    {side}
                  </div>
                </TableCell>
                <TableCell>
                  {" "}
                  <TextField
                    id="order-quantity-entry"
                    type="number"
                    onChange={handleQuantityChange}
                    placeholder={"number of Shares"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    id="order-type-entry"
                    select
                    value={type}
                    SelectProps={{
                      native: true,
                    }}
                    onChange={(event) => {
                      setType(event.target.value);
                    }}
                  >
                    <option value={"Market"}>Market</option>
                    <option value={"Limit"}>Limit</option>
                  </TextField>
                </TableCell>
                {type.toUpperCase() === "LIMIT" ? (
                  <TableCell>
                    <TextField
                      id="order-limit-price-entry"
                      type="number"
                      onChange={handleLimitPriceChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="buy/sell price"
                    />
                  </TableCell>
                ) : (
                  <></>
                )}

                <TableCell>
                  <TextField
                    id="expirations-entry"
                    select
                    value={expiration}
                    SelectProps={{
                      native: true,
                    }}
                    onChange={(event) => {
                      setExpiration(event.target.value);
                    }}
                  >
                    <option value={"Day"}>Day</option>
                    <option value={"GTC"}>GTC</option>
                  </TextField>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            display: "flex",
            marginTop: "6px",
            justifyContent: "space-between",
            wrap: "nowrap",
            fontSize: "1rem",
            height: "30px",
          }}
        >
          <div>
            <Typography variant="subtitle2">
              Amount(est.):{quantity * limitPrice}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle2">Buying Power:</Typography>
          </div>
          <div>
            <Typography variant="subtitle2">Max Shares to Buy:</Typography>
          </div>
          <div>
            <Button
              onClick={() => {
                let orderObj = {};
                if (type.toUpperCase() === "MARKET") {
                  orderObj = {
                    quantity: quantity,
                    side: side.toUpperCase(),
                    symbol: symbol.toUpperCase(),
                    orderType: type.toUpperCase(),
                    expireType: expiration.toUpperCase(),
                  };
                } else {
                  orderObj = {
                    quantity: quantity,
                    limitPrice: limitPrice,
                    side: side.toUpperCase(),
                    symbol: symbol.toUpperCase(),
                    orderType: type.toUpperCase(),
                    expireType: expiration.toUpperCase(),
                  };
                }

                createOrder(orderObj);
                //setTimeout(getOrders, 3000);
              }}
              style={{ backgroundColor: "gold" }}
            >
              Place New Order
            </Button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderEntry);
