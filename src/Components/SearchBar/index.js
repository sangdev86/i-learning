import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  COURSES_SEARCH,
  FETCH_LOCATION,
  KEY_WORDS,
  KEY_WORDS_JOBS,
} from "../../Redux/Actions/type";
import { createAction } from "../../Redux/Actions/index";
class SearchBar extends Component {
  handleSubmitSearch = (e) => {
    e.preventDefault();
    this.props.history.push("/courses");
  };
  handleOnkeyUp = (e) => {
    e.preventDefault();
    if (this.props.location.pathname !== "/jobs") {
      this.props.history.push("/courses");
    }
    const { courses } = this.props;
    let coursesSearch = [];
    coursesSearch = courses.filter((item) => {
      return (
        item.tenKhoaHoc
          .trim()
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[đĐ]/g, "d")
          .indexOf(
            e.target.value
              .trim()
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/[đĐ]/g, "d")
          ) !== -1
      );
    });

    // console.log(coursesSearch);
    // console.log(coursesSearch[0].danhMucKhoaHoc.maDanhMucKhoahoc);
    this.props.dispatch(createAction(COURSES_SEARCH, coursesSearch));
    if (this.props.location.pathname === "/courses") {
      this.props.dispatch(createAction(KEY_WORDS, e.target.value));
    } else {
      this.props.dispatch(createAction(KEY_WORDS_JOBS, e.target.value));
    }
  };
  handleOnChangeLocation = (e) => {
    this.props.dispatch(createAction(FETCH_LOCATION, e.target.value));
  };

  render() {
    return (
      <form
        className="form-inline my-2 my-lg-0"
        onSubmit={this.handleSubmitSearch}
      >
        <input className="form-control mr-sm-2" onKeyUp={this.handleOnkeyUp} />
        {this.props.keyWords.length > 0 &&
        this.props.location.pathname === "/courses" ? (
          <span className="btn-search-active " type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <p className="animate">Search</p>
          </span>
        ) : this.props.location.pathname === "/jobs" ? (
          <div>
            <select
              className="location-select"
              onClick={this.handleOnChangeLocation}
            >
              <option className="location-item" value="All">
                ALL CITY
              </option>
              <option className="location-item" value="HCM">
                HCM
              </option>
              <option className="location-item" value="HA NOI">
                HA NOI
              </option>
              <option className="location-item" value="CAN THO">
                CAN THO
              </option>
            </select>
          </div>
        ) : (
          <button className="btn-search btn my-2 my-sm-0 " type="submit">
            Search
          </button>
        )}
      </form>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    courses: state.course.courses,
    categories: state.course.categories,
    keyWords: state.course.keyWords,
  };
};
export default withRouter(connect(mapStateToProps, null)(SearchBar));
