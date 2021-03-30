import Axios from "axios";
import * as yup from "yup";
import api, { apiString } from "../api";

class UserService {
  signUpAxios(data) {
    return Axios({
      method: "POST",
      url: apiString + "/api/QuanLyNguoiDung/DangKy",
      data: data,
    });
  }
  // signInAxios(user) {
  //   return Axios({
  //     method: "POST",
  //     url: apiString + "/api/QuanLyNguoiDung/DangNhap",
  //     data: user,
  //   });
  // }
  signInAxios = (user) => api.post("QuanLyNguoiDung/DangNhap", user);
  // infoUser1(user) {
  //   return Axios({
  //     method: "POST",
  //     url: apiString + "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
  //     data: user,
  //   });
  // }
  infoUser = (data) => api.post("QuanLyNguoiDung/ThongTinTaiKhoan", data);

  // updateUser(user) {
  //   return Axios({
  //     method: "PUT",
  //     url:
  //       "https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
  //     data: user,
  //   });
  // }
  updateUser = (data) =>
    api.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);

  //  addRegistrationCoursesAxios() {
  //     return Axios({
  //       method: "POST",
  //       url: apiString + "/api/QuanLyKhoaHoc/DangKyKhoaHoc",
  //     });
  //   }
}
export default UserService;

// Validation
export const signupUserSchema = yup.object().shape({
  taiKhoan: yup
    .string()
    .required("* Required")
    .matches(
      /^[A-Za-z][A-Za-z0-9]{7,15}$/i,
      "* 8-15 ký tự phân biệt hoa thường"
    ),
  matKhau: yup
    .string()
    .required("* Required")
    .matches(
      /^[A-Za-z](?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]|[ ]){7,15}$/,
      "* Từ 8-15 ký tự bắt đầu chữ cái, Required có 1 chữ in hoa và 1 chữ số và 1 ký tự đặc biệt !@#$%^&*"
    ),
  hoTen: yup
    .string()
    .required("* Required")
    .matches(
      new RegExp(
        "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
          "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
          "ụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\\s]{1,}[ ][a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
          "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
          "ụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\\s]{1,}$"
      ),
      "* Họ tên có khoảng trắng"
    ),
  email: yup.string().required("* Required").email("* Email không hợp lệ !"),
  soDT: yup
    .string()
    .required("* Required")
    .matches(
      /(^[+][8][4]([0-9]{9})$)|(^[0]([0-9]{9})$)/,
      "* Đầu số là +84 hoặc 0, tiếp đó là 9 chữ số"
    ),
  maNhom: yup.string().required("* Required"),
});
export const signinUserSchema = yup.object().shape({
  taiKhoan: yup
    .string()
    .required("* Required")
    .matches(
      /^[A-Za-z][A-Za-z0-9]{7,15}$/i,
      "* 8-15 ký tự phân biệt hoa thường"
    ),
  matKhau: yup
    .string()
    .required("* Required")
    .matches(
      /^[A-Za-z](?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]|[ ]){7,15}$/,
      "* Từ 8-15 ký tự bắt đầu chữ cái, Required có 1 chữ in hoa và 1 chữ số và 1 ký tự đặc biệt !@#$%^&*"
    ),
});

export const updateInfoUserSchema = () =>
  yup.object().shape({
    matKhau: yup
      .string()
      .matches(
        /^[A-Za-z](?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]|[ ]){7,15}$/,
        "* Từ 8-15 ký tự bắt đầu chữ cái, Required có 1 chữ in hoa và 1 chữ số và 1 ký tự đặc biệt !@#$%^&*"
      ),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("matKhau"), null], "* Passwords must match"),
    soDT: yup
      .string()
      .required("* Required")
      .matches(
        /(^[+][8][4]([0-9]{9})$)|(^[0]([0-9]{9})$)/,
        "* Đầu số là +84 hoặc 0, tiếp đó là 9 chữ số"
      ),
  });
