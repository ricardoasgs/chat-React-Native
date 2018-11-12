import { createStackNavigator } from "react-navigation";

import Login from "./pages/Login";
import Main from "./pages/Main";
import Chat from "./pages/Chat";

const Routes = createStackNavigator({
  Login,
  Main,
  Chat
});

export default Routes;
