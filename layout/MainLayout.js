import React from "react";
import MenuBar from "../components/MenuBar/MenuBar";
import MyAppBar from "../components/MyAppBar/MyAppBar";

const MainLayout = ({ children, style }) => {
  return (
    <div>
      <MenuBar />
      <div>
        <MyAppBar />
        <div className={"contents-box"}>
          <div style={style}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
