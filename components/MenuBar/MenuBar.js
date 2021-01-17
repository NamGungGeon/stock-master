import { Menu, MenuItem } from "@material-ui/core";
import React from "react";
import MenuList from "../MenuList/MenuList";

const MenuBar = () => {
  return (
    <div className="nav-wrapper">
      <MenuList />
    </div>
  );
};

export default MenuBar;
