import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import makeStyles from "@material-ui/core/styles/makeStyles";
import pagemeta from "../../observables/pagemeta";
import className from "classnames";
import { Drawer } from "@material-ui/core";
import MenuList from "../MenuList/MenuList";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const MyAppBar = () => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          onClick={(e) => {
            setOpenDrawer(true);
          }}
          edge="start"
          className={className(classes.menuButton, "tablet")}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {pagemeta.title}
        </Typography>
      </Toolbar>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={(e) => {
          setOpenDrawer(false);
        }}
      >
        <MenuList />
      </Drawer>
    </AppBar>
  );
};

export default MyAppBar;
