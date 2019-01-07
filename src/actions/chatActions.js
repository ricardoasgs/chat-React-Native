import { AsyncStorage } from "react-native";
import { ToastStyles } from "react-native-toaster";
import { StackActions, NavigationActions } from "react-navigation";

import { addToast } from "../actions/toasterActions";

import socket from "../config/socket";
import {
  SELECT_CHAT,
  SELECT_RECIPIENT,
  FETCH_CHATS,
  USER_TYPING,
  USER_STOPPED_TYPING
} from "./types";

export async function fetchRooms() {
  const userId = await AsyncStorage.getItem("userId");
  return dispatch => {
    socket.emit("getChats", userId);
    socket.on("chats", data => {
      //joinChats(data);
      dispatch({
        type: FETCH_CHATS,
        payload: data
      });
    });
  };
}

// export function joinChats(chats) {
//   chats.map(chat => {
//     socket.emit("joinChats", chat);
//   });
// }

export function selectRoom(chat, callback) {
  chat.messages = chat.messages.reverse();
  return dispatch => {
    dispatch({
      type: SELECT_CHAT,
      payload: chat
    });
    callback();
  };
}

export function updateRoom(chat) {
  chat.messages = chat.messages.reverse();
  console.log(chat);
  return dispatch => {
    dispatch({
      type: SELECT_CHAT,
      payload: chat
    });
  };
}

export function selectRecipient(recipient) {
  return dispatch => {
    dispatch({
      type: SELECT_RECIPIENT,
      payload: recipient
    });
  };
}

// export function sendMessage(userId, addressId, message) {
//   socket.emit("newMessage", userId, addressId, message);
//   socket.on("newMessage", data => {
//     console.log(data);
//     fetchRooms();
//   });
// }

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
