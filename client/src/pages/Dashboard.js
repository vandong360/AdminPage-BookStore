import ActionBar from "../components/Dashboard/ActionBar/ActionBar";
import UserManage from "../components/Dashboard/UserManage/UserManage";
import OrderManage from "../components/Dashboard/OrderManage/OrderManage";
import PrimaryAppBar from "../components/Dashboard/AppBar/AppBar";
import ProductsManage from "../components/Dashboard/ProductsManage/ProductsManage";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const sx = {
  margin: "0 -10rem",
  background: "#f9f9fa",
  width: "100vw",
  height: "100vh",
};

const leftSide = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "20%",
  height: "100vh",
  display: "block",
  backgroundColor: "#003349",
  color: "#fff",
};

const rightSide = {
  position: "fixed",
  top: 0,
  left: "20%",
  width: "80%",
  height: "max-content",
  display: "block",
  backgroundColor: "#ececec",
};


const Dashboard = ({ direcRoute }) => {
  let body
  
  const { userToken } = useSelector((state) => state.auth);

  if (!userToken) {
    return <Redirect to="/auth/admin/login" />;
  }

  body = (
    <>
      {direcRoute === "orders" && <OrderManage />}
      {direcRoute === "orders/detail" && <OrderManage />}
      {direcRoute === "users" && <UserManage />}
      {direcRoute === "product" && <ProductsManage category="all" />}
      {direcRoute === "product/giao-khoa" && <ProductsManage category="giao-khoa" />}
      {direcRoute === "product/van-hoc" && <ProductsManage category="van-hoc" />}
      {direcRoute === "product/kinh-te" && <ProductsManage category="kinh-te" />}
      {direcRoute === "product/thieu-nhi" && <ProductsManage category="thieu-nhi" />}
      {direcRoute === "product/tam-ly" && <ProductsManage category="tam-ly" />}
      {direcRoute === "product/lap-trinh" && <ProductsManage category="lap-trinh" />}
      {direcRoute === "product/khoa-hoc" && <ProductsManage category="khoa-hoc" />}
    </>
  );

  let searchBar = (
    <>
      {direcRoute === "users" && <PrimaryAppBar search="Tìm username.." />}
      {direcRoute === "orders" && <PrimaryAppBar search="Tìm kiếm.." />}
      {direcRoute === "product" && <PrimaryAppBar search="Tìm sách.." />}
      {direcRoute === "product/giao-khoa" && <PrimaryAppBar search="Tìm sách.." />}
      {direcRoute === "product/van-hoc" && <PrimaryAppBar search="Tìm sách.." />}
      {direcRoute === "product/kinh-te" && <PrimaryAppBar search="Tìm sách.." />}
      {direcRoute === "product/thieu-nhi" && <PrimaryAppBar search="Tìm sách.." />}
      {direcRoute === "product/tam-ly" && <PrimaryAppBar search="Tìm sách.." />}
      {direcRoute === "product/lap-trinh" && <PrimaryAppBar search="Tìm sách.." />}
      {direcRoute === "product/khoa-hoc" && <PrimaryAppBar search="Tìm sách.." />}
    </>
  );

  return (
    <div style={sx}>
      <div style={leftSide}>
        <ActionBar />
      </div>

      <div style={rightSide}>
        {searchBar}
        {body}
      </div>
    </div>
  );
};

export default Dashboard;
