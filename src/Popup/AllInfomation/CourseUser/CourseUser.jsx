import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Course from "../../../Components/Course";
import { listCourseWaitingComfirmAsync } from "../../../Redux/Actions/user";

export default function CourseUser() {
  const dispatch = useDispatch();
  const credentials = useSelector((state) => state.user.credentials);
  const listCourseWaitingComfirm = useSelector(
    (state) => state.course.listCourseWaitingComfirm
  );

  const courses = useSelector((state) => state.course.courses);
  const initial = useCallback(() => {
    dispatch(listCourseWaitingComfirmAsync(credentials));
  }, [dispatch, credentials]);
  useEffect(() => {
    initial();
  }, [initial]);

  const renderCourseWaitingComfirm = () => {
    if (listCourseWaitingComfirm.length > 0) {
      let arr = [];
      courses.forEach((course) => {
        listCourseWaitingComfirm.forEach((item) => {
          if (course.maKhoaHoc === item.maKhoaHoc) {
            arr = [...arr, course];
          }
        });
      });
      // console.log(arr);
      // console.log(courses);
      return arr.map((item, index) => (
        <Course
          hiddenBottom={true}
          displayDelbtn={true}
          dRes={"col-12 col-md-6 col-lg-4 col-xl-3"}
          course={item}
          key={index}
        />
      ));
    } else {
      return (
        <h4 className="set-item-text">
          You don't hace any Course!
          <span className="text-danger text-red">Register Course</span> to get
          the courses!
        </h4>
      );
    }
  };
  // const renderCourseComfirmed = () => {
  //   if (listCourseComfirmed.length > 0) {
  //     let arr = [];
  //     courses.forEach((course) => {
  //       listCourseComfirmed.forEach((item) => {
  //         if (course.maKhoaHoc === item.maKhoaHoc) {
  //           arr = [...arr, course];
  //         }
  //       });
  //     });
  //     // console.log(arr);
  //     // console.log(courses);
  //     return arr.map((item, index) => (
  //       <Course hiddenBottom={true} course={item} key={index} />
  //     ));
  //   } else {
  //     return (
  //       <h4 className="d-flex align-items-center font-weight-bold">
  //         Please wait for
  //         <span className="text-danger text-red"> Admin </span> to confirm for
  //         you!
  //       </h4>
  //     );
  //   }
  // };
  return (
    <div className="my-course set-item-inner">
      <div className="row course-waiting-comfirm">
        {renderCourseWaitingComfirm()}
      </div>
    </div>
  );
}
