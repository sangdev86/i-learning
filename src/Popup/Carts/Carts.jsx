import React from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Components/Button";
import { createAction } from "../../Redux/Actions";
import {
  CART_ON_OFF,
  CHOOSE_CARTS_ITEM,
  FETCH_CARTS,
  NOT_CHOOSE_CARTS_ITEM,
  REMOVE_CARTS,
  SET_CHOOSE_CART_ITEM,
  SHOW_POPUP,
} from "../../Redux/Actions/type";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  fetchCourseDetailAsync,
  addRegistrationCoursesAsync,
} from "../../Redux/Actions/course";
import { correct } from "../../helpers/alert";

export default function Carts() {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.course.carts);
  const total = useSelector((state) => state.course.total);
  const listCartsChoose = useSelector((state) => state.course.listCartsChoose);
  const credentials = useSelector((state) => state.user.credentials);

  const CartsOFF = () => {
    dispatch(createAction(CART_ON_OFF, false));
    dispatch(createAction(SET_CHOOSE_CART_ITEM, [0, []]));
  };
  const money = (luotXem) => {
    var pay = 0;
    if (luotXem >= "5000") {
      pay = 12.99;
      return pay;
    } else if (luotXem >= "4500") {
      pay = 11.99;
      return pay;
    } else if (luotXem >= "3000") {
      pay = 10.99;
      return pay;
    } else if (luotXem >= "2000") {
      pay = 9.99;
      return pay;
    } else if (luotXem >= "100") {
      pay = 8.99;
      return pay;
    } else {
      // pay = 0.99;
      return pay;
    }
  };
  const renderFetchCourseDetail = (id) => {
    dispatch(createAction(CART_ON_OFF, false));
    dispatch(fetchCourseDetailAsync(id));
  };
  const removeCart = (pay, item) => {
    dispatch(createAction(REMOVE_CARTS, item));
    dispatch(createAction(NOT_CHOOSE_CARTS_ITEM, [pay, item]));
  };

  const chooseCartItem = (pay, e, item) => {
    if (e.target.checked) {
      dispatch(createAction(CHOOSE_CARTS_ITEM, [pay, item]));
    } else {
      dispatch(createAction(NOT_CHOOSE_CARTS_ITEM, [pay, item]));
    }
  };

  const checkedFix = (maKhoaHoc) => {
    let index = listCartsChoose.findIndex(
      (item) => item.maKhoaHoc === maKhoaHoc
    );
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  };
  const registrationCourses = () => {
    dispatch(addRegistrationCoursesAsync(credentials, listCartsChoose));
  };
  const clearAllCarts = () => {
    dispatch(createAction(SET_CHOOSE_CART_ITEM, [0, []]));
    dispatch(createAction(FETCH_CARTS, []));
    correct("Clear All", "Success");
  };
  const goToMyCourses = () => {
    dispatch(createAction(CART_ON_OFF, false));
    dispatch(createAction(SHOW_POPUP, 1));
  };
  const renderShopCarts = () => {
    return carts.map((item, index) => {
      let { tenKhoaHoc, hinhAnh, luotXem, maKhoaHoc } = item;
      let pay = money(luotXem);
      return (
        <tr key={index} className="cart-item">
          <td>{index + 1}</td>
          <td>
            <Link
              to={`/courseDetail/${maKhoaHoc}`}
              className="row course-cart"
              onClick={() => renderFetchCourseDetail(maKhoaHoc)}
            >
              <div className="course-img col-md-4">
                <img className="img-fluid" src={hinhAnh} alt="course" />
              </div>
              <div className="col-md-8 d-flex align-items-center">
                <span className="course-name ">{tenKhoaHoc}</span>
              </div>
            </Link>
          </td>
          <td>
            <span className="price-sale">
              $ {pay}
              {/* {luotXem >= "5000"
                ? 12.99
                : luotXem < "5000" && luotXem >= "4500"
                ? 11.99
                : luotXem < "4500" && luotXem >= "3000"
                ? 10.99
                : luotXem < "3000" && luotXem >= "2000"
                ? 9.99
                : luotXem < "2000" && luotXem >= "100"
                ? 8.99
                : 0} */}
            </span>
          </td>
          <td>
            <div className="status-cart row">
              <div
                className="col-md-6 delete-cart"
                onClick={() => removeCart(pay, item)}
              >
                <MdDeleteForever />
              </div>
              <div className=" col-md-6  d-flex align-items-center">
                <input
                  className="checkbox"
                  type="checkbox"
                  name={maKhoaHoc}
                  checked={checkedFix(maKhoaHoc)}
                  onChange={(e) => chooseCartItem(pay, e, item)}
                />
              </div>
            </div>
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="all-info carts">
      <div className="header-info">
        <div className="btn-close" onClick={CartsOFF}>
          <RiCloseCircleFill />
        </div>
      </div>
      <div className="carts-body row">
        <div className="col-12 col-xl-9">
          <table className="table table-striped ">
            <thead>
              <tr>
                <th></th>
                <th>Courses</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="">
              {renderShopCarts()}
              {/* {carts.map((item, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.tenKhoaHoc}</td>
                  </tr>
                );
              })} */}
            </tbody>
          </table>
        </div>
        <div className="col-xl-3 col-12 d-flex  align-items-center flex-nowrap ">
          <div className="carts-pay">
            <h5 className="title-carts text-center">I-LEARNING CARTS</h5>
            <div className="d-flex justify-content-between">
              <span className="quantify">Quantify</span>
              <span className="length-choose font-weight-bold">
                {listCartsChoose.length}
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="total">Total</span>
              <span className="total-pay font-weight-bold">$ {total}</span>
            </div>
            <div className="row">
              <div
                onClick={() => registrationCourses()}
                className="col-6 col-sm-12"
              >
                <Button
                  name={"REGISTRATION"}
                  padding={"5px"}
                  margin={"8px 5px"}
                  fontSize={"12px"}
                  borderRadius={"3px"}
                />
              </div>
              <div
                onClick={() =>
                  dispatch(createAction(SET_CHOOSE_CART_ITEM, [0, []]))
                }
                className="col-6 col-sm-12"
              >
                <Button
                  name={"CLEAR CHOOSE"}
                  padding={"5px"}
                  margin={"8px 5px"}
                  fontSize={"12px"}
                  borderRadius={"3px"}
                />
              </div>
              <div onClick={() => clearAllCarts()} className="col-6 col-sm-12">
                <Button
                  name={"CLEAR CARTS"}
                  padding={"5px"}
                  margin={"8px 5px"}
                  fontSize={"12px"}
                  borderRadius={"3px"}
                />
              </div>
              <div onClick={() => goToMyCourses()} className="col-6 col-sm-12">
                <Button
                  name={"MY COURSES"}
                  padding={"5px"}
                  margin={"8px 5px"}
                  fontSize={"12px"}
                  borderRadius={"3px"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
