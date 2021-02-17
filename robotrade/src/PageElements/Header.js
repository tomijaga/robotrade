import React, { useState, Component } from "react";
import Search from "../Components/Search";
import Favicon from "../Icons/Favicon";
import { green } from "@material-ui/core/colors";
import Robotrade from "../Icons/Robotrade";
import rticon from "../Icons/rticon.png";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { makeStyles } from "@material-ui/core/styles";
import randomColor from "randomcolor";
import { changeLoginStatus } from "../Redux/LoginState/actions";
import { connect } from "react-redux";
import axios from "axios";
import { deleteUserData } from "../Redux/UserData/actions";
import { SERVER_URL } from "../Essential";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";
import PhoneIcon from "@material-ui/icons/Phone";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import "./Header.css";
import { Link } from "react-router-dom";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import { setStocksPageSymbol } from "../WebPages/StocksPage/Redux/actions";
import { logout } from "../Redux/LoginState/actions";
import NotificationDrawer from "./Notification/NotificationDrawer";

axios.defaults.withCredentials = true;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "& . >": {
      margin: "0px 5px",
    },

    avatar: {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "aqua",
        transition: "background-color ease-out",
      },
    },
  },
}));

const mapDispatchToProps = (dispatch) => {
  return {
    setStocksPageSymbol: (symbol) => dispatch(setStocksPageSymbol(symbol)),
    logout: () => dispatch(logout()),

    setLoginStatus: (status) => dispatch(changeLoginStatus(status)),
    deleteUserData: () => dispatch(deleteUserData()),
  };
};

const mapStateToProps = (state) => {
  return {
    not_seen: state.notifications.not_seen,
    isUserLoggedIn: state.loginStatus.userIsLoggedIn,
    userData: state.userDataObj.userData,
    IsUserDataPending: state.userDataObj.isPending,
  };
};

const Header = ({
  styles,
  not_seen,
  isUserLoggedIn,
  setLoginStatus,
  userData,
  isUserDataPending,
  deleteUserData,
  setStocksPageSymbol,
  logout,
}) => {
  const classes = useStyles();
  const color = randomColor({
    luminosity: "bright",
    hue: "random",
  });

  const [open, setOpen] = useState(false);

  const [contactOpen, setContactOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const anchorRef2 = React.useRef(null);
  const [displayPopper, setDisplayPopper] = useState("");

  const [currentTarget, setCurrentTarget] = useState(null);

  const handleDrawerToggle = () => {
    setDrawerOpen((prevOpen) => !prevOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleToggle2 = () => {
    setContactOpen((prevOpen) => !prevOpen);
  };

  const handleClose2 = () => {
    setContactOpen(false);
  };

  const handleToggle = (event) => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  // const prevOpen = React.useRef(open);
  // React.useEffect(() => {
  //   if (prevOpen.current === true && open === false) {
  //     anchorRef.current.focus();
  //   }

  //   prevOpen.current = open;
  // }, [open]);

  const showUsername = (pending) => {
    if (isUserLoggedIn) {
      return <span>{userData.username}</span>;
    }
  };

  const contactUsPopper = () => (
    <Popper
      style={{ zIndex: "100" }}
      open={contactOpen}
      anchorEl={anchorRef2.current}
      role={undefined}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "left bottom",
          }}
        >
          <Paper className="z100">
            <ClickAwayListener onClickAway={handleClose2}>
              <MenuList
                autoFocusItem={contactOpen}
                id="menu-list-grow"
                onKeyDown={handleListKeyDown}
              >
                <MenuItem button={false}>Contact Us</MenuItem>
                <hr className="hr" />

                <MenuItem onClick={handleClose2}>
                  <a
                    className="noLinkStyle"
                    href="mailto:someone@yoursite.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    &#x1f4e8; &#x2197; &#xfe0f; robotrade@gmail.com
                  </a>
                </MenuItem>

                <hr className="hr" />
                <MenuItem button={false}>
                  <TextareaAutosize
                    rowsMin={4}
                    aria-label="feedback Text"
                    placeholder="Leave Feedback"
                  />
                </MenuItem>
                <MenuItem button={false}>
                  <Button
                    onClick={(event) => {
                      handleClose2(event);
                    }}
                  >
                    {" "}
                    Submit
                  </Button>
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  const userPopper = () => (
    <Popper
      style={{ zIndex: "100" }}
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom",
          }}
        >
          <Paper className="z100">
            <ClickAwayListener onClickAway={handleClose}>
              <div>
                <div autoFocus={false} button={false}>
                  Username: Tomi Jaga
                </div>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <hr className="hr" />

                  <MenuItem onClick={handleClose}>
                    {" "}
                    <Link className="noLinkStyle" to="/app/account">
                      My Account
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={handleClose}>Platform Settings</MenuItem>
                  <hr className="hr" />
                  <MenuItem
                    onClick={(event) => {
                      handleClose(event);
                      logout();
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </div>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
  return (
    <div {...styles}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100pt,auto)) ",
          height: "3rem",
          padding: " 0px 2rem",
          background: "rgb(10, 30, 40)",
          alignItems: "center",
          gridTemplateRows: "1fr",
          width: `100vw`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Favicon />

          <img height="20" width="140" src={rticon} />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Search
            href="/app/stocks"
            onClick={(event) => {
              const symbol = event.currentTarget.querySelector(".symbol")
                .innerText;
              setStocksPageSymbol(symbol);
            }}
          />
        </div>
        <div className={classes.root}>
          <IconButton
            ref={anchorRef2}
            onClick={(event) => {
              setDisplayPopper(() => "contactUs");
              handleToggle2(event);
            }}
            size="small"
            aria-controls={open ? "contactUs-menu-list-grow" : undefined}
            aria-haspopup="true"
            className="headerIconButton"
          >
            <PhoneIcon className="headerAvatar" fontSize="small" />
          </IconButton>

          <IconButton
            onClick={(event) => {
              handleDrawerToggle();
            }}
            size="small"
            className="headerIconButton"
          >
            <Badge badgeContent={not_seen} color="secondary">
              <NotificationsNoneRoundedIcon
                className="headerAvatar"
                fontSize="small"
              />
            </Badge>
          </IconButton>

          <IconButton
            className="headerIconButton"
            size="small"
            ref={anchorRef}
            aria-controls={open ? "account-menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={(event) => {
              setDisplayPopper(() => "user");
              handleToggle(event);
            }}
          >
            <PersonOutlineRoundedIcon
              className="headerAvatar"
              fontSize="small"
            />
          </IconButton>
        </div>

        {userPopper()}
        {contactUsPopper()}

        <NotificationDrawer open={drawerOpen} handleClose={handleDrawerClose} />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
