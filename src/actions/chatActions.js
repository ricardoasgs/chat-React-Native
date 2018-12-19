import { AsyncStorage } from "react-native";
import { ToastStyles } from "react-native-toaster";
import { StackActions, NavigationActions } from "react-navigation";

import { addToast } from "../actions/toasterActions";

import socket from "../config/socket";
import {
  SELECT_CHAT,
  FETCH_CHATS,
  USER_TYPING,
  USER_STOPPED_TYPING
} from "./types";

export async function fetchRooms() {
  const userId = await AsyncStorage.getItem("userId");
  return dispatch => {
    socket.emit("getChats", userId);
    socket.on("chats", data => {
      console.log(data);
      dispatch({
        type: FETCH_CHATS,
        payload: data
      });
    });
  };
}

export function selectRoom(chat) {
  return dispatch => {
    dispatch({
      type: SELECT_CHAT,
      payload: chat
    });
  };
}

export function sendMessage(message) {
  return dispatch => {
    socket.emit("newMessage", message);
  };
}

export function userIsTyping(userIsTyping) {
  return dispatch => {
    socket.emit("userTyping", userIsTyping);
    socket.on("userIsTyping", userTyping => {
      dispatch({
        type: USER_TYPING,
        payload: userTyping
      });
    });

    setTimeout(() => {
      dispatch({
        type: USER_STOPPED_TYPING
      });
    }, 1500);
  };
}
