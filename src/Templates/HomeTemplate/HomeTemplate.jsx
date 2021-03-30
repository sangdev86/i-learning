import React, { Fragment } from "react";
import { Route } from "react-router";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";

export function HomeTemplate(props) {
  return (
    <Route
      path={props.path}
      {...props.exact}
      render={(component) => {
        return (
          <Fragment>
            <Header />
            <props.component {...component} />
            <Footer />
          </Fragment>
        );
      }}
    />
  );
}
