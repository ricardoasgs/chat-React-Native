import { createStackNavigator } from "react-navigation";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import Chat from "./pages/Chat";

const Routes = createStackNavigator({
  Login,
  SignUp,
  Main,
  Chat
});

export default Routes;
