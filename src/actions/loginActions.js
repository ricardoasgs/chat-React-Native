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

export function signup(values) {
  return dispatch => {
    axios
      .post(`${API_URL}/signup`, values)
      .then(res => {
        dispatch({ type: "USER_FETCHED", payload: res.data });
      })
      .catch(e => {
        e.response.data.errors.forEach(error => console.log("Erro", error));
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
  navigation.navigate("Login");
  return dispatch => {
    dispatch([
      { type: "USER_FETCHED", payload: false },
      NavigationActions.navigate({ routeName: "Login" })
    ]);
  };
}
