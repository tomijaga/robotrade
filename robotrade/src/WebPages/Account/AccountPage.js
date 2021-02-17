import React, { useState } from "react";
import Region from "../../PageElements/Region";
import PageContainer from "../PageContainer";
import Grid from "@material-ui/core/Grid";
import CustomTab from "../../PageElements/CustomTab";
import Deposit from "./Deposit";
import Portfolio from "./Portfolio";
import MaxDiv from "../../Components/MaxDiv";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import GridDiv from "../../Components/GridDiv";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import "./AccountPage.css";
import "tachyons";
import { Link } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import { HashLink } from "react-router-hash-link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import axios from "axios";
import { SERVER_URL } from "../../Essential";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import DepositGrid from "./DepositGrid";

axios.defaults.withCredentials = true;

const AccountPage = () => {
  const [showOptions, setShowOptions] = useState("");

  const [depositValue, setDepositValue] = useState(0);
  const [withdrawalValue, setWithdrawalValue] = useState(0);
  const [userEmail, setUserEmail] = useState("");

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
      //accountWithdrawal(number);
      setWithdrawalValue(0);
    }
  };

  const processWithdrawal = () => {
    axios
      .put(`${SERVER_URL}/account/withdrawal`, {
        withdrawal: withdrawalValue,
        userEmail: userEmail,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
        }
      });
  };

  const verifyDeposit = () => {
    let number = depositValue;
    if (Number.isInteger(number) && number > 0) {
      //accountDeposit(number);
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

  const handleUserEmail = (event) => {
    setUserEmail(event.target.value);
  };

  const addFunds = () => {
    return (
      <div>
        <div style={{ marginBottom: "20px" }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={depositValue}
              onChange={handleDepositChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
        </div>
        <PayPalButton
          amount={depositValue}
          shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          onSuccess={(details, data) => {
            alert("Transaction completed by " + details.payer.name.given_name);

            // OPTIONAL: Call your server to save the transaction
            // return fetch("/paypal-transaction-complete", {
            //   method: "post",
            //   body: JSON.stringify({
            //     orderID: data.orderID,
            //   }),
            // });
          }}
          options={{
            clientId:
              "AYugyR8uaGkhu0kIgE5qFe3tUPkar9hEyZ_m7gJgRRX7hC4BjvAmbc9_X2lyD7OyLWmK6uMznbRf3utz",
            currency: "USD",
          }}
        />
      </div>
    );
  };

  const withdrawFunds = () => {
    return (
      <div style={{ marginBottom: "20px" }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="withdrawal-amount"
            placeholder="0.00"
            value={withdrawalValue}
            onChange={handleWithdrawalChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>

        <div style={{ margin: "20px 0px" }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">E-mail</InputLabel>
            <OutlinedInput
              id="user-email"
              placeholder="example@email.com"
              type="email"
              value={userEmail}
              onChange={handleUserEmail}
              startAdornment={
                <InputAdornment position="start">@</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
        </div>

        <Button onClick={processWithdrawal} variant="outlined" type="submit">
          Withdraw
        </Button>
      </div>
    );
  };

  const options = () => {
    return showOptions ? (
      showOptions == "add" ? (
        <div>
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LocalAtmIcon fontSize="large" />

            <Typography variant="h6">Add Funds</Typography>
          </div>

          {addFunds()}
        </div>
      ) : (
        <div>
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LocalAtmIcon fontSize="large" />

            <Typography variant="h6">Withdraw Funds</Typography>
          </div>

          {withdrawFunds()}
        </div>
      )
    ) : (
      <div>
        <div
          style={{
            margin: "20px 0px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LocalAtmIcon fontSize="large" />

          <Typography variant="h6">Account Funding</Typography>
        </div>

        <div>
          <Typography onClick={() => setShowOptions("add")} className="options">
            {" "}
            Add Funds <NavigateNextIcon />
            {}
          </Typography>

          <Typography
            onClick={() => setShowOptions("withdraw")}
            className="options"
          >
            Withdraw Funds <NavigateNextIcon />
          </Typography>
        </div>
      </div>
    );
  };

  return (
    <GridDiv container row="1fr" column="auto 1fr">
      <GridDiv className="outline-right" item column="1 /2" row=" 1/2">
        <div style={{ width: "300px" }} className="accPageContainer">
          <AccountBoxIcon fontSize="large" className="accountIcon" />
          <Typography className="b" variant="h4">
            {" "}
            Tomi Jaga
          </Typography>
          <Typography className="b" variant="subtitle1">
            {" "}
            Username:
          </Typography>
          <Typography variant="subtitle2">Account Number</Typography>
          <Typography variant="subtitle2"> Tomi Jaga</Typography>
        </div>
      </GridDiv>
      <GridDiv item column="2 /3" row=" 1/2">
        <CustomTab tabs={["Account Funding", "Account Details"]}>
          <div
            style={{
              padding: "20px 40px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: "123px",
                width: "100%",
                maxWidth: "500px",
              }}
            >
              {showOptions ? (
                <NavigateBeforeIcon
                  className="accBeforeIcon"
                  onClick={() => setShowOptions("")}
                />
              ) : (
                <span />
              )}
              {options()}
            </div>
          </div>
          <DepositGrid />
        </CustomTab>
      </GridDiv>
    </GridDiv>
  );
};

export default AccountPage;
