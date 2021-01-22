import { AppBar, Menu, MenuItem, Toolbar, makeStyles, ListItem, ListItemIcon, ListItemAvatar, Avatar, ListItemText, List, Divider } from "@material-ui/core";
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
    <div
      className={className}
      style={{
        width: "256px",
      }}
    >
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
            <ListItemText primary={"홈"} />
          </ListItem>
        </Link>
        <Divider />
        <Link href="/theme">
          <ListItem button>
            <ListItemText primary={"테마 목록"} />
          </ListItem>
        </Link>
        <Link href="/theme/event">
          <ListItem button>
            <ListItemText primary={"테마 일정"} />
          </ListItem>
        </Link>
        <Divider />
        <Link href="/stocks">
          <ListItem button>
            <ListItemText primary={"종목 정리"} />
          </ListItem>
        </Link>
        <Link href="/stocks/event">
          <ListItem button>
            <ListItemText primary={"종목 일정"} />
          </ListItem>
        </Link>
        <Divider />
        {auth.isLogined && (
          <Link href="/sign/out">
            <ListItem button>
              <ListItemText primary={"로그아웃"} />
            </ListItem>
          </Link>
        )}
      </List>
    </div>
  );
};
export default observer(MenuList);
