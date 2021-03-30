import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiCloseCircleFill } from "react-icons/ri";
import { createAction } from "../../Redux/Actions";
import {
  INFO_USER,
  SHOW_POPUP,
  DISABLE_ON_OFF,
  AVATAR_LIST,
} from "../../Redux/Actions/type";
import Profile from "./Profile/Profile";
import CourseUser from "./CourseUser/CourseUser";

const AllInfomation = () => {
  const dispatch = useDispatch();
  const categoriesUser = useSelector((state) => state.user.categoriesUser);
  const AllInfo = useSelector((state) => state.user.AllInfo);
  return (
    <div className="all-info">
      <div className="header-info">
        <div
          className="btn-close"
          onClick={() => (
            // eslint-disable-next-line no-sequences
            dispatch(createAction(SHOW_POPUP, -1)),
            dispatch(createAction(DISABLE_ON_OFF, true)),
            dispatch(createAction(INFO_USER, true)),
            dispatch(createAction(AVATAR_LIST, false))
          )}
        >
          <RiCloseCircleFill />
        </div>
      </div>
      <div className="body-info row">
        <div className="body-left col-3 col-sm-4 col-md-3 col-lg-2">
          {categoriesUser.map((item, index) => (
            <div
              key={index}
              className={`dropdown-item icon-inner ${
                AllInfo === index ? "activeCategoriesUser" : ""
              }`}
              onClick={() => dispatch(createAction(SHOW_POPUP, index))}
            >
              <span className="user-icon ">{item.icon}</span>
              <span className="text-icon">{item.name}</span>
            </div>
          ))}
        </div>
        <div className="body-right col-9 col-sm-8 col-md-9 col-lg-10 row">
          {(() => {
            switch (AllInfo) {
              case 0:
                return <Profile />;
              case 1:
                return <CourseUser />;
              default:
                return (
                  <div className="set-item-inner ">
                    <h4 className="set-item-text">
                      Oops ... We'll
                      <span className="text-danger text-red">
                        {" "}
                        Update later
                      </span>
                      !
                    </h4>
                  </div>
                );
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default AllInfomation;
