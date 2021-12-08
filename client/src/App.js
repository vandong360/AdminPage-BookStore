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
import OrderDetailPage from "./pages/OrderDetail";

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
          render={(props) => <Auth {...props} authRoute="login" />}
        />
        <Route
          path="/auth/admin/register"
          exact
          render={(props) => <Auth {...props} authRoute="register" />}
        />
        <Route
          path="/dashboard/product"
          exact
          render={(props) => <Dashboard {...props} direcRoute="product" />}
        />

        <Route
          path="/dashboard/product/giao-khoa"
          exact
          render={(props) => (
            <Dashboard {...props} direcRoute="product/giao-khoa" />
          )}
        />
        <Route
          path="/dashboard/product/van-hoc"
          exact
          render={(props) => (
            <Dashboard {...props} direcRoute="product/van-hoc" />
          )}
        />

        <Route
          path="/dashboard/product/kinh-te"
          exact
          render={(props) => (
            <Dashboard {...props} direcRoute="product/kinh-te" />
          )}
        />
        <Route
          path="/dashboard/product/thieu-nhi"
          exact
          render={(props) => (
            <Dashboard {...props} direcRoute="product/thieu-nhi" />
          )}
        />
        <Route
          path="/dashboard/product/tam-ly"
          exact
          render={(props) => (
            <Dashboard {...props} direcRoute="product/tam-ly" />
          )}
        />
        <Route
          path="/dashboard/product/lap-trinh"
          exact
          render={(props) => (
            <Dashboard {...props} direcRoute="product/lap-trinh" />
          )}
        />
        <Route
          path="/dashboard/product/khoa-hoc"
          exact
          render={(props) => (
            <Dashboard {...props} direcRoute="product/khoa-hoc" />
          )}
        />

        <Route
          path="/dashboard/orders"
          exact
          render={(props) => <Dashboard {...props} direcRoute="orders" />}
        />
        <Route
          path="/dashboard/orders/detail/"
          exact
          render={(props) => <OrderDetailPage {...props} />}
        />

        <Route
          path="/dashboard/users"
          exact
          render={(props) => <Dashboard {...props} direcRoute="users" />}
        />
      </Switch>
    </Router>
  );
}

export default App;
