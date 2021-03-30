import {
  DISABLE_ON_OFF,
  FETCH_CREDENTIALS,
  INFO_USER,
  SET_AVATAR,
  SHOW_POPUP,
  AVATAR_LIST,
} from "../../Redux/Actions/type";
import { CgProfile } from "react-icons/cg";
import { BiArchive } from "react-icons/bi";
import { GoMail } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { SiHackhands } from "react-icons/si";
import { BsQuestionSquare } from "react-icons/bs";

let initialState = {
  credentials: null,
  infoUser: true,
  disabled: true,
  AllInfo: -1,
  avatarList: false,
  avatar: localStorage.getItem("avatar") ? localStorage.getItem("avatar") : 0,
  categoriesUser: [
    { icon: <CgProfile className="user-icon" />, name: "My Profile" },
    { icon: <BiArchive className="user-icon" />, name: "My Course" },
    { icon: <GoMail className="user-icon" />, name: "Messenger" },
    { icon: <SiHackhands className="user-icon" />, name: "Applied" },
    { icon: <IoSettingsOutline className="user-icon" />, name: "Setting" },
    { icon: <BsQuestionSquare className="user-icon" />, name: "Help" },
    { icon: <IoIosLogOut className="user-icon" />, name: "Logout" },
  ],
};

const UserReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case FETCH_CREDENTIALS:
      state.credentials = payload;
      return { ...state };
    case SHOW_POPUP:
      state.AllInfo = payload;
      return { ...state };
    case INFO_USER:
      state.infoUser = payload;
      return { ...state };
    case DISABLE_ON_OFF:
      state.disabled = payload;
      return { ...state };
    case AVATAR_LIST:
      state.avatarList = payload;
      return { ...state };
    case SET_AVATAR:
      state.avatar = payload;
      return { ...state };
    default:
      return state;
  }
};

export default UserReducer;
