import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import TabPanel from "./TabPanel";
import Order from "./OrderList";

import { getAll } from "../../../store/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const CusTabs = styled(Tabs)({
  backgroundColor: "#003f59",
  "& .MuiTabs-indicator": {
    height: "4px",
    backgroundColor: "#fc7b12",
  },
});

function OrderManage() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { orders } = useSelector((state) => state.orders);

  const dispatch = useDispatch();
  const stableDispatch = React.useCallback(dispatch, []);

  React.useEffect(() => {
    stableDispatch(getAll());
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box className="manage-product-container">
      <AppBar position="static">
        <CusTabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Tất cả" {...a11yProps(0)} />
          <Tab label="Chờ xác nhận" {...a11yProps(1)} />
          <Tab label="Đang giao" {...a11yProps(2)} />
          <Tab label="Đã giao" {...a11yProps(3)} />
          <Tab label="Đã huỷ" {...a11yProps(4)} />
        </CusTabs>
      </AppBar>

      <SwipeableViews
        style={{ backgroundColor: "#ecf1f7", height: "100%" }}
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {orders
            ? orders.map((order) => (
                <Order
                  order={order}
                  id={order._id}
                  timestamps={order.updatedAt}
                  status={order.status}
                  products={order.products}
                />
              ))
            : ""}
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          {orders
            ? orders.map((order) => {
                if (order.status === "waiting") {
                  return (
                    <Order
                      order={order}
                      id={order._id}
                      timestamps={order.updatedAt}
                      status={order.status}
                      products={order.products}
                    />
                  );
                } else return <div></div>;
              })
            : ""}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {orders
            ? orders.map((order) => {
                if (order.status === "shipping") {
                  return (
                    <Order
                      order={order}
                      id={order._id}
                      timestamps={order.updatedAt}
                      status={order.status}
                      products={order.products}
                    />
                  );
                } else return <div></div>;
              })
            : ""}
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          {orders
            ? orders.map((order) => {
                if (order.status === "delivered") {
                  return (
                    <Order
                      order={order}
                      id={order._id}
                      timestamps={order.updatedAt}
                      status={order.status}
                      products={order.products}
                    />
                  );
                } else return <div></div>;
              })
            : ""}
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          {orders
            ? orders.map((order) => {
                if (order.status === "canceled") {
                  return (
                    <Order
                      order={order}
                      id={order._id}
                      timestamps={order.updatedAt}
                      status={order.status}
                      products={order.products}
                    />
                  );
                } else return <div></div>;
              })
            : ""}
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}

export default OrderManage;
