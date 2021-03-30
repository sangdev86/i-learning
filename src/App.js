import "./Scss/main.scss";
import Courses from "./Screens/Courses";
import CourseDetail from "./Screens/CourseDetail";
import Signup from "./Screens/Signup";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Signin from "./Screens/Signin";
import { Component } from "react";
import { connect } from "react-redux";
import {
  FETCH_CARTS,
  FETCH_CREDENTIALS,
  FETCH_SIZE_SCREEN,
} from "./Redux/Actions/type";
import { createAction } from "./Redux/Actions";
import setHeaders from "./helpers/setHeaders";
import Home from "./Screens/Home";
import Blog from "./Screens/Blog";
import Event from "./Screens/Event";
import Jobs from "./Screens/Jobs";
import { fetchCoursesAsync } from "./Redux/Actions/course";
import { HomeTemplate } from "./Templates/HomeTemplate/HomeTemplate";
import { AdminTemplate } from "./Templates/AdminTemplate";
import CourseManager from "./Templates/AdminTemplate/CourseManager/CourseManager";
import userManager from "./Templates/AdminTemplate/UserManager/userManager";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resizeW: window.innerWidth,
    };
  }
  handleResizedScreen = () => {
    this.setState({
      resizeW: window.innerWidth,
    });
  };
  componentDidMount() {
    window.addEventListener("resize", this.handleResizedScreen);
    this._getLocalItem();
    //set theme
    document
      .getElementsByTagName("HTML")[0]
      .setAttribute("data-theme", localStorage.getItem("theme") || "one");
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResizedScreen);
  }

  handleChange = (color) => {
    switch (color) {
      case "one":
        this.setState({ color: "one" });
        localStorage.setItem("theme", "one");
        document
          .getElementsByTagName("HTML")[0]
          .setAttribute("data-theme", "one");

        break;
      case "two":
        this.setState({ color: "two" });
        localStorage.setItem("theme", "two");
        document
          .getElementsByTagName("HTML")[0]
          .setAttribute("data-theme", "two");

        break;
      default:
        break;
    }
  };
  handleChecklogin = () => {
    let credentialsStr = JSON.parse(localStorage.getItem("credentials"));
    let maLoaiNguoiDung;
    if (credentialsStr) {
      maLoaiNguoiDung = credentialsStr.maLoaiNguoiDung;
    } else {
      maLoaiNguoiDung = "";
    }
    return maLoaiNguoiDung;
  };

  render() {
    this.props.dispatch(createAction(FETCH_SIZE_SCREEN, this.state.resizeW));

    return (
      <BrowserRouter>
        <Switch>
          <HomeTemplate path="/signup" exact component={Signup} />
          <HomeTemplate path="/signin" exact component={Signin} />
          <HomeTemplate path="/" exact component={Home} />
          <HomeTemplate path="/courses" exact component={Courses} />
          <HomeTemplate
            path="/courseDetail/:courseId"
            exact
            component={CourseDetail}
          />
          <HomeTemplate path="/blog" exact component={Blog} />
          <HomeTemplate path="/event" exact component={Event} />
          <HomeTemplate path="/jobs" exact component={Jobs} />
          {this.handleChecklogin() === "GV" ? (
            <Switch>
              <AdminTemplate path="/admin" exact component={CourseManager} />
              <AdminTemplate
                path="/admin/courseManager"
                exact
                component={CourseManager}
              />
              <AdminTemplate
                path="/admin/userManager"
                exact
                component={userManager}
              />
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          ) : (
            <Route path="*">
              <Redirect to="/" />
            </Route>
          )}
        </Switch>
      </BrowserRouter>
    );
  }
  _getLocalItem = () => {
    const credentialsStr = localStorage.getItem("credentials");
    const carts = localStorage.getItem("carts");
    const token = localStorage.getItem("accessToken");
    if (credentialsStr) {
      this.props.dispatch(
        createAction(FETCH_CREDENTIALS, JSON.parse(credentialsStr))
      );
    }
    if (carts) {
      this.props.dispatch(createAction(FETCH_CARTS, JSON.parse(carts)));
    }
    this.props.dispatch(fetchCoursesAsync());

    if (!token) {
      return;
    } else {
      setHeaders(token);
    }
  };
}

export default connect()(App);
