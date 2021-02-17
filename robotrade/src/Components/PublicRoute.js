import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.loginStatus.userIsLoggedIn,
  };
};

const PublicRoute = ({
  component: Component,
  restricted,
  isUserLoggedIn,
  children,
  ...rest
}) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isUserLoggedIn && restricted ? (
          <Redirect to="/app" />
        ) : Component ? (
          <Component {...props} />
        ) : (
          children
        )
      }
    />
  );
};

export default connect(mapStateToProps)(PublicRoute);
