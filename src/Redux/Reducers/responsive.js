import { FETCH_SIZE_SCREEN, SIDEBAR } from "../Actions/type";

let initialState = {
  rWith: window.innerWidth,
  sidebarAdmin: true,
};

const ResponsiveReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SIZE_SCREEN: {
      state.rWith = payload;
      return { ...state };
    }
    case SIDEBAR:
      state.sidebarAdmin = payload;
      return { ...state };
    default:
      return state;
  }
};

export default ResponsiveReducer;
