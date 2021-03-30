import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { logoutAsync } from "../../../Redux/Actions/user";
import AdminSidebar from "../AdminSidebar/AdminSidebar";

export default function AdminHeader() {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = () => {
    dispatch(logoutAsync());
    setTimeout(() => {
      history.push("/");
      history.go("/");
    }, 500);
  };
  return (
    <div className="admin-header d-flex justify-content-between bg-dark text-white font-weight-bold display-5">
      <div className="logo p-3 cursor-pointer d-flex align-items-center">
        <span className="pl-4" style={{ fontSize: "1.25rem" }}>
          I-Learning
        </span>
      </div>

      <div className="status d-flex justify-content-between align-items-center cursor-pointer">
        <NavLink to="/" className="p-3 text-white ">
          Home
        </NavLink>

        <div className="p-3 mr-4 text-white " onClick={() => onLogout()}>
          Log Out
        </div>
        <span>
          <AdminSidebar />
        </span>
      </div>
    </div>
  );
}
