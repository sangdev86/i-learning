import { Field, Formik, Form } from "formik";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { groupId } from "../../api";
import ModalAll from "../../Popup/ModalAll/ModalAll";
import {
  addNewCourseAsync,
  CourseUpdateAsync,
} from "../../Redux/Actions/course";

export default function CourseModal() {
  const taiKhoan = useSelector((state) => state.user.credentials.taiKhoan);
  const dispatch = useDispatch();
  const courseWillUpdate = useSelector(
    (state) => state.course.courseWillUpdate
  );

  const handleSumit = (data) => {
    if (courseWillUpdate.length === 0) {
      dispatch(addNewCourseAsync(data));
    } else {
      dispatch(CourseUpdateAsync(data));
    }
  };

  //   let today = new Date();
  //   let dd = String(today.getDate()).padStart(2, "0");
  //   let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  //   let yyyy = today.getFullYear();
  //   today = mm + "/" + dd + "/" + yyyy;

  return (
    <ModalAll
      width={"50%"}
      component={
        <div className="course-modal bg-white">
          <Formik
            initialValues={{
              maKhoaHoc:
                courseWillUpdate.maKhoaHoc ||
                Math.random().toString(36).substr(2, 10),
              biDanh: courseWillUpdate.biDanh || "",
              tenKhoaHoc: courseWillUpdate.tenKhoaHoc || "",
              moTa: courseWillUpdate.moTa || "",
              luotXem:
                courseWillUpdate.luotXem || Math.floor(Math.random() * 10000),
              danhGia:
                courseWillUpdate.danhGia || Math.floor(Math.random() * 10000),
              hinhAnh: courseWillUpdate.hinhAnh || "",
              maNhom: groupId,
              ngayTao: courseWillUpdate.ngayTao || "",
              maDanhMucKhoaHoc: courseWillUpdate.maDanhMucKhoaHoc || "BackEnd",
              taiKhoanNguoiTao: taiKhoan,
            }}
            // enableReinitialize={true}
            onSubmit={handleSumit}
            component={({ handleChange, setFieldValue }) => (
              <Form>
                <div className="d-flex flex-wrap justify-content-between p-2 pl-5 pr-5">
                  <div className="f-content">
                    <label>Name: </label> <br />
                    <Field
                      type="text"
                      className="f-input"
                      name="tenKhoaHoc"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="f-content">
                    <label>Id: </label> <br />
                    <Field
                      type="text"
                      className="f-input"
                      disabled
                      name="maKhoaHoc"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="f-content">
                    <label>Category: </label> <br />
                    <Field
                      component="select"
                      className="f-input"
                      name="maDanhMucKhoaHoc"
                      onChange={handleChange}
                    >
                      <option value="BackEnd">Backend</option>
                      <option value="Design">Design</option>
                      <option value="DiDong">Mobile</option>
                      <option value="FrontEnd">Frontend</option>
                      <option value="FullStack">Fullstack</option>
                      <option value="TuDuy">Mentality</option>
                    </Field>
                  </div>
                  <div className="f-content">
                    <label>Alias: </label> <br />
                    <Field
                      type="text"
                      className="f-input"
                      name="biDanh"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="f-content">
                    <label>Time: </label> <br />
                    <Field
                      type="date"
                      className="f-input"
                      name="ngayTao"
                      max="2023-01-01"
                      min="2019-12-31"
                      onChange={handleChange}
                    ></Field>
                  </div>
                  <div className="f-content">
                    <label>Image: </label> <br />
                    <input
                      type="file"
                      className="f-input"
                      name="hinhAnh"
                      onChange={(event) => {
                        setFieldValue("hinhAnh", event.currentTarget.files[0]);
                      }}
                    />
                  </div>
                  <div className="Description">
                    <label>Description: </label> <br />
                    <Field
                      component="textarea"
                      name="moTa"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-success m-2" type="submit">
                    Submit
                  </button>
                </div>
              </Form>
            )}
          />
        </div>
      }
    />
  );
}
