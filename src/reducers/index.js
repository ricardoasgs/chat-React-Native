import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import toasterReducer from "./tosterReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  toaster: toasterReducer
});

export default rootReducer;
