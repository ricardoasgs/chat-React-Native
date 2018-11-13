import React, { Component } from "react";
import Routes from "./routes";
import { Provider } from "react-redux";

import "./config/statusBarConfig";
import store from "./config/store";

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
