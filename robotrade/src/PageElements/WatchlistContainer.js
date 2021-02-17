import React, { useState, useEffect } from "react";
import ErrorBoundary from "../Components/ErrorBoundary";
import CustomTab from "../PageElements/CustomTab";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import WatchlistGrid from "../PageElements/WatchlistGrid";
import WatchlistTab from "../PageElements/WatchlistTab";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ToolTip from "@material-ui/core/Tooltip";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { setSelectedWatchlistIndex } from "../WebPages/Watchlist/actions";
import Popover from "@material-ui/core/Popover";
import SearchBox from "../Components/SearchBox";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { addWatchlist, deleteWatchlist } from "../WebPages/Watchlist/actions";
import { isArrayValid } from "../Essential";

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedWatchlistIndex: (index) =>
      dispatch(setSelectedWatchlistIndex(index)),
    addWatchlist: (name) => dispatch(addWatchlist(name)),
    deleteWatchlist: (name) => dispatch(deleteWatchlist(name)),
  };
};

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.loginStatus.userIsLoggedIn,
    watchlists: state.watchlists.data,
    isWatchlistPending: state.watchlists.isPending,
    isUserDataPending: state.userDataObj.isPending,
    selectedWatchlistIndex: state.watchlists.selectedIndex,
  };
};

const WatchlistContainer = ({
  isWatchlistPending,
  watchlists,
  isUserDataPending,
  setSelectedWatchlistIndex,
  selectedWatchlistIndex,
  addWatchlist,
  deleteWatchlist,
}) => {
  const [anchorElement, setAnchorElement] = useState(null);
  const [watchlistRemovePopover, setWatchlistRemovePopover] = useState(null);
  const [openAnchor2, setOpenAnchor2] = useState(false);
  const [watchlistToDelete, setWatchlistToDelete] = useState(0);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [addWatchlistAnchor, setAddWatchlistAnchor] = useState(null);

  const [watchlistNameToAdd, setWatchlistNameToAdd] = useState("");

  const handleEdit = () => {};
  const handleGrid = () => {};

  const addItem = {};

  const handleAnchor = (event) => {
    setAnchorElement(event.currentTarget);
    console.log("anchor1", event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const popoverForAdd = {
    showTextField: (event) => setAddWatchlistAnchor(event.currentTarget),
    closeTextField: () => setAddWatchlistAnchor(null),
    closeAll: () => {
      popoverForAdd.closeTextField();
      handleClose();
    },
    add: () => {
      addWatchlist(watchlistNameToAdd);
      popoverForAdd.closeAll();
    },
  };
  const popoverForRemove = {
    open: (event) => setWatchlistRemovePopover(event.currentTarget),
    close: () => setWatchlistRemovePopover(null),
    closeAll: () => {
      popoverForRemove.close();
      handleClose();
    },
    deleteItem: (event) => {
      popoverForRemove.closeAll();
      const watchlistName = event.currentTarget.innerText;
      confirmAlert(deleteOptions(watchlistName));
    },
  };

  function deleteOptions(watchlistName) {
    return {
      title: "Are You Sure?",
      message: `You want to delete "${watchlistName}"`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteWatchlist(watchlistName);
          },
        },
        {
          label: "No",
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    };
  }

  const watchlistNames = () => {
    return (
      <Popover
        id="watchlist-names-popover"
        open={Boolean(watchlistRemovePopover)}
        anchorEl={watchlistRemovePopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={popoverForRemove.close}
        disableRestoreFocus
      >
        <List component="nav">
          {watchlists.map((list, i) => {
            return (
              <ListItem key={i} button onClick={popoverForRemove.deleteItem}>
                <Typography>{list.name}</Typography>
              </ListItem>
            );
          })}
        </List>
      </Popover>
    );
  };

  const addIcons = () => {
    return [
      <ToolTip title="Edit Watchlist">
        <IconButton
          aria-haspopup="true"
          aria-label="edit-watchlist"
          aria-controls="edit-Watchlist"
          onClick={handleAnchor}
          size="small"
        >
          <EditIcon onClick={handleAnchor} />
        </IconButton>
      </ToolTip>,
      <ToolTip title="Switch to Grid Layout">
        <IconButton aria-label="grid" aria-controls="grid-layout" size="small">
          <FormatListBulletedIcon />
        </IconButton>
      </ToolTip>,
    ];
  };

  const getTabs = () => watchlists.map((list) => list.name);

  const getTabPanels = () => {
    return watchlists.map((list) => {
      return <WatchlistGrid />;
    });
  };

  // useEffect(() => {
  //   if (isDataRetrieved) {
  //     console.log("isDataRetrieved", isDataRetrieved);
  //     console.log("WATCHLIST", watchlists);
  //   }
  // }, [isDataRetrieved]);

  const addWatchlistPopover = () => (
    <Popover
      id="mouse-over-popover"
      open={Boolean(addWatchlistAnchor)}
      anchorEl={addWatchlistAnchor}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={popoverForAdd.closeTextField}
      disableRestoreFocus
    >
      <Typography variant="subtitle1">Enter Watchlist Name</Typography>
      <SearchBox
        onChange={(event) => setWatchlistNameToAdd(event.target.value)}
        placeholder={"watchlist Name"}
        onBlur={(event) => (event.target.value = "")}
      />
      <Button onClick={popoverForAdd.add}>Add</Button>
      <Button onClick={popoverForAdd.closeAll}>Cancel</Button>
    </Popover>
  );

  return (
    <ErrorBoundary>
      <CustomTab
        onTabValueChange={(event, newValue) =>
          setSelectedWatchlistIndex(newValue)
        }
        initialTabValue={selectedWatchlistIndex}
        icons={addIcons()}
        tabs={isArrayValid(watchlists) > 0 ? getTabs() : []}
      >
        {isArrayValid(watchlists) ? getTabPanels() : []}
      </CustomTab>
      <Menu
        id="edit-watchlist"
        getContentAnchorEl={null}
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={popoverForAdd.showTextField}>
          {"+ Add Watchlist"}{" "}
        </MenuItem>

        <MenuItem onClick={popoverForRemove.open}>Remove Watchlist</MenuItem>
      </Menu>
      {isArrayValid(watchlists) ? watchlistNames() : []}
      {addWatchlistPopover()}
    </ErrorBoundary>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistContainer);
