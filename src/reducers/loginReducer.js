import { AsyncStorage } from "react-native";

const INITIAL_STATE = {
  userId: AsyncStorage.getItem("userId"),
  token: AsyncStorage.getItem("token"),
  email: "",
  password: "",
  confirmPassword: "",
  validToken: false,
  form: "LOGIN"
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOKEN_VALIDATED":
      if (action.payload) {
        return { ...state, validToken: true };
      } else {
        return { ...state, validToken: false, user: null };
      }
    case "USER_FETCHED":
      return { ...state, user: action.payload, validToken: true };
    case "FORM_INITIED":
      return {
        ...state,
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      };
    case "EMAIL_CHANGED":
      return {
        ...state,
        email: action.payload
      };
    case "PASSWORD_CHANGED":
      return {
        ...state,
        password: action.payload
      };
    case "CONFIRM_PASSWORD_CHANGED":
      return {
        ...state,
        password: action.payload
      };
    case "FORM_CHANGED":
      return {
        ...state,
        form: action.payload
      };
    default: {
      return state;
    }
  }
};
