// import React, { useState, useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Login from "./components/Auth/Login/Login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  // Link,
  // NavLink,
} from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/dashboard/product" />
        </Route>
        <Route
          path="/auth/admin/login"
          exact
          component={(props) => <Auth {...props} authRoute="login" />}
        />
        <Route
          path="/auth/admin/register"
          exact
          component={(props) => <Auth {...props} authRoute="register" />}
        />
        <Route
          path="/dashboard/product"
          exact
          component={(props) => <Dashboard {...props} direcRoute="product" />}
        />

        <Route
          path="/dashboard/product/giao-khoa"
          exact
          component={(props) => (
            <Dashboard {...props} direcRoute="product/giao-khoa" />
          )}
        />
        <Route
          path="/dashboard/product/van-hoc"
          exact
          component={(props) => (
            <Dashboard {...props} direcRoute="product/van-hoc" />
          )}
        />

        <Route
          path="/dashboard/product/kinh-te"
          exact
          component={(props) => (
            <Dashboard {...props} direcRoute="product/kinh-te" />
          )}
        />
        <Route
          path="/dashboard/product/thieu-nhi"
          exact
          component={(props) => (
            <Dashboard {...props} direcRoute="product/thieu-nhi" />
          )}
        />
        <Route
          path="/dashboard/product/tam-ly"
          exact
          component={(props) => (
            <Dashboard {...props} direcRoute="product/tam-ly" />
          )}
        />
        <Route
          path="/dashboard/product/lap-trinh"
          exact
          component={(props) => (
            <Dashboard {...props} direcRoute="product/lap-trinh" />
          )}
        />
        <Route
          path="/dashboard/product/khoa-hoc"
          exact
          component={(props) => (
            <Dashboard {...props} direcRoute="product/khoa-hoc" />
          )}
        />

        <Route
          path="/dashboard/users"
          exact
          component={(props) => <Dashboard {...props} direcRoute="users" />}
        />
      </Switch>
    </Router>
  );
}

export default App;
