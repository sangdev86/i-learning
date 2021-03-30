// async action xử lý bất đồng bộ

import { courseService, userService } from "../../Services";
import { createAction } from ".";
import {
  ADD_CARTS,
  ADD_REGISTRATION_COURSES,
  FETCH_COURSES,
  FETCH_COURSESDETAIL,
  FETCH_COURSES_PAGINATION,
  FETCH_WAITING_COMFIRM_REGISTRANTION,
  SET_CHOOSE_CART_ITEM,
  COURSE_WILL_UPDATE,
  MODAL_TOGGLE,
} from "./type";
import { correct, inCorrect2 } from "../../helpers/alert";

export const fetchCoursesAsync = () => {
  return (dispatch) => {
    courseService
      .fetchCoursesAxios()
      .then((res) => {
        // console.log(res.data);
        dispatch(createAction(FETCH_COURSES, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchCourseDetailAsync = (id) => {
  return (dispatch) => {
    courseService
      .fetchCoursesDetailAxios(id)
      .then((res) => {
        console.log(res.data);
        dispatch(createAction(FETCH_COURSESDETAIL, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const AddCart = (user, maKhoaHoc, course) => {
  return (dispatch) => {
    userService
      .infoUser(user)
      .then((res) => {
        console.log(res.data.chiTietKhoaHocGhiDanh);
        const arr = [...res.data.chiTietKhoaHocGhiDanh];
        let index = arr.findIndex((item) => item.maKhoaHoc === maKhoaHoc);
        if (index !== -1) {
          inCorrect2("This course has already been in cart !");
        } else {
          correct("ADDED", "Have a good day!");
          dispatch(createAction(ADD_CARTS, course));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const addRegistrationCoursesAsync = (credentails, listCourse) => {
  const { taiKhoan } = credentails;
  return (dispatch) => {
    // sử dụng hàm map sẽ lỗi này Line 65:27:  Array.prototype.map() expects a return value from arrow function  array-callback-return
    listCourse.forEach((item) => {
      let { maKhoaHoc } = item;
      let data = { taiKhoan, maKhoaHoc };
      courseService
        .addRegistrationCoursesAxios(data)
        .then((res) => {
          // console.log(res.data);
          userService.infoUser(credentails).then((res) => {
            // console.log(res.data);
            correct("You have registrasted ", "Waiting Comfirm ...");
            dispatch(createAction(ADD_REGISTRATION_COURSES, res.data));
            dispatch(createAction(SET_CHOOSE_CART_ITEM, [0, []]));
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
};

// export const fetchWaitingRegistrationCoursesAsync = (user) => {
//   let { taiKhoan } = user;
//   return (dispatch) => {
//     courseService
//       .fetchWaitingComfirmCoursesAxios(taiKhoan)
//       .then((res) => {
//         console.log(res);
//         dispatch(createAction(FETCH_WAITING_COMFIRM_REGISTRANTION, res.data));
//       })
//       .catch((err) => console.log(err));
//   };
// };

// export const fetchRegisteredCoursesAsync = (user) => {
//   let { taiKhoan } = user;
//   return (dispatch) => {
//     courseService
//       .fetchComfirmedCoursesAxios(taiKhoan)
//       .then((res) => {
//         // console.log(res);
//         dispatch(createAction(FETCH_COMFIRMED_REGISTERED, res.data));
//       })
//       .catch((err) => console.log(err));
//   };
// };

export const unRegistrationAsync = (user, maKhoaHoc) => {
  const { taiKhoan } = user;
  return (dispatch) => {
    courseService
      .unRegistrationAxios(taiKhoan, maKhoaHoc)
      .then((res) => {
        userService
          .infoUser(user)
          .then((res) => {
            correct("Unregistered Success!", "See You later!");
            dispatch(
              createAction(
                FETCH_WAITING_COMFIRM_REGISTRANTION,
                res.data.chiTietKhoaHocGhiDanh
              )
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
};

// khoa hoc phan trang

export const fetchCoursesPageAsync = ([currentPage, pageSize]) => {
  return (dispatch) => {
    courseService
      .fetchCoursesPageAxios(currentPage, pageSize)
      .then((res) => dispatch(createAction(FETCH_COURSES_PAGINATION, res.data)))
      .catch((err) => console.log(err));
  };
};
export const UploadImgAsync = (value) => {
  return (dispatch) => {
    courseService
      .UploadImg(value)
      .then((res) => {
        dispatch(createAction(MODAL_TOGGLE, false));
        dispatch(fetchCoursesAsync());
        dispatch(fetchCoursesPageAsync([1, 8]));
      })
      .catch((err) => console.log(err));
  };
};

export const addNewCourseAsync = (data) => {
  let { hinhAnh, tenKhoaHoc } = data;
  let file = hinhAnh;
  let formData = new FormData();
  formData.append("file", file);
  formData.append("tenKhoaHoc", tenKhoaHoc);
  data = { ...data, hinhAnh: hinhAnh.name };
  return (dispatch) => {
    courseService
      .addNewCourse(data)
      .then((res) => {
        dispatch(UploadImgAsync(formData));
        correct("GOOD", "ADD NEW SUCCESS");
      })
      .catch((err) => console.log(err));
  };
};
export const CourseWillUpdate = (course) => {
  return (dispatch) => {
    dispatch(createAction(COURSE_WILL_UPDATE, course));
  };
};
export const CourseUpdateAsync = (data) => {
  let { hinhAnh, tenKhoaHoc } = data;
  let file = hinhAnh;
  let formData = new FormData();
  formData.append("file", file);
  formData.append("tenKhoaHoc", tenKhoaHoc);
  data = { ...data, hinhAnh: hinhAnh.name };
  return (dispatch) => {
    // console.log(data);
    courseService
      .updateCourse(data)
      .then((res) => {
        dispatch(UploadImgAsync(formData));
        correct("GOOD", "UPDATE SUCCESS");
      })
      .catch((err) => console.log(err));
  };
};

export const deleteCourseAsync = (maKhoaHoc) => {
  return (dispatch) => {
    courseService
      .deleteCourse(maKhoaHoc)
      .then((res) => {
        console.log("delete");
        dispatch(fetchCoursesAsync());
        dispatch(fetchCoursesPageAsync([1, 8]));
      })
      .catch((err) => console.log(err));
  };
};
