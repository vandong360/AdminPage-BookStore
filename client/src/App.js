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
          <Redirect to="/dashboard/products" />
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
          path="/dashboard/products"
          exact
          component={(props) => <Dashboard {...props} direcRoute="products" />}
        />

        <Route
          path="/dashboard/products/giao-khoa"
          exact
          component={(props) => (
            <Dashboard {...props} direcRoute="products/giao-khoa" />
          )}
        />
        <Route
          path="/dashboard/products/van-hoc"
          exact
          component={(props) => (
            <Dashboard {...props} direcRoute="products/van-hoc" />
          )}
        />

        <Route
          path="/dashboard/products/kinh-te"
          exact
          component={(props) => (
            <Dashboard {...props} direcRoute="products/kinh-te" />
          )}
        />
        <Route
          path="/dashboard/products/thieu-nhi"
          exact
          component={(props) => (
            <Dashboard {...props} direcRoute="products/thieu-nhi" />
          )}
        />
        <Route
          path="/dashboard/products/tam-ly"
          exact
          component={(props) => (
            <Dashboard {...props} direcRoute="products/tam-ly" />
          )}
        />
        <Route
          path="/dashboard/products/lap-trinh"
          exact
          component={(props) => (
            <Dashboard {...props} direcRoute="products/lap-trinh" />
          )}
        />
        <Route
          path="/dashboard/products/khoa-hoc"
          exact
          component={(props) => (
            <Dashboard {...props} direcRoute="products/khoa-hoc" />
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
