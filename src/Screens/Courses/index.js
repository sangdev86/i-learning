import React, { Component } from "react";
import { connect } from "react-redux";

import Course from "../../Components/Course";
import CategoriesCourses from "../../Components/CategoriesCourses";
import { withRouter } from "react-router-dom";

class Courses extends Component {
  render() {
    const {
      indexCategories,
      categories,
      coursesSearch,
      courseList,
      keyWords,
    } = this.props;
    return (
      <div>
        <div className="courseItem">
          <h1 className="display-5 text-center ">ALL COURSES</h1>
          <CategoriesCourses
            indexCategories={indexCategories}
            categories={categories}
          />
        </div>
        {categories === "All" ? (
          keyWords.length > 0 ? (
            <div className="container">
              <div className="row">
                {coursesSearch.map((course, index) => (
                  <Course course={course} key={index} />
                ))}
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="row">
                {courseList.map((course, index) => (
                  <Course course={course} key={index} />
                ))}
              </div>
            </div>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
  // componentDidMount() {
  //   this.props.dispatch(fetchCoursesAsync());
  // }
}
const mapStateToProps = (state) => ({
  courseList: state.course.courses,
  coursesSearch: state.course.coursesSearch,
  keyWords: state.course.keyWords,
  indexCategories: state.course.indexCategories,
  categories: state.course.categories,
});
export default withRouter(connect(mapStateToProps, null)(Courses));
