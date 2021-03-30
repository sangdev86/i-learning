import React, { Component } from "react";

// import { CgProfile } from "react-icons/cg";
// import { BiArchive } from "react-icons/bi";
// import { GoMail } from "react-icons/go";
// import { IoSettingsOutline } from "react-icons/io5";
// import { IoIosLogOut } from "react-icons/io";
// import { SiHackhands } from "react-icons/si";
// import { BsQuestionSquare } from "react-icons/bs";
import {
  listCourseWaitingComfirmAsync,
  logoutAsync,
} from "./../../Redux/Actions/user";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createAction } from "../../Redux/Actions";
import { SHOW_POPUP } from "../../Redux/Actions/type";

class OnUser extends Component {
  onLogoutUser = () => {
    this.props.dispatch(logoutAsync());
    setTimeout(() => {
      this.props.history.push("/");
      this.props.history.go("/");
    }, 500);
  };

  showPopup = (index) => {
    this.props.dispatch(createAction(SHOW_POPUP, index));
  };

  render() {
    const { credentials, avatar } = this.props;

    return (
      <div className="on-user dropdown">
        <div
          className="show-user d-flex dropdown-toggle mr-3"
          id="navbarDropdown"
          data-toggle="dropdown"
          onClick={() =>
            this.props.dispatch(listCourseWaitingComfirmAsync(credentials))
          }
        >
          <img src={`./img/Avatar/User-${avatar}.png`} alt="avatar" />
        </div>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <div className="header-inner dropdown-item text-center">
            <p className="name-user">{credentials.hoTen}</p>
            <p className="web-design">Website Designer</p>

            <div className="gender d-flex justify-content-between">
              <div className="male d-flex">
                <div className="input-inner">
                  <input type="radio" id="male" name="gender" value="male" />
                </div>

                <label className="lable" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="female d-flex">
                <div className="input-inner">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                  />
                </div>
                <label className="lable" htmlFor="female">
                  Female
                </label>
              </div>
            </div>
          </div>
          {this.props.categoriesUser.map((item, index) => (
            <span
              key={index}
              className="dropdown-item icon-inner"
              onClick={
                () =>
                  item.name !== "Logout"
                    ? this.showPopup(index)
                    : this.onLogoutUser() // arrow function
              }
            >
              {item.icon}
              <span className="text-icon">{item.name}</span>
            </span>
          ))}

          {/* <span className="dropdown-item icon-inner" onClick={this.showPopup}>
            <CgProfile className="user-icon" />
            <span className="text-icon">My Profile</span>
          </span>
          <span className="dropdown-item icon-inner">
            <BiArchive className="user-icon" />
            <span className="text-icon">My Course</span>
          </span>
          <span className="dropdown-item icon-inner">
            <GoMail className="user-icon" />
            <span className="text-icon">Messenger</span>
          </span>
          <span className="dropdown-item icon-inner">
            <SiHackhands className="user-icon" />
            <span className="text-icon">Applied</span>
          </span>
          <span className="dropdown-item icon-inner">
            <IoSettingsOutline className="user-icon" />
            <span className="text-icon">Setting</span>
          </span>
          <span className="dropdown-item icon-inner">
            <BsQuestionSquare className="user-icon" />
            <span className="text-icon">Help</span>
          </span>
          <span className="dropdown-item icon-inner" onClick={this.onLogout}>
            <IoIosLogOut className="user-icon" />
            <span className="text-icon">Logout</span>
          </span> */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    categoriesUser: state.user.categoriesUser,
    avatar: state.user.avatar,
  };
};
export default withRouter(connect(mapStateToProps, null)(OnUser));
