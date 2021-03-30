import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createAction } from "../../../Redux/Actions";
import {
  INFO_USER,
  DISABLE_ON_OFF,
  AVATAR_LIST,
} from "../../../Redux/Actions/type";
import { AiFillCheckCircle, AiFillCloseSquare } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RiToggleLine, RiToggleFill } from "react-icons/ri";
import { comfirmUserAsync, updateUserAsync } from "../../../Redux/Actions/user";
import { updateInfoUserSchema } from "../../../Services/user";
import { groupId } from "../../../api";
import Avatar from "../../../Components/Avatar";

const Profile = () => {
  const [id, setId] = useState(
    localStorage.getItem("avatar") ? localStorage.getItem("avatar") : 0
  );
  const dispatch = useDispatch();
  const credentials = useSelector((state) => state.user.credentials);
  const infoUser = useSelector((state) => state.user.infoUser);
  const disabled = useSelector((state) => state.user.disabled);
  const avatarList = useSelector((state) => state.user.avatarList);
  const renderAvatar = () => {
    dispatch(createAction(AVATAR_LIST, !avatarList));
  };
  const chooseAvatar = (index) => {
    setId(index);
  };
  return (
    <>
      <div className="avatar-user text-center col-12 col-md-3">
        {disabled ? (
          <div className="text-center">
            <img src={`./img/Avatar/User-${id}.png`} alt="avatar" />
          </div>
        ) : (
          <div className="avatar-img text-center" onClick={renderAvatar}>
            <img src={`./img/Avatar/User-${id}.png`} alt="avatar" />
            <span>
              <BsPencilSquare />
            </span>
          </div>
        )}

        <span className="name-user">{credentials.hoTen}</span>
        {avatarList ? <Avatar chooseAvatar={chooseAvatar} /> : ""}
      </div>
      <div className="info-user col-12 col-md-9 d-flex flex-column">
        {infoUser ? (
          <>
            {disabled ? (
              <div className="change-inner">
                <span
                  className="icon-change icon-change-off"
                  onClick={() => dispatch(createAction(INFO_USER, false))}
                >
                  <RiToggleLine />
                </span>
                <span className="change-off">Change</span>
              </div>
            ) : (
              <div className="change-inner">
                <span
                  className="icon-change icon-change-on"
                  onClick={() => dispatch(createAction(DISABLE_ON_OFF, true))}
                >
                  <RiToggleFill />
                </span>
                <span className="change-on">Changing</span>
              </div>
            )}
            <Formik
              validationSchema={updateInfoUserSchema}
              initialValues={{
                taiKhoan: credentials.taiKhoan,
                matKhau: "",
                soDT: credentials.soDT || credentials.soDt,
                hoTen: credentials.hoTen,
                email: credentials.email,
                maLoaiNguoiDung: credentials.maLoaiNguoiDung,
                maNhom: groupId,
              }}
              onSubmit={(values) => {
                // console.log(values);
                delete values.passwordConfirmation;
                dispatch(updateUserAsync(values));
                dispatch(createAction(AVATAR_LIST, false));
              }}
              component={(formikProps) => (
                <Form className="w-70 ">
                  <label>Full Name :</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="hoTen"
                    autoComplete="hoTen"
                    disabled={disabled}
                    onChange={formikProps.handleChange}
                  />
                  {/* <label>Account :</label>
                      <Field
                        className="form-control"
                        type="text"
                        name="taiKhoan"
                        autoComplete="taiKhoan"
                        disabled={disabled}
                        onChange={formikProps.handleChange}
                        value={credentials.taiKhoan}
                      /> */}
                  <label>New Password :</label>
                  <Field
                    className="form-control"
                    type="password"
                    name="matKhau"
                    autoComplete="new-password"
                    onChange={formikProps.handleChange}
                    disabled={disabled}
                  />
                  <ErrorMessage name="matKhau">
                    {(msg) => <div className="text-danger">{msg}</div>}
                  </ErrorMessage>
                  <label>Confirm new password :</label>
                  <Field
                    className="form-control"
                    type="password"
                    name="passwordConfirmation"
                    autoComplete="confirm-new-password"
                    disabled={disabled}
                    onChange={formikProps.handleChange}
                  />
                  <ErrorMessage name="passwordConfirmation">
                    {(msg) => <div className="text-danger">{msg}</div>}
                  </ErrorMessage>

                  <label>Phone number:</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="soDT"
                    disabled={disabled}
                    onChange={formikProps.handleChange}
                  />
                  <ErrorMessage name="soDT">
                    {(msg) => <div className="text-danger">{msg}</div>}
                  </ErrorMessage>
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={disabled}
                  >
                    Update
                  </button>
                </Form>
              )}
            />
          </>
        ) : (
          <div>
            <span className="changinging-info">
              Do you want to change infomation?
            </span>
            <br />
            <Formik
              initialValues={{
                taiKhoan: credentials.taiKhoan,
                matKhau: "",
              }}
              onSubmit={(values) => {
                dispatch(comfirmUserAsync(values));
              }}
              component={(formikProps) => (
                <Form className="w-70 ">
                  <label>Account:</label>
                  <Field
                    type="text"
                    className="form-control"
                    autoComplete="taiKhoan"
                    value={credentials.taiKhoan}
                    onChange={formikProps.handleChange}
                  />

                  <label>Password:</label>
                  <Field
                    type="password"
                    className="form-control"
                    name="matKhau"
                    autoComplete="current-password"
                    onChange={formikProps.handleChange}
                  />
                  <button className="icon-tick btn" type="submit">
                    <AiFillCheckCircle />
                  </button>
                  <button
                    className="icon-tick btn"
                    onClick={() => dispatch(createAction(INFO_USER, true))}
                  >
                    <AiFillCloseSquare />
                  </button>
                </Form>
              )}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
