import { AppBar, Menu, MenuItem, Toolbar, makeStyles, ListItem, ListItemIcon, ListItemAvatar, Avatar, ListItemText, List } from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import React, { useEffect } from "react";
import auth from "../../observables/auth";

const MenuList = ({ className, style }) => {
  useEffect(() => {
    console.log(toJS(auth));
  }, [auth.isLogined]);

  return (
    <div className={className} style={style}>
      {/* <AppBar
        position="static"
        elevation={0}
        style={{
          backgroundColor: "transparent",
        }}
      >
        <Toolbar></Toolbar>
      </AppBar> */}

      <List>
        <Link href="/">
          <ListItem button>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={"홈"} />
          </ListItem>
        </Link>
        <Link href="/theme">
          <ListItem button>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={"테마 목록"} />
          </ListItem>
        </Link>
        {auth.isLogined && (
          <Link href="/sign/out">
            <ListItem button>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary={"로그아웃"} />
            </ListItem>
          </Link>
        )}
      </List>
    </div>
  );
};
export default observer(MenuList);
