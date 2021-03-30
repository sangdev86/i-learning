import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import OnUser from "../../auth/OnUser";
import { ObjectActive } from "../../helpers/activeCss";
import SearchBar from "../SearchBar";
import AllInfomation from "../../Popup/AllInfomation";
import AddCart from "../AddCart/AddCart";
import Carts from "../../Popup/Carts/Carts";
import { createAction } from "../../Redux/Actions";
import { CART_ON_OFF, SET_THEME } from "../../Redux/Actions/type";
import UserSidebar from "../UserSidebar/UserSidebar";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // color:
      //   localStorage.getItem("theme") === null
      //     ? "one"
      //     : localStorage.getItem("theme"),
      colors: ["one", "two", "three", "four", "five", "six"],
      keywords: "",
    };
  }
  // componentDidMount() {
  //   document
  //     .getElementsByTagName("HTML")[0]
  //     .setAttribute("data-theme", localStorage.getItem("theme") || "one");
  // }

  handleChange = (color) => {
    // switch (color) {
    //   case "one":
    //     this.setState({ color: "one" });
    //     localStorage.setItem("theme", "one");
    //     document
    //       .getElementsByTagName("HTML")[0]
    //       .setAttribute("data-theme", "one");

    //     break;
    //   case "two":
    //     this.setState({ color: "two" });
    //     localStorage.setItem("theme", "two");
    //     document
    //       .getElementsByTagName("HTML")[0]
    //       .setAttribute("data-theme", "two");

    //     break;
    //   default:
    //     break;
    // }
    this.props.dispatch(createAction(SET_THEME, color));
  };

  render() {
    const { credentials, AllInfo, cartsONOFF, carts, rWith } = this.props;
    var setColor = this.state.colors.map((color, index) => {
      return (
        <div key={index}>
          <span
            key={index}
            className={`theme-${index + 1} set-color-list ${
              this.state.color === color ? "active-Color" : ""
            }`}
            onClick={() => this.handleChange(color)}
          ></span>
          <br />
        </div>
      );
    });

    return (
      <nav
        className={`header fixed-top d-flex pt-3 pb-2  justify-content-between ${
          this.props.location.pathname === "/event" ? "bg-trans" : ""
        }`}
      >
        <div
          className="logo mr-lg-3 ml-lg-2 ml-5 cursor-pointer"
          onClick={() => this.props.history.replace("/admin")}
        >
          I-Learning
        </div>
        {rWith > 992 ? (
          <>
            <div>
              <SearchBar />
            </div>
            <ul className="d-flex mr-auto ml-4">
              <li>
                <NavLink
                  to="/"
                  exact
                  activeStyle={ObjectActive}
                  className="nav-link"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/courses`}
                  activeStyle={ObjectActive}
                  className="nav-link"
                >
                  Courses <span className="sr-only"></span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  exact
                  activeStyle={ObjectActive}
                  className="nav-link"
                >
                  Blog<span className="sr-only"></span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/event"
                  exact
                  activeStyle={ObjectActive}
                  className="nav-link"
                >
                  Event<span className="sr-only"></span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/jobs"
                  exact
                  activeStyle={ObjectActive}
                  className="nav-link"
                >
                  Jobs
                </NavLink>
              </li>
            </ul>
          </>
        ) : (
          <UserSidebar />
        )}

        <div className="mr-3 d-flex">
          {this.props.credentials ? (
            <ul className="nav-user">
              <li
                onClick={() =>
                  this.props.dispatch(createAction(CART_ON_OFF, true))
                }
                className="my-carts"
              >
                <AddCart />
                <span className="length-cart">
                  {carts.length ? carts.length : ""}
                </span>
              </li>
              {cartsONOFF ? (
                <li className="pop-up">
                  <Carts />
                </li>
              ) : (
                ""
              )}
            </ul>
          ) : (
            ""
          )}

          {this.props.credentials ? (
            <OnUser credentials={credentials} />
          ) : (
            <ul className="d-flex align-self-center">
              <li className="active">
                <NavLink
                  to="/signup"
                  exact
                  activeStyle={{ color: "red" }}
                  className="nav-link sign"
                >
                  SignUp <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item active">
                <NavLink
                  to="/signin"
                  exact
                  activeStyle={{ color: "red" }}
                  className="nav-link sign"
                >
                  SignIn <span className="sr-only"></span>
                </NavLink>
              </li>
            </ul>
          )}

          <div className="set-colors dropdown d-flex align-items-center">
            <span data-toggle="dropdown"></span>
            <div className="dropdown-menu set-color-dropdown">{setColor}</div>
          </div>
          {AllInfo > -1 ? (
            <div className="pop-up">
              <AllInfomation credentials={credentials} />
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
    AllInfo: state.user.AllInfo,
    cartsONOFF: state.course.cartsONOFF,
    carts: state.course.carts,
    rWith: state.myResponsive.rWith,
  };
};
export default withRouter(connect(mapStateToProps, null)(Header));
