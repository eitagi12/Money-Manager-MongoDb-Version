import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuIcon from "@material-ui/icons/Menu";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AddBoxIcon from "@material-ui/icons/AddBox";
import HistoryIcon from "@material-ui/icons/History";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };
  const handleLogout = () => {
    localStorage.removeItem("Access_TOKEN");
    window.location.reload();
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List style={{ fontSize: "18px", fontWeight: "bold" }}>
        <Link to="/dashboard">
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
              <p style={{ marginLeft: "5px" }}>Dashboard</p>
            </ListItemIcon>
          </ListItem>
        </Link>
        <Link to="/newactivity">
          <ListItem button>
            <ListItemIcon>
              <AddBoxIcon />
              <p style={{ marginLeft: "5px" }}>New Activity</p>
            </ListItemIcon>
          </ListItem>
        </Link>
        <Link to="/history">
          <ListItem button>
            <ListItemIcon>
              <HistoryIcon />
              <p style={{ marginLeft: "5px" }}> History</p>
            </ListItemIcon>
          </ListItem>
        </Link>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <MeetingRoomIcon />
            <p style={{ marginLeft: "5px" }}> Log out</p>
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div style={{ marginTop: "5px", marginLeft: "5px" }}>
      <Button
        variant="contained"
        onClick={toggleDrawer("left", true)}
        style={{
          color: "white",
          backgroundColor: "#4B4453",
          textAlign: "center"
        }}
      >
        <MenuIcon />
      </Button>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </div>
  );
}
