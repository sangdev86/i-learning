import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { userService } from "../../Services";
import { signupUserSchema } from "../../Services/user";

class Signup extends Component {
  _handleSubmit = (values) => {
    userService
      .signUpAxios(values)
      .then((res) => {
        // console.log(res);
        setTimeout(() => {
          this.props.history.replace("/signin");
        }, 1500);
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div className="w-50 mx-auto" style={{ marginTop: "140px" }}>
        <h1 className="sign-in  text-center">Sign Up</h1>
        <Formik
          initialValues={{
            taiKhoan: "",
            matKhau: "",
            hoTen: "",
            email: "",
            soDT: "",
            maNhom: "GP16",
          }}
          validationSchema={signupUserSchema}
          onSubmit={this._handleSubmit}
          render={(formikProps) => (
            <Form>
              <div className="form-group">
                <label>Account:</label>
                <Field
                  type="text"
                  className="form-control"
                  name="taiKhoan"
                  onChange={formikProps.handleChange}
                />
                <ErrorMessage name="taiKhoan">
                  {(msg) => <div className="alert alert-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-group">
                <label>Password: </label>
                <Field
                  type="password"
                  className="form-control"
                  name="matKhau"
                  onChange={formikProps.handleChange}
                />
                <ErrorMessage name="matKhau">
                  {(msg) => <div className="alert alert-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-group">
                <label>Full Name: </label>
                <Field
                  type="text"
                  className="form-control"
                  name="hoTen"
                  onChange={formikProps.handleChange}
                />
                {formikProps.errors.hoTen ? (
                  <ErrorMessage name="hoTen">
                    {(msg) => <div className="alert alert-danger">{msg}</div>}
                  </ErrorMessage>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
                <label>Email: </label>
                <Field
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={formikProps.handleChange}
                />
                <ErrorMessage name="email">
                  {(msg) => <div className="alert alert-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-group">
                <label>Phone: </label>
                <Field
                  type="text"
                  className="form-control"
                  name="soDT"
                  onChange={formikProps.handleChange}
                />
                <ErrorMessage name="soDT">
                  {(msg) => <div className="alert alert-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-group">
                <label>Code: </label>
                <Field
                  className="form-control"
                  component="select"
                  name="maNhom"
                  onChange={formikProps.handleChange}
                >
                  <option>GP01</option>
                  <option>GP02</option>
                  <option>GP03</option>
                  <option>GP04</option>
                  <option>GP05</option>
                  <option>GP06</option>
                  <option>GP07</option>
                  <option>GP08</option>
                  <option>GP09</option>
                  <option>GP10</option>
                  <option>GP11</option>
                  <option>GP12</option>
                  <option>GP13</option>
                  <option>GP14</option>
                  <option>GP15</option>
                  <option>GP16</option>
                </Field>
              </div>
              <div className="text-center">
                <button className="btn btn-success" type="submit">
                  Sign Up
                </button>
              </div>
            </Form>
          )}
        />
      </div>
    );
  }
}
export default Signup;
