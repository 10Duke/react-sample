import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./scss/styles.scss";

import App from "./components/app";
import * as serviceWorker from "./serviceWorker";

import debug from "debug";
import {createRoot} from "react-dom/client";

debug.log = console.info.bind(console);
debug.enable("*");
localStorage.setItem("debug", "*");
const container = document.getElementById('root');
if (!!container) {
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
// Router moved here as location access is needed in App, and it's only accessible from router children
  root.render(
        <Router>
          <App/>
        </Router>);
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
