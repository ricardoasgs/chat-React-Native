import axios from "axios";
import { AsyncStorage } from "react-native";

import { API_URL } from "../config/constants";

export const changeEmail = event => ({
  type: "EMAIL_CHANGED",
  payload: event.target.value
});

export const changePassword = event => ({
  type: "PASSWORD_CHANGED",
  payload: event.target.value
});

export const changeConfirmPassword = event => ({
  type: "CONFIRM_PASSWORD_CHANGED",
  payload: event.target.value
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
        AsyncStorage.setItem("token", res.data.token);
        AsyncStorage.setItem("userId", res.data._id);
        dispatch({ type: "USER_FETCHED", payload: res.data });
      })
      .catch(e => {
        e.response.data.errors.forEach(error => console.log("Erro", error));
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
  AsyncStorage.removeItem("userId");
  AsyncStorage.removeItem("token");
  return { type: "TOKEN_VALIDATED", payload: false };
}

export function validateToken(token) {
  return dispatch => {
    if (token) {
      axios
        .post(`${API_URL}/validateToken`, { token })
        .then(resp => {
          if (!resp.data.valid) {
            AsyncStorage.removeItem("userId");
            AsyncStorage.removeItem("token");
          }
          dispatch({ type: "TOKEN_VALIDATED", payload: resp.data.valid });
        })
        .catch(e => dispatch({ type: "TOKEN_VALIDATED", payload: false }));
    } else {
      dispatch({ type: "TOKEN_VALIDATED", payload: false });
    }
  };
}
