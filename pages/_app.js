import "../styles/global.css";
import "../styles/device.css";

import React from "react";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { blue, pink } from "@material-ui/core/colors";
import App from "next/app";
import loadAuth from "../lib/loadAuth";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  }
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
MyApp.getInitialProps = async appContext => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  await loadAuth(appContext.ctx);
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
