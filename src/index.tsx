import "./assets/button.scss";
import "./assets/style.scss";

import React from "react";
import ReactDOM from "react-dom";

import Main from "./pages/Main";
import * as serviceWorker from "./serviceWorker";
import { ObsProvider } from "./appContext";

ReactDOM.render(
  <React.StrictMode>
    <ObsProvider>
      <Main />
    </ObsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
