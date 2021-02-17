import React, { useState } from "react";
import ErrorBoundary from "../../Components/ErrorBoundary";
import GridDiv from "../../Components/GridDiv";
import Card from "@material-ui/core/Card";
import PriceQuote from "../../Components/PriceQuote";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import DepositGrid from "./DepositGrid";
import { connect } from "react-redux";

import { accountDeposit, accountWithdrawal } from "../../Redux/Account/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    accountDeposit: (deposit) => dispatch(accountDeposit(deposit)),
    accountWithdrawal: (withdrawal) => dispatch(accountWithdrawal(withdrawal)),
  };
};

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.loginStatus.userIsLoggedIn,
    isUserDataPending: state.userDataObj.isPending,
    accountValue: state.userDataObj.userData.portfolio.account_value,
  };
};

const Deposit = ({
  pastDeposits,
  pastWithdrawals,
  accountDeposit,
  accountWithdrawal,
}) => {
  const [depositValue, setDepositValue] = useState(0);
  const [withdrawalValue, setWithdrawalValue] = useState(0);

  const isNaN = (x) => x !== x;

  const handleDepositChange = (event) => {
    let number = event.target.value * 1;
    if (!isNaN(number) && number < 1000000000) {
      setDepositValue(number);
    }
  };

  const handleWithdrawalChange = (event) => {
    let number = event.target.value * 1;
    if (!isNaN(number) && number < 1000000000) {
      setWithdrawalValue(number);
    }
  };

  const verifyWithdrawal = () => {
    let number = withdrawalValue;
    if (Number.isInteger(number) && number > 0) {
      accountWithdrawal(number);
      setWithdrawalValue(0);
    }
  };

  const handleWithdrawal = (event) => {
    if (event.type === "keypress" && event.key === "Enter") {
      verifyWithdrawal();
    } else if (event.type === "click") {
      verifyWithdrawal();
    }
  };

  const verifyDeposit = () => {
    let number = depositValue;
    if (Number.isInteger(number) && number > 0) {
      accountDeposit(number);
      setDepositValue(0);
    }
  };

  const handleDeposit = (event) => {
    if (event.type === "keypress" && event.key === "Enter") {
      verifyDeposit();
    } else if (event.type === "click") {
      verifyDeposit();
    }
  };

  return (
    <ErrorBoundary>
      <GridDiv
        container
        row="50px 0.4fr 50px auto 25px 1fr"
        column="50px 1fr 50px 1fr 50px"
        height="calc( 100vh - 180px)"
      >
        <GridDiv
          item
          row=" 2 / 3"
          column=" 2 / 5"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card>
            <CardHeader>
              <Typography variant="h5">Account Net</Typography>
            </CardHeader>

            <CardContent>
              <PriceQuote
                price="$2000"
                change="+ 12.78 "
                percentChange="+ 10.75%"
              ></PriceQuote>
              <Typography></Typography>
            </CardContent>
          </Card>
        </GridDiv>

        <GridDiv item row="4/5" column="2/3">
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="deposit-amount">Deposit</InputLabel>
            <FilledInput
              id="deposit-amount"
              value={depositValue}
              placeholder="0.00"
              onChange={handleDepositChange}
              onKeyPress={handleDeposit}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
            <Button onClick={handleDeposit} variant="outlined" type="submit">
              Deposit
            </Button>
          </FormControl>
        </GridDiv>

        <GridDiv item row="4/5" column="4/5">
          <ErrorBoundary>
            <FormControl fullWidth variant="filled">
              <InputLabel htmlFor="withdrawal-amount">Withdrawal</InputLabel>
              <FilledInput
                id="withdrawal-amount"
                placeholder="0.00"
                value={withdrawalValue}
                onChange={handleWithdrawalChange}
                onKeyPress={handleWithdrawal}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
          </ErrorBoundary>
        </GridDiv>

        <GridDiv item column=" 2/5 " row="6/7">
          <DepositGrid></DepositGrid>
        </GridDiv>
      </GridDiv>
    </ErrorBoundary>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
