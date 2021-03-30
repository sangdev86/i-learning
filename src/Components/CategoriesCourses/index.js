import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Category from "../../Components/Category";
import Course from "../../Components/Course";
import { courseService } from "../../Services";
import { withRouter } from "react-router-dom";
import { createAction } from "../../Redux/Actions";
import { FETCH_CATEGORIES, SET_INDEX } from "../../Redux/Actions/type";

const CategoriesCourses = ({ indexCategories, categories }) => {
  const [listCategories, setListCategories] = useState([]);
  const [indexActive, setIndexActive] = useState(indexCategories);

  const [listCourses, setListCourses] = useState([]);
  const [maDanhMuc, setMaDanhMuc] = useState(categories);

  // connect   redux
  const courses = useSelector((state) => state.course.courses);
  const coursesSearch = useSelector((state) => state.course.coursesSearch);
  const keyWords = useSelector((state) => state.course.keyWords);

  const dispatch = useDispatch();

  // List Categories
  useEffect(() => {
    courseService
      .categoriesAxios()
      .then((res) => {
        if (res.data.length > 0) {
          setListCategories(res.data);
        }
      })
      .catch((err) => console.log(err.response.data));
  }, []);

  const renderListCategories = () => {
    return listCategories.map((category, index) => (
      <Category
        key={index}
        category={category}
        id={index}
        indexActive={indexActive}
        onChangeIndex={onChangeIndex}
      />
    ));
  };

  // List coures

  useEffect(() => {
    if (maDanhMuc === "All") return;
    courseService
      .coursesCategoriesAxios(maDanhMuc)
      .then((res) => {
        if (res.data === []) return;
        setListCourses(res.data);
      })
      .catch((err) => console.log(err.response.data));
  }, [maDanhMuc]);

  const renderListCoures = () => {
    const listCouresUpdate = [...listCourses];
    listCouresUpdate.sort((a, b) => b.luotXem - a.luotXem);

    return listCouresUpdate.map((course, index) => (
      <Course key={index} course={course} />
    ));
  };

  const renderListCoursesSearch = () => {
    const courseFilter = coursesSearch.filter(
      (item) => item.danhMucKhoaHoc.maDanhMucKhoahoc.indexOf(maDanhMuc) !== -1
    );
    const listCouresUpdate = [...courseFilter];
    listCouresUpdate.sort((a, b) => b.luotXem - a.luotXem);
    return listCouresUpdate.map((course, index) => (
      <Course key={index} course={course} />
    ));
  };

  function onChangeIndex(id, maDanhMuc) {
    dispatch(createAction(SET_INDEX, id));
    setIndexActive(id);
    dispatch(createAction(FETCH_CATEGORIES, maDanhMuc));
    setMaDanhMuc(maDanhMuc);
  }

  function AllCourse() {
    dispatch(createAction(SET_INDEX, -1));
    setIndexActive(-1);
    setMaDanhMuc("All");
    dispatch(createAction(FETCH_CATEGORIES, "All"));
  }
  return (
    <div className="container top-categories">
      <ul className="d-flex flex-wrap">
        {courses.length > 0 ? (
          <li
            className={
              categories === "All" ? "category a-category" : "category"
            }
            onClick={() => AllCourse()}
          >
            <span>All</span>
          </li>
        ) : (
          ""
        )}

        {renderListCategories()}
      </ul>
      {categories === "All" ? (
        ""
      ) : keyWords.length <= 0 ? (
        <div className="row">{renderListCoures()}</div>
      ) : (
        <div className="row">{renderListCoursesSearch()}</div>
      )}
    </div>
  );
};

export default withRouter(CategoriesCourses);
