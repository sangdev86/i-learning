import { FETCH_LOCATION, KEY_WORDS_JOBS } from "../Actions/type";

let initalState = {
  location: "All",
  keywords: "",
  
};
const JobsReducer = (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_LOCATION: {
      state.location = payload;
      return { ...state };
    }
    case KEY_WORDS_JOBS: {
        state.keywords = payload;
        return { ...state };
      }
      
    default:
      return state;
  }
};

export default JobsReducer;