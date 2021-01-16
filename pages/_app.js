import "../styles/global.css";
import React from "react";
import MyAppBar from "../components/MyAppBar/MyAppBar";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { blue, teal, pink } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MyAppBar />
        <div className={"contents-box-wrap"}>
          <Component {...pageProps} className={"contents-box"} />
        </div>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
