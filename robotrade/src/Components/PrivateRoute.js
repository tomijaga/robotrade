import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.loginStatus.userIsLoggedIn,
  };
};

const PrivateRoute = ({
  component: Component,
  isUserLoggedIn,
  children,
  ...rest
}) => {
  console.log({ isUserLoggedIn });
  //   console.log({ Component });
  console.log({ children });
  //   console.log({ ...rest });
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) => (isUserLoggedIn ? children : <Redirect to="/login" />)}
    />
  );
};

export default connect(mapStateToProps)(PrivateRoute);
