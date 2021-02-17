import React, { useState, useEffect } from "react";
import "./Login.css";
import Particles from "react-particles-js";
import axios from "axios";
import { connect } from "react-redux";
import { changeLoginStatus } from "../Redux/LoginState/actions";
import { requestUserData } from "../Redux/UserData/actions";
import { SERVER_URL } from "../Essential";

axios.defaults.withCredentials = true;

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginStatus: (status) => dispatch(changeLoginStatus(status)),
    getUserData: () => dispatch(requestUserData()),
  };
};
const mapStateToProps = (state) => {
  return {
    userData: state.userDataObj.userData,
    isUserDataPending: state.userDataObj.isPending,
  };
};

const Login = ({
  style,

  setLoginStatus,
  getUserData,
  particles,
}) => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    axios
      .post(`${SERVER_URL}/login`, {
        username: username,
        password: password,
      })
      .then(async (res) => {
        if (res.status === 200) {
          await getUserData();
          setLoginStatus(true);
        }
      });
  };

  const submitSignup = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    axios
      .post(`${SERVER_URL}/signup`, {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          setLoginStatus(true);
        }
      });
  };

  const recordUsername = (event) => {
    const value = event.target.value;

    setUsername((user) => value);
  };

  const recordPassword = (event) => {
    const value = event.target.value;

    setPassword((user) => value);
  };

  const displayLogin = () => {
    return (
      <main
        className="pa4 black-80"
        action="http://localhost:8080/login"
        method="post"
      >
        <form onSubmit={submitLogin} className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="labelLeft db fw6 lh-copy f6" htmlFor="username">
                Username
              </label>
              <input
                className="pa2 input-reset b--bottom  bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="username"
                id="username"
                required
                autoComplete="on"
                onChange={recordUsername}
              />
            </div>

            <div className="mv3">
              <label
                className="labelLeft db fw6 lh-copy f6 "
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="b--bottom pa2 input-reset  bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                required
                autoComplete="on"
                onChange={recordPassword}
              />
            </div>
            <label className="pa0 ma0 lh-copy f6 pointer">
              <input type="checkbox" /> Remember me
            </label>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="LOGIN"
            />
          </div>
          <div className="lh-copy mt3">
            <a
              className="f6 link dim black db"
              onClick={() => setShowLoginForm((showLoginForm) => false)}
            >
              Sign up
            </a>
            <a className="f6 link dim black db">Forgot your password?</a>
          </div>
        </form>
      </main>
    );
  };

  const displaySignup = () => (
    <article className="pa4 black-80">
      <form acceptCharset="utf-8" onSubmit={submitSignup}>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="ph0 mh0 fw6 clip">SIGN UP</legend>
          <div className="mt3">
            <label className="labelLeft db fw4 lh-copy f6" htmlFor="username">
              Username
            </label>
            <input
              className="pa2 input-reset b--bottom bg-transparent w-100 measure"
              type="text"
              name="username"
              id="username"
              required
              autoComplete="on"
              onChange={recordUsername}
            />
          </div>
          <div className="mt3">
            <label className="labelLeft db fw4 lh-copy f6" htmlFor="password">
              Password
            </label>
            <input
              className="b pa2 input-reset b--bottom bg-transparent w-100 measure"
              type="password"
              name="password"
              id="password"
              required
              autoComplete="on"
              onChange={recordUsername}
            />
          </div>
        </fieldset>
        <div className="mt3">
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
            type="submit"
            value="Sign Up"
          />
        </div>
        <div className="lh-copy mt3">
          <a
            className="f6 link dim black db"
            onClick={() => setShowLoginForm((showLoginForm) => true)}
          >
            Login
          </a>
        </div>
      </form>
    </article>
  );

  return (
    <div style={style} className="signInDiv">
      {particles ? (
        <Particles
          className="particles"
          params={{
            particles: {
              number: {
                value: 20,
              },
              size: {
                value: 4,
                random: true,
                opacity: {
                  value: 0.9,
                },
              },
              color: { value: "#00f5f5" },
              stroke: {
                width: 2,
                color: "#000000",
              },
              line_linked: {
                distance: 100,
              },
              move: {
                enable: true,
                direction: "bottom",
                random: true,
                out_mode: "out",
                speed: 2,
              },
            },

            interactivity: {
              events: {
                onhover: {
                  enable: false,
                },
                onclick: {
                  enable: true,
                  mode: "repulse",
                },
              },
            },
          }}
        />
      ) : (
        <span />
      )}

      {showLoginForm ? displayLogin() : displaySignup()}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
