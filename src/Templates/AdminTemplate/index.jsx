import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router";
import AdminHeader from "./AdminHeader/AdminHeader";

export function AdminTemplate(props) {
  const admin = useSelector((state) => state.myResponsive.sidebarAdmin);
  return (
    <Route
      path={props.path}
      {...props.exact}
      render={(component) => {
        return (
          <Fragment>
            <AdminHeader />
            <div className={` ${admin ? "margin-admin" : "container-fluid"}`}>
              <props.component {...component} />
            </div>
          </Fragment>
        );
      }}
    />
  );
}
