import React, { Component } from "react";
import Routes from "./routes";
import { Provider } from "react-redux";

import "./config/socket";
import "./config/statusBarConfig";
import store from "./config/store";

import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
