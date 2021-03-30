import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { loginAsync } from "../../Redux/Actions/user";
import { connect } from "react-redux";

class Signin extends Component {
  // _handleSubmit = (values) => {
  //   userService
  //     .signInAxios(values)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };
  render() {
    return (
      <div style={{ margin: "140px 0" }}>
        <h1 className=" sign-in text-center">Sign In</h1>
        <Formik
          initialValues={{
            taiKhoan: "",
            matKhau: "",
          }}
          onSubmit={(values) => {
            this.props.dispatch(
              loginAsync(values, () => {
                this.props.history.replace("/");
              })
            );
          }}
          render={({ handleChange }) => (
            <Form className="w-50 mx-auto ">
              <div className="form-group">
                <label>Account:</label>
                <Field
                  type="text"
                  className="form-control"
                  name="taiKhoan"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <Field
                  type="password"
                  className="form-control"
                  name="matKhau"
                  onChange={handleChange}
                />
              </div>
              <div className="text-center">
                <button className="btn btn-success" type="submit">
                  Submit
                </button>
              </div>
            </Form>
          )}
        />
      </div>
    );
  }
}

export default connect()(Signin);
