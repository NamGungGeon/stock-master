import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import makeStyles from "@material-ui/core/styles/makeStyles";
import className from "classnames";
import { Drawer } from "@material-ui/core";
import MenuList from "../MenuList/MenuList";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const MyAppBar = () => {
  const classes = useStyles();
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          onClick={e => {
            setOpenDrawer(true);
          }}
          edge="start"
          className={className(classes.menuButton, "tablet")}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.title}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/800px-Nextjs-logo.svg.png"
            alt=""
            height="42"
            style={{
              filter: "invert(1)",
              cursor: "pointer"
            }}
            onClick={e => {
              router.push("/");
            }}
          />
        </div>
      </Toolbar>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={e => {
          setOpenDrawer(false);
        }}
      >
        <MenuList />
      </Drawer>
    </AppBar>
  );
};

export default MyAppBar;
