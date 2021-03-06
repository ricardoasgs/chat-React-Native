const INITIAL_STATE = {
  userId: "",
  token: "",
  validToken: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER_FETCHED":
      if (action.payload) {
        return {
          ...state,
          token: action.payload.token,
          userId: action.payload.user._id
        };
      } else {
        return {
          ...state,
          token: null,
          userId: null
        };
      }
    case "USER_VALIDATED":
      return {
        ...state,
        userId: action.payload.userId,
        token: action.payload.token
      };
    case "USER_REGISTRED":
      return state;
    default: {
      return state;
    }
  }
};
