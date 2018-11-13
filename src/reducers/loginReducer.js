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
    case "USER_FETCHED":
      if (action.payload) {
        console.log("alterou o estado");
        return {
          ...state,
          token: action.payload.token,
          userId: action.payload.userId
        };
      } else {
        console.log("alterou o estado");
        return {
          ...state,
          token: null,
          userId: null
        };
      }
    case "FORM_INITIED":
      return {
        ...state,
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
