import { SET_THEME } from "../Actions/type";

let initialState = {
  color:
    localStorage.getItem("theme") === null
      ? "one"
      : localStorage.getItem("theme"),
};

const themeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_THEME:
      state.color = payload;
      localStorage.setItem("theme", payload);
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", payload);
      return { ...state };

    default:
      return state;
  }
};
export default themeReducer;
