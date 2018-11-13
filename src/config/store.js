import reduxPromise from "redux-promise";
import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import multi from "redux-multi";

import reducers from "../reducers/index";

const middle = [reduxPromise, reduxThunk, multi];

export default applyMiddleware(...middle)(createStore)(reducers);
