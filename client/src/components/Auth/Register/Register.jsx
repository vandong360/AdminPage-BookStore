import React, { useState } from "react";
import "./Register.css";
import Button from "@mui/material/Button";

import { useHistory, Redirect } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../../store/slices/authSlice";
import AlertMessage from "../AlertMessage";

const Register = () => {
  const [successful, setSuccessful] = useState(false);
  const [alert, setAlert] = useState(null);

  const initialValues = {
    username: "",
    password: "",
  };

  const { isAuthenticated } = useSelector((state) => state.auth)
  // const { message } = useSelector((state) => state.message)

  const dispatch = useDispatch()
  const history = useHistory()

  //xu ly validation
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "Độ dài username từ 3-20 kí tự",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("Không được bỏ trống!"),
    password: Yup.string()
      .test(
        "len",
        "Mật khẩu từ 6-20 kí tự",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 20
      )
      .required("Không được bỏ trống!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords phải giống nhau")
      .required("Không được bỏ trống!"),
  });

  //xu ly register
  const handleRegister = async (formValue) => {
    const { username, password } = formValue;

    setSuccessful(false);

    try {
      const response = await dispatch(register({ username, password }));
      if (response.payload.success) {
        setSuccessful(true);
        history.push("/dashboard/product");
      } else {
        setSuccessful(false)
        setAlert({ type: "danger", message: response.payload.message });
        setTimeout(() => setAlert(null), 2500);
      };

    } catch (error) {
      console.log(error);
      setSuccessful(false);
    }
  };

  if (isAuthenticated)
    return <Redirect to="/dashboard/product" />

  return (
    <div className="login-page">
      <div className="left-block">
        <div className="logo-box">
          <img src={process.env.PUBLIC_URL + "../../../logoWeb.png"} alt="" />
        </div>
      </div>

      <div className="right-block">
        <div className="register-form">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            <Form>
              <h2>Đăng Ký</h2>
              <AlertMessage info={alert} />
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Field
                      name="username"
                      type="text"
                      className="form-control input"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control input"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Nhập lại mật khẩu</label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className="form-control input"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <Button
                      type="submit"
                      className="btn-submit"
                      variant="contained"
                    >
                      Đăng Ký
                    </Button>
                    <a href="/auth/admin/login">
                      <Button className="btn-register" variant="outlined">
                        Đăng Nhập
                      </Button>
                    </a>
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
