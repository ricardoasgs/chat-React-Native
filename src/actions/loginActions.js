import axios from "axios";
import { AsyncStorage } from "react-native";
import { ToastStyles } from "react-native-toaster";

import { API_URL } from "../config/constants";

import { addToast } from "../actions/toasterActions";

export const changeEmail = value => ({
  type: "EMAIL_CHANGED",
  payload: value
});

export const changePassword = value => ({
  type: "PASSWORD_CHANGED",
  payload: value
});

export const changeConfirmPassword = value => ({
  type: "CONFIRM_PASSWORD_CHANGED",
  payload: value
});

export const changeForm = form => dispatch =>
  dispatch([
    {
      type: "FORM_CHANGED",
      payload: form
    },
    initForm()
  ]);

export const initForm = () => ({
  type: "FORM_INITIED"
});

export function login(values) {
  return dispatch => {
    axios
      .post(`${API_URL}/auth/signin`, values)
      .then(res => {
        console.log(res);
        AsyncStorage.setItem("token", res.data.token);
        AsyncStorage.setItem("userId", res.data._id);
        dispatch({ type: "USER_FETCHED", payload: res.data });
      })
      .catch(e => {
        //console.log(e.response.data.error);
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

export function logout() {
  AsyncStorage.clear();
  return dispatch => {
    dispatch([{ type: "USER_FETCHED", payload: false }, initForm()]);
  };
}
