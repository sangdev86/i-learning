import { MODAL_TOGGLE } from "../Actions/type";

let initalstate = {
  modal: false,
};

const modalReducer = (state = initalstate, action) => {
  const { type, payload } = action;
  switch (type) {
    case MODAL_TOGGLE:
      state.modal = payload;
      return { ...state };

    default:
      return state;
  }
};
export default modalReducer;
