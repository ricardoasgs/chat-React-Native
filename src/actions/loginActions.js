import axios from "axios";
import { AsyncStorage } from "react-native";
import { ToastStyles } from "react-native-toaster";
import { StackActions, NavigationActions } from "react-navigation";

import { API_URL } from "../config/constants";

import { addToast } from "../actions/toasterActions";

export function login(values, callback) {
  return dispatch => {
    axios
      .post(`${API_URL}/auth/signin`, values)
      .then(res => {
        AsyncStorage.setItem("token", res.data.token);
        AsyncStorage.setItem("userId", res.data.user._id);
        callback();
        dispatch([{ type: "USER_FETCHED", payload: res.data }]);
      })
      .catch(e => {
        dispatch(
          addToast({ text: e.response.data.error, styles: ToastStyles.error })
        );
      });
  };
}

export function signup(values, navigation) {
  return dispatch => {
    axios
      .post(`${API_URL}/auth/signup`, values)
      .then(res => {
        navigation.navigate("Login");
        dispatch({ type: "USER_REGISTRED", payload: res.data });
        addToast({ text: "Usuário Registrado!", styles: ToastStyles.success });
      })
      .catch(e => {
        addToast({ text: e.response.data.error, styles: ToastStyles.error });
      });
  };
}

export async function validate() {
  const userId = await AsyncStorage.getItem("userId");
  const token = await AsyncStorage.getItem("token");
  return dispatch => {
    dispatch({ type: "USER_VALIDATED", payload: { userId, token } });
  };
}

export function logout(navigation) {
  AsyncStorage.clear();
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "Login" })]
  });
  navigation.dispatch(resetAction);
  return dispatch => {
    dispatch({ type: "USER_FETCHED", payload: false });
  };
}
