import React from "react";
import ReactDOM from "react-dom";
import "./scss/styles.scss";
import App from "./components/app";
import * as serviceWorker from "./serviceWorker";

import _debug from "debug";
import { BrowserRouter as Router } from "react-router-dom";

_debug.enable("*");
localStorage.setItem("debug", "*");
// Router moved here as location access is needed in App, and it's only accessible from router children
ReactDOM.render(
  <React.StrictMode>
      <Router>
            <App />
      </Router>
  </React.StrictMode>,
  document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
