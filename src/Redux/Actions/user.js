// async action xử lý bất đồng bộ
import { userService } from "../../Services";
import {
  AVATAR_LIST,
  DISABLE_ON_OFF,
  FETCH_CREDENTIALS,
  FETCH_WAITING_COMFIRM_REGISTRANTION,
  INFO_USER,
} from "./type";
import { createAction } from "./";
import setHeaders from "../../helpers/setHeaders";
import { correct, inCorrect } from "../../helpers/alert";

export const loginAsync = (user, callback) => {
  return (dispatch) => {
    userService
      .signInAxios(user)
      .then((res) => {
        // console.log(res);
        dispatch(listCourseWaitingComfirmAsync(res.data));
        dispatch(createAction(FETCH_CREDENTIALS, res.data));
        localStorage.setItem("credentials", JSON.stringify(res.data));
        localStorage.setItem("accessToken", res.data.accessToken);
        setHeaders(res.data.accessToken);
        correct("Correct", "Good day for you!");
        setTimeout(() => {
          dispatch(createAction(INFO_USER, true));
          callback();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        inCorrect();
      });
  };
};
// export const logoutAsync = () => {
//     return (dispatch) => {
//          localStorage.clear();
//          dispatch(createAction(FETCH_CREDENTIALS, null));
//         //  dispatch(createAction(FETCH_MY_COURSE, []));
//     }
// }
export const logoutAsync = () => {
  return (dispatch) => {
    localStorage.removeItem("credentials");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("cart");
    correct("Log out Success!", "See you later");
    dispatch(createAction(FETCH_CREDENTIALS, null));
    //   dispatch(createAction(FETCH_MY_COURSE, []))
  };
};
export const comfirmUserAsync = (user) => {
  return (dispatch) => {
    userService
      .signInAxios(user)
      .then((res) => {
        // console.log(res);
        dispatch(createAction(DISABLE_ON_OFF, false));
        correct("Correct", "Good day for you!");
        setTimeout(() => {
          dispatch(createAction(INFO_USER, true));
        }, 100);
      })
      .catch((err) => {
        console.log(err);
        inCorrect();
      });
  };
};

export const updateUserAsync = (user) => {
  return (dispatch) => {
    userService
      .updateUser(user)
      .then((res) => {
        dispatch(createAction(FETCH_CREDENTIALS, res.data));
        localStorage.setItem("credentials", JSON.stringify(res.data));
        setTimeout(() => {
          correct("Updated", "Good day for you!");
        }, 100);
      })
      .catch((err) => {
        inCorrect();
        console.log(err);
      });
  };
};

export const infoUserAsync = (user) => {
  return (dispatch) => {
    userService
      .infoUser(user)
      .then((res) => {
        console.log(res.data);
        // correct("Correct", "Good day for you!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const listCourseWaitingComfirmAsync = (user) => {
  return (dispatch) => {
    userService
      .infoUser(user)
      .then((res) => {
        // console.log(res.data.chiTietKhoaHocGhiDanh);
        dispatch(
          createAction(
            FETCH_WAITING_COMFIRM_REGISTRANTION,
            res.data.chiTietKhoaHocGhiDanh
          )
        );
      })
      .catch((err) => console.log(err));
  };
};

export const setAvatar = () => {
  return (dispatch) => {
    dispatch(createAction(AVATAR_LIST, false));
  };
};
