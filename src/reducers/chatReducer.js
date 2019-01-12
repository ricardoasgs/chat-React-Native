import {
  SELECT_CHAT,
  SELECT_RECIPIENT,
  FETCH_CHATS,
  USER_TYPING,
  USER_STOPPED_TYPING
} from "../actions/types";

const INITIAL_STATE = {
  chat: {},
  recipient: {},
  chats: [],
  messages: [],
  userTyping: null,
  isTyping: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_CHAT:
      console.log("CHAT CHANGED");
      //console.log(action.payload);
      return { ...state, chat: action.payload };
    case SELECT_RECIPIENT:
      return { ...state, recipient: action.payload };
    case FETCH_CHATS:
      return { ...state, chats: action.payload };
    case USER_TYPING:
      return { ...state, userTyping: action.payload, isTyping: true };
    case USER_STOPPED_TYPING:
      return { ...state, isTyping: null };
    default:
      return state;
  }
}
