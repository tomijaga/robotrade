import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../../Essential";
import Particles from "react-particles-js";
import "./LoginPage.css";
import Login from "../../PageElements/Login";
import Tilt from "react-tilt";
import Favicon from "../../Icons/Favicon";
import rticon from "../../Icons/rticon.png";

axios.defaults.withCredentials = true;

const mapDispatchToProps = (dispatch) => {
  return {};
};
const mapStateToProps = (state) => {
  return {
    userData: state.userDataObj.userData,
    isUserDataPending: state.userDataObj.isPending,
    isUserLoggedIn: state.loginStatus.userIsLoggedIn,
  };
};

const LoginPage = () => {
  return (
    <div className="loginPageCss">
      <Particles
        className="loginParticles"
        params={{
          particles: {
            number: {
              value: 80,
            },
            size: {
              value: 2,
              random: true,
            },

            density: {
              enable: true,
              value_area: 800,
            },
            color: { value: "#00d9ff" },
            stroke: {
              width: 3,
              color: "#000000",
            },
            line_linked: {
              distance: 100,
            },
            move: {
              enable: true,
              direction: "none",
              random: true,
              out_mode: "bounce",
              speed: 8,
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
      <div style={{ display: "flex", alignItems: "center", margin: "5vh 0px" }}>
        <Favicon size={"70"} />

        <img height="40" width="auto" src={rticon} />
      </div>
      <Login class="loginForm" />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
