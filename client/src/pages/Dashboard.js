import ActionBar from "../components/Dashboard/ActionBar/ActionBar";
import UserManage from "../components/Dashboard/UserManage/UserManage";
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
      {direcRoute === "users" && <UserManage />}
      {direcRoute === "products" && <ProductsManage category="all" />}
      {direcRoute === "products/giao-khoa" && <ProductsManage category="giao-khao" />}
      {direcRoute === "products/van-hoc" && <ProductsManage category="van-hoc" />}
      {direcRoute === "products/kinh-te" && <ProductsManage category="kinh-te" />}
      {direcRoute === "products/thieu-nhi" && <ProductsManage category="thieu-nhi" />}
      {direcRoute === "products/tam-ly" && <ProductsManage category="tam-ly" />}
      {direcRoute === "products/lap-trinh" && <ProductsManage category="lap-trinh" />}
      {direcRoute === "products/khoa-hoc" && <ProductsManage category="khoa-hoc" />}

    </>
  );

  return (
    <div style={sx}>
      <div style={leftSide}>
        <ActionBar /> 
      </div>
      
      <div style={rightSide}>
        <PrimaryAppBar /> 
        {body}
      </div>
    </div>
  );
};

export default Dashboard;
