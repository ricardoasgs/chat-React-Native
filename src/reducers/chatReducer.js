import {
  SELECT_CHAT,
  SELECT_ADDRESS,
  FETCH_CHATS,
  USER_TYPING,
  USER_STOPPED_TYPING
} from "../actions/types";

const INITIAL_STATE = {
  chat: {},
  address: {},
  chats: [],
  messages: [],
  userTyping: null,
  isTyping: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_CHAT:
      return { ...state, chat: action.payload };
    case SELECT_ADDRESS:
      return { ...state, address: action.payload };
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
