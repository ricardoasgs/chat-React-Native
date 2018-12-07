import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import toasterReducer from "./tosterReducer";
import chatReducer from "./chatReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  toaster: toasterReducer,
  chat: chatReducer
});

export default rootReducer;
