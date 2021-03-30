import Axios from "axios";

import api, { apiString, groupId } from "../api";

class CourseService {
  fetchCoursesAxios() {
    return Axios({
      method: "GET",
      url:
        apiString + `/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${groupId}`,
    });
  }
  // fetchCoursesAxios = () =>
  //   api.get(`QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${groupId}`);
  fetchCoursesDetailAxios(id) {
    return Axios({
      method: "GET",
      url: apiString + `/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${id}`,
    });
  }
  categoriesAxios() {
    return Axios({
      method: "GET",
      url: apiString + `/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc`,
    });
  }
  coursesCategoriesAxios(maDanhMuc) {
    return Axios({
      method: "GET",
      url:
        apiString +
        `/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=${groupId}`,
    });
  }
  coursesSearchAxios(tenKhoaHoc) {
    return Axios({
      method: "GET",
      url:
        apiString +
        `/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}&MaNhom=${groupId}`,
    });
  }
  addRegistrationCoursesAxios = (data) =>
    api.post("QuanLyKhoaHoc/DangKyKhoaHoc", data);

  fetchWaitingComfirmCoursesAxios = (account) =>
    api.post("QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet", account);

  fetchComfirmedCoursesAxios = (account) =>
    api.post("QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet", account);

  // unRegistrationAxios1 = (taiKhoan, maKhoaHoc) => {
  //   let data = { maKhoaHoc, taiKhoan };
  //   return Axios({
  //     method: "POST",
  //     url: apiString + `/api/QuanLyKhoaHoc/HuyGhiDanh`,
  //     data: data,
  //   });
  // };
  unRegistrationAxios = (taiKhoan, maKhoaHoc) =>
    api.post("QuanLyKhoaHoc/HuyGhiDanh", { maKhoaHoc, taiKhoan });

  fetchCoursesPageAxios = (currentPage, pageSize) =>
    api.get(
      `QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${currentPage}&pageSize=${pageSize}&MaNhom=${groupId}`
    );
  addNewCourse = (data) => api.post("QuanLyKhoaHoc/ThemKhoaHoc", data);
  UploadImg = (data) => api.post("QuanLyKhoaHoc/UploadHinhAnhKhoaHoc", data);

  updateCourse = (data) => api.put("QuanLyKhoaHoc/CapNhatKhoaHoc", data);
  deleteCourse = (maKhoaHoc) =>
    api.delete(`QuanLyKhoaHoc/XoaKhoaHoc?maKhoaHoc=${maKhoaHoc}`);
}

export default CourseService;
