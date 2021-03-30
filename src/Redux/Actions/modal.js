import { createAction } from ".";
import { MODAL_TOGGLE } from "./type";

export const myModal = (modal) => {
  return (dispatch) => {
    dispatch(createAction(MODAL_TOGGLE, !modal));
  };
};
