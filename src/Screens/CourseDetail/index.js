import React, { Component } from "react";
import { connect } from "react-redux";
import { price } from "../../helpers/price";
import { rating } from "../../helpers/rating";
import { AddCart, fetchCourseDetailAsync } from "../../Redux/Actions/course";
import { IoMdPlayCircle } from "react-icons/io";
import { IoEarthSharp } from "react-icons/io5";
import {
  BsStarFill,
  BsStarHalf,
  BsFillExclamationCircleFill,
} from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import Button from "../../Components/Button";
import ButtonTransparent from "../../Components/ButtonTransparent";
import { inCorrect2 } from "../../helpers/alert";

class CourseDetail extends Component {
  render() {
    let {
      tenKhoaHoc,
      moTa,
      hinhAnh,
      luotXem,
      ngayTao,
      maKhoaHoc,
    } = this.props.courseDetail;

    let handleAddCart = (credentials, maKhoaHoc, course) => {
      if (credentials === null) {
        inCorrect2("Please! Sign In");
      } else {
        this.props.dispatch(AddCart(credentials, maKhoaHoc, course));
      }
    };
    return (
      <div className="course-detail">
        <div className="course-detail-left">
          <div className="course-detail-header">
            <div className="row">
              <div className="header-inner ">
                <div className="col-12 inner">
                  {this.props.rWith < 992 ? (
                    <div className="img-course-detail">
                      <img
                        className="img"
                        src={hinhAnh}
                        alt="hinhAnh"
                        width={"100%"}
                      />
                      <div className="over-play">
                        <div className="play-icon">
                          <IoMdPlayCircle />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <h3 className="course-detail-name"> {tenKhoaHoc} </h3>
                  <span className="course-detail-text">{moTa}</span>
                  <br />
                  <div className="d-flex">
                    <p className="bestseller">Bestseller</p>
                    <p className="star">
                      <span className="number-rating ">{rating(luotXem)}</span>
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarHalf />
                    </p>
                  </div>
                  <span className="created-course-detail">
                    Created by <span className="name-created">Admin</span>
                  </span>
                  <br />
                  <span className="last-update form">
                    <span className="icon">
                      <BsFillExclamationCircleFill />
                    </span>
                    <span className="text">Last Update {ngayTao}</span>
                  </span>
                  <br />
                  <span className="language form">
                    <span className="icon">
                      <IoEarthSharp />
                    </span>
                    <span className="text">Vietnamese</span>
                  </span>
                </div>
                <div className="col-12 course-detail-left inner">
                  {this.props.rWith < 992 ? (
                    <>
                      <div className="price">
                        ${price(luotXem)}
                        <span className="price-original"> $129</span>
                      </div>
                      <div
                        className="add-cart"
                        onClick={() =>
                          this.props.dispatch(() =>
                            handleAddCart(
                              this.props.credentials,
                              maKhoaHoc,
                              this.props.courseDetail
                            )
                          )
                        }
                      >
                        <Button
                          name={"Add Card"}
                          padding={"5px"}
                          margin={"0px"}
                          fontSize={"16px"}
                          borderRadius={"3px"}
                        />
                      </div>
                      <p className="days-30 text-center">
                        30-Day Money-Back Guarantee
                      </p>
                    </>
                  ) : (
                    ""
                  )}

                  <div className="status-course-detail row">
                    <div className="col-6 col-lg-3 item-left">
                      <ButtonTransparent
                        name={"WishList"}
                        padding={"5px 0"}
                        fontSize={"16px"}
                        color={"white"}
                        border={"1.5px solid white"}
                        borderRadius={"3px"}
                      />
                    </div>
                    <div className="col-6 col-lg-3 item-right">
                      <ButtonTransparent
                        name={"Share"}
                        padding={"5px 0"}
                        fontSize={"16px"}
                        color={"white"}
                        border={"1.5px solid white"}
                        borderRadius={"3px"}
                      />
                    </div>
                    <div className="col-6 col-lg-3 item-left">
                      <ButtonTransparent
                        name={"Git"}
                        padding={"5px 0"}
                        fontSize={"16px"}
                        color={"white"}
                        border={"1.5px solid white"}
                        borderRadius={"3px"}
                      />
                    </div>
                    <div className="col-6 col-lg-3 item-right">
                      <ButtonTransparent
                        name={"Coupon"}
                        padding={"5px 0"}
                        fontSize={"16px"}
                        color={"white"}
                        border={"1.5px solid white"}
                        borderRadius={"3px"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="course-detail-body">
            <div className="what-learn inner">
              <div className="what-learn-inner">
                <h5 className="title">What you'll learn</h5>
                <ul className="row">
                  <li className="col-6">
                    <span className="icon">
                      <TiTick />
                    </span>
                    <span className="text">Full-stack JavaScript</span>
                  </li>
                  <li className="col-6">
                    <span className="icon">
                      <TiTick />
                    </span>
                    <span className="text">ReactJS</span>
                  </li>

                  <li className="col-6">
                    <span className="icon">
                      <TiTick />
                    </span>
                    <span className="text">Redux</span>
                  </li>
                  <li className="col-6">
                    <span className="icon">
                      <TiTick />
                    </span>
                    <span className="text">Node JS</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="requirements inner">
              <h5 className="title">Requirements</h5>
              <ul>
                <li>A basic understanding of HTML, CSS and JavaScript.</li>
              </ul>
            </div>
            <div className="description inner">
              <h5 className="title">Description</h5>
              <p>
                If you would like to master JavaScript and get started as a
                full-stack web developer, you are going to LOVE this course!
                Learn full-stack JavaScript development working on coding
                projects using ReactJS, NodeJS, LoopbackJS, Redux, Material-UI
                and socket programming.
              </p>
              <ul>
                <p>
                  <b>
                    We will work on the following 3 coding projects in this
                    course:
                  </b>
                </p>
                <li>
                  <b>Calculator Application</b> - We will go over the basics of
                  what React is, how to create components and how to work within
                  the React life-cycle.
                </li>
                <li>
                  <b>Weblog</b> - We will build a feature rich blog app using
                  React and LoopbackJS. We will begin to explore the full-stack
                  elements of JavaScript by coding our own REST API, and how the
                  front and back-end can communicate with each other.
                </li>
                <li>
                  <b>Chat Application </b>- We will explore socket programming.
                  With a web socket you can keep clients connected on the server
                  side. We will program a chat app where you can create a user
                  account, add other users and then message back and forth with
                  them.
                </li>
              </ul>
            </div>
            <div className="who inner">
              <h5 className="title">Who this course is for:</h5>
              <ul>
                <li>
                  Web development students interested in mastering JavaScript..
                </li>
              </ul>
            </div>
          </div>
        </div>

        {this.props.rWith >= 992 ? (
          <div className="course-detail-right">
            <div className="right-inner">
              <div className="course-border">
                <div className="img-course-detail">
                  <img
                    className="img"
                    src={hinhAnh}
                    alt="hinhAnh"
                    width={"100%"}
                  />
                  <div className="over-play">
                    <div className="play-icon">
                      <IoMdPlayCircle />
                    </div>
                  </div>
                </div>
                <div className="price">
                  ${price(luotXem)}
                  <span className="price-original"> $129</span>
                </div>
                <div
                  className="add-cart"
                  onClick={() =>
                    this.props.dispatch(() =>
                      handleAddCart(
                        this.props.credentials,
                        maKhoaHoc,
                        this.props.courseDetail
                      )
                    )
                  }
                >
                  <Button
                    name={"ADD CART"}
                    padding={"5px"}
                    margin={"0px"}
                    fontSize={"16px"}
                    borderRadius={"3px"}
                  />
                </div>
                <p className="days-30 text-center">
                  30-Day Money-Back Guarantee
                </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  componentDidMount() {
    this.props.dispatch(
      fetchCourseDetailAsync(this.props.match.params.courseId)
    );
  }
}
const mapStateToProps = (state) => ({
  courseDetail: state.course.courseDetail || {
    maKhoaHoc: "",
    tenKhoaHoc: "",
    hinhAnh: "",
    nguoiTao: {
      taikhoan: "",
      hoTen: "",
    },
  },
  rWith: state.myResponsive.rWith,
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, null)(CourseDetail);
