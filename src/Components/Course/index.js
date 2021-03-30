import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { RiCloseCircleFill } from "react-icons/ri";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  AddCart,
  fetchCourseDetailAsync,
  unRegistrationAsync,
} from "../../Redux/Actions/course";
import { inCorrect2 } from "../../helpers/alert";

function Course({ course, hiddenBottom, displayDelbtn, dRes }) {
  const credentials = useSelector((state) => state.user.credentials);
  const dispatch = useDispatch();
  let { hinhAnh, tenKhoaHoc, maKhoaHoc, luotXem } = course;
  const handleAddCart = (credentials, maKhoaHoc, course) => {
    if (credentials === null) {
      inCorrect2("Please! Sign In");
    } else {
      dispatch(AddCart(credentials, maKhoaHoc, course));
    }
  };
  return (
    <div
      className={`course ${dRes ? dRes : "col-12 col-sm-6 col-md-4 col-xl-3"}`}
    >
      <div className="course-content">
        {displayDelbtn ? (
          <span
            className="unregistation"
            onClick={() =>
              dispatch(unRegistrationAsync(credentials, maKhoaHoc))
            }
          >
            <RiCloseCircleFill />
          </span>
        ) : (
          ""
        )}
        <Link
          to={`/courseDetail/${maKhoaHoc}`}
          className="course-top"
          onClick={() => dispatch(fetchCourseDetailAsync(maKhoaHoc))}
        >
          <div className="course-img">
            <img className="" src={hinhAnh} alt={tenKhoaHoc} />
          </div>

          <div className="content_box">
            <div className="course-name">{tenKhoaHoc}</div>
          </div>
        </Link>
        {!hiddenBottom ? (
          <div className="d-flex course-bot justify-content-between align-items-center">
            <div className="price">
              <span className="price-sale">
                $
                {luotXem >= "5000"
                  ? 12.99
                  : luotXem < "5000" && luotXem >= "4500"
                  ? 11.99
                  : luotXem < "4500" && luotXem >= "3000"
                  ? 10.99
                  : luotXem < "3000" && luotXem >= "2000"
                  ? 9.99
                  : luotXem < "2000" && luotXem >= "100"
                  ? 8.99
                  : 0}
              </span>
              <p className="price-origin">$129.99</p>
            </div>
            <div className="star">
              <span className="number-rating">
                {luotXem >= "5000"
                  ? 4.9
                  : luotXem < "5000" && luotXem >= "4500"
                  ? 4.8
                  : luotXem < "4500" && luotXem >= "3000"
                  ? 4.7
                  : luotXem < "3000" && luotXem >= "2000"
                  ? 4.6
                  : luotXem < "2000" && luotXem >= "100"
                  ? 4.5
                  : 4.4}
              </span>
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarHalf />
            </div>
            <div
              className="add-cart"
              onClick={() => handleAddCart(credentials, maKhoaHoc, course)}
            >
              <Button
                name={"Add"}
                padding={"5px"}
                margin={"2px"}
                fontSize={"13px"}
                borderRadius={"3px"}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Course;
