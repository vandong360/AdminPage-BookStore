import ActionBar from "../components/Dashboard/ActionBar/ActionBar";
import OrderDetail from "../components/Dashboard/OrderManage/OrderDetail";
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

const OrderDetailPage = (props) => {
  const { userToken } = useSelector((state) => state.auth);

  if (!userToken) {
    return <Redirect to="/auth/admin/login" />;
  }

  const order = props.location.state;

  return (
    <div style={sx}>
      <div style={leftSide}>
        <ActionBar />
      </div>

      <div style={rightSide}>
        <OrderDetail order={order} />
      </div>
    </div>
  );
};

export default OrderDetailPage;
