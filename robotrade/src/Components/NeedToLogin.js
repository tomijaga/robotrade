import React from "react";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.loginStatus.userIsLoggedIn,
  };
};

const NeedToLogin = ({ setShowLogin }) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography>
        Need to <strong className="App-link">Login</strong>
      </Typography>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NeedToLogin);
