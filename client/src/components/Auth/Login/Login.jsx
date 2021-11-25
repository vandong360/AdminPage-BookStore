import React, { useState } from "react";
import "./Login.css";
import Button from "@mui/material/Button";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../../../store/slices/authSlice";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import AlertMessage from "../AlertMessage";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Khong duoc bo trong!"),
    password: Yup.string().required("Khong duoc bo trong!"),
  });

  //ham xu ly khi login
  const handleLogin = async (formValue) => {
    const { username, password } = formValue;
    setLoading(true)

    try {
      const data = await dispatch(login({ username, password }));
      if (data.payload.success) 
        history.push('/dashboard/products')
      else {
        setLoading(false)
        setAlert({ type: "danger", message: data.payload.message });
        setTimeout(() => setAlert(null), 2500);
      }
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Redirect to="/dashboard/products" />;
  }

  return (
    <div className="login-page">
      <div className="logo-box">
        <img src={process.env.PUBLIC_URL + "../../../logoWeb.png"} alt="" />
      </div>

      <div className="login-form">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <h2>Đăng Nhập</h2>
            <AlertMessage info={alert} />
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
              <label htmlFor="password">Password</label>
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
              <Button
                type="submit"
                className="btn-submit"
                variant="contained"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                Đăng Nhập
              </Button>

              <a href="/auth/admin/register">
                <Button className="btn-register" variant="outlined">
                  Đăng Ký
                </Button>
              </a>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
