import "../styles/global.css";
import "../styles/device.css";

import React from "react";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { blue, pink } from "@material-ui/core/colors";
import App from "next/app";

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
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
