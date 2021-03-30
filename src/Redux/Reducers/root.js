import { combineReducers } from "redux";

import CourseReducer from "./course";
import JobsReducer from "./jobs";
import UserReducer from "./user";
import ResponsiveReducer from "./responsive";
import modalReducer from "./modal";
import themeReducer from "./theme";

const RootReducer = combineReducers({
  course: CourseReducer,
  user: UserReducer,
  jobs: JobsReducer,
  myResponsive: ResponsiveReducer,
  modal: modalReducer,
  theme: themeReducer,
});
export default RootReducer;
