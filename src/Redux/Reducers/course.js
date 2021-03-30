import { inCorrect2 } from "../../helpers/alert";
import {
  FETCH_COURSES,
  FETCH_COURSESDETAIL,
  COURSES_SEARCH,
  SET_INDEX,
  KEY_WORDS,
  FETCH_CATEGORIES,
  CART_ON_OFF,
  ADD_CARTS,
  FETCH_CARTS,
  REMOVE_CARTS,
  CHOOSE_CARTS_ITEM,
  NOT_CHOOSE_CARTS_ITEM,
  SET_CHOOSE_CART_ITEM,
  FETCH_WAITING_COMFIRM_REGISTRANTION,
  ADD_REGISTRATION_COURSES,
  FETCH_COMFIRMED_REGISTERED,
  FETCH_COURSES_PAGINATION,
  COURSE_WILL_UPDATE,
  KEY_WORDS_ADMIN_SEARCH,
} from "../Actions/type";

let initalState = {
  courses: [],
  courseDetail: null,
  coursesSearch: [],
  keyWords: "",
  categories: "All",
  indexCategories: -1,
  cartsONOFF: false,
  carts: [],
  listCartsChoose: [],
  total: 0,
  listCourseWaitingComfirm: [],
  listCourseComfirmed: [],
  coursesPagination: {
    currentPage: null,
    count: null,
    totalPages: null,
    items: [],
  },
  courseWillUpdate: [],
  keyWordsAdminSearch: "",
};
const CourseReducer = (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_COURSES: {
      state.courses = payload;
      return { ...state };
    }
    case FETCH_COURSESDETAIL: {
      state.courseDetail = payload;
      return { ...state };
    }
    case COURSES_SEARCH: {
      state.coursesSearch = payload;
      return { ...state };
    }
    case KEY_WORDS: {
      state.keyWords = payload;
      return { ...state };
    }
    case FETCH_CATEGORIES: {
      state.categories = payload;
      return { ...state };
    }
    case SET_INDEX: {
      state.indexCategories = payload;
      return { ...state };
    }
    case CART_ON_OFF:
      state.cartsONOFF = payload;
      return { ...state };
    case ADD_CARTS: {
      //fix hiện thị trên store
      let index = state.carts.findIndex(
        (item) => item.maKhoaHoc === payload.maKhoaHoc
      );
      if (index !== -1) {
        inCorrect2("This course has already been in cart !");
        return { ...state };
      }
      state.carts = [...state.carts, payload];
      localStorage.setItem("carts", JSON.stringify(state.carts));
      return { ...state };
    }
    case FETCH_CARTS:
      state.carts = payload;
      // ko lưu cũng dc nhưng thực hiện chức năng clear all item
      localStorage.setItem("carts", JSON.stringify(state.carts));
      return { ...state };
    case REMOVE_CARTS: {
      const arr = [...state.carts];
      let index = state.carts.findIndex(
        (item) => item.maKhoaHoc === payload.maKhoaHoc
      );
      if (index !== -1) {
        arr.splice(index, 1);
      }
      state.carts = [...arr];
      localStorage.setItem("carts", JSON.stringify(state.carts));
      return { ...state };
    }
    case CHOOSE_CARTS_ITEM:
      state.total += payload[0];
      state.total = Math.round(state.total * 100) / 100;
      // state.listCartsChoose.push(payload[1]); // $0 sẽ bị lỗi
      state.listCartsChoose = [...state.listCartsChoose, payload[1]];
      return { ...state };
    case NOT_CHOOSE_CARTS_ITEM: {
      const arr = [...state.listCartsChoose];
      let index = state.listCartsChoose.findIndex(
        (item) => item.maKhoaHoc === payload[1].maKhoaHoc
      );
      if (index !== -1) {
        arr.splice(index, 1);
        //FIX  có mới trừ tiền ko có chọn mà cũng bị trừ oan
        state.total -= payload[0];
        state.total = Math.round(state.total * 100) / 100;
      }
      state.listCartsChoose = [...arr];
      return { ...state };
    }
    case SET_CHOOSE_CART_ITEM:
      state.total = payload[0];
      state.listCartsChoose = payload[1];
      return { ...state };
    case FETCH_WAITING_COMFIRM_REGISTRANTION:
      state.listCourseWaitingComfirm = payload;
      return { ...state };

    case FETCH_COMFIRMED_REGISTERED:
      state.listCourseComfirmed = payload;
      return { ...state };

    case ADD_REGISTRATION_COURSES: {
      // state.listCourseWaitingComfirm = [
      //   ...state.listCourseWaitingComfirm,
      //   payload,
      // ];
      // console.log(payload);
      // xóa course trong carts sau khi registation thành công
      // chiTietKhoaHocGhiDanh trong res.data có thuộc tính này.
      payload.chiTietKhoaHocGhiDanh.forEach((payload) => {
        const arr = [...state.carts];
        let id = state.carts.findIndex(
          (item) => item.maKhoaHoc === payload.maKhoaHoc
        );
        if (id !== -1) {
          arr.splice(id, 1);
        }
        state.carts = [...arr];
      });

      localStorage.setItem("carts", JSON.stringify(state.carts));
      return { ...state };
    }
    case FETCH_COURSES_PAGINATION: {
      state.coursesPagination.items = payload.items;
      state.coursesPagination.currentPage = payload.currentPage;
      state.coursesPagination.count = payload.count;
      state.coursesPagination.totalPages = payload.totalPages;
      return { ...state };
    }
    case COURSE_WILL_UPDATE: {
      state.courseWillUpdate = payload;
      return { ...state };
    }
    case KEY_WORDS_ADMIN_SEARCH:
      state.keyWordsAdminSearch = payload;
      return { ...state };
    default:
      return state;
  }
};
export default CourseReducer;
