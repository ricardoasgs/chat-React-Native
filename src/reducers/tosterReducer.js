INITIAL_STATE = {
  message: null
};

export default function toastMessage(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_TOAST":
      return { message: action.message };
    default:
      return state;
  }
}
