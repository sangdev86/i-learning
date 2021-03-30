import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../Components/Button";
import CourseModal from "../../../Popup/CourseModal/CourseModal";
import {
  CourseWillUpdate,
  fetchCoursesPageAsync,
  deleteCourseAsync,
} from "../../../Redux/Actions/course";
import { myModal } from "../../../Redux/Actions/modal";
import { AiFillEdit, AiFillCloseSquare } from "react-icons/ai";
import { createAction } from "../../../Redux/Actions";
import { KEY_WORDS_ADMIN_SEARCH } from "../../../Redux/Actions/type";

export default function CourseManager() {
  let pageSize = 8;
  const [Page, setPage] = useState([1, pageSize]);

  const dispatch = useDispatch();
  const initial = useCallback(() => {
    dispatch(fetchCoursesPageAsync(Page));
  }, [dispatch, Page]);

  let modal = useSelector((state) => state.modal.modal);
  let courses = useSelector((state) => state.course.courses);
  let keyWordsAdminSearch = useSelector(
    (state) => state.course.keyWordsAdminSearch
  );
  useEffect(() => {
    initial();
    // console.log(Page);
  }, [initial]);

  let coursesPaginationItems = useSelector(
    (state) => state.course.coursesPagination.items
  );
  let currentPage = useSelector(
    (state) => state.course.coursesPagination.currentPage
  );
  // let count = useSelector((state) => state.course.coursesPagination.count);
  let totalPages = useSelector(
    (state) => state.course.coursesPagination.totalPages
  );

  const handleChangePage = (e) => {
    let { value } = e.target;
    if (!Number.isNaN(value) && value > 0 && value <= totalPages) {
      let num = parseInt(value);
      setPage([num, pageSize]);
    }
    e.preventDefault();
  };

  const previous = () => {
    Page[0]--;
    if (Page[0] > 0) {
      setPage([Page[0], pageSize]);
      console.log(Page[0]);
    }
  };
  const next = () => {
    Page[0]++;
    if (Page[0] <= totalPages) {
      setPage([Page[0], pageSize]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let value = e.target.value;

    dispatch(createAction(KEY_WORDS_ADMIN_SEARCH, value));
  };
  const willUpdate = (course) => {
    dispatch(CourseWillUpdate(course));
    dispatch(myModal(modal));
  };

  const renderCourse = () => {
    let arr = [];
    if (keyWordsAdminSearch.length > 0) {
      arr = courses.filter((item) => {
        return (
          item.tenKhoaHoc
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[đĐ]/g, "d")
            .indexOf(
              keyWordsAdminSearch
                .trim()
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[đĐ]/g, "d")
            ) !== -1
        );
      });
    } else {
      arr = coursesPaginationItems;
    }
    // console.log(arr);
    return arr.map((item, index) => (
      <tr key={index} className="course-pagination">
        <td className="course-item cursor-pointer">
          <div className="course-inner d-flex align-items-center">
            <img
              src={item.hinhAnh}
              height={80}
              width={120}
              alt={item.tenKhoaHoc}
            />
            <span className="name p-3 font-weight-bold">{item.tenKhoaHoc}</span>
          </div>
        </td>
        <td className="name-admin ">{item.nguoiTao.hoTen}</td>
        <td>{item.ngayTao}</td>
        <td className="text-center">
          <span
            className="icon-course-manager m-3 text-primary"
            onClick={() => willUpdate(item)}
          >
            <AiFillEdit />
          </span>
          <span
            className="icon-course-manager m-3 text-danger"
            onClick={() => dispatch(deleteCourseAsync(item.maKhoaHoc))}
          >
            <AiFillCloseSquare />
          </span>
        </td>
      </tr>
    ));
  };

  return (
    <div className="course-manager mt-3">
      {modal ? <CourseModal /> : ""}
      <h5 className="text-center font-weight-bold">Courses Manager</h5>
      <div className="header-manager d-flex">
        <div
          className="btn-add-new mr-5"
          onClick={() => dispatch(myModal(modal))}
        >
          <Button
            name={"Add New Course"}
            padding={"10px"}
            margin={"0"}
            fontSize={"14px"}
            borderRadius={"3px"}
            color={"white"}
            backgroundColor={"green"}
          />
        </div>
        <form>
          <input
            type="text"
            onKeyUp={handleSearch}
            className="form-control"
            placeholder="Search"
          />
        </form>
      </div>
      <div className="body-manager mt-2 mb-2 mb-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Courses</th>
              <th>Created by</th>
              <th>Published</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderCourse()}</tbody>
        </table>
      </div>
      {keyWordsAdminSearch.length === 0 ? (
        <div className="footer-manager d-flex align-items-center justify-content-center mb-5">
          <div className="previous-page" onClick={previous}>
            <Button
              name={"Previous"}
              padding={"5px"}
              margin={"0"}
              fontSize={"14px"}
              borderRadius={"3px"}
              color={"white"}
              backgroundColor={"green"}
            />
          </div>
          <div className="current-page m-2">
            <input
              type="text"
              key={currentPage}
              defaultValue={currentPage}
              onChange={handleChangePage}
            />
            <span className="total-pages">/{totalPages}</span>
          </div>
          <div className="next-page" onClick={next}>
            <Button
              name={"Next"}
              padding={"5px 22px"}
              margin={"0"}
              fontSize={"14px"}
              borderRadius={"3px"}
              color={"white"}
              backgroundColor={"green"}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
