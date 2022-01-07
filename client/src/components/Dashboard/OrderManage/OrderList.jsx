import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  BrowserRouter as 
  Route,
  Link,
} from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Image } from "react-bootstrap";
import Grid from "@mui/material/Grid";
import moment from "moment";

const OrderBox = styled(Box)({
  width: "90%",
  height: "max-content",
  display: "block",
  margin: "0 auto",
  marginBottom: "1rem",
  backgroundColor: "white",
  
  border: "1px solid #d1d1d1",
  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
  borderRadius: "5px",
});

const ItemBox = styled(Box)({
  width: "100%",
  backgroundColor: "white",
  padding: "0.5rem 0",
});

const Header = styled(Box)({
  width: "100%",
  height: "2rem",
  padding: "3px",
  display: "inline-flex",
  justifyContent: "space-between",
  backgroundColor: "#475e69",
  borderBottom: "2px solid #00293a",
});

const linkStyle = {
  color: "black",
  textDecoration: "none",
};

const imageStyle = {
  display: "block",
  margin: "0 auto",
  width: "60%",
  border: "1px solid #e2e2e2",
};

export const OrderItem = (props) => {
  return (
    <ItemBox>
      <Grid container spacing={2}>
        <Grid mt={1} item xs={2}>
          <Image style={imageStyle} src={props.img} rounded />
        </Grid>

        <Grid mt={1} item xs={4}>
          <Typography variant="h6" color="#908f99">
            {props.name}
          </Typography>
        </Grid>
        <Grid mt={1} item xs={3}>
          <Typography variant="h6" color="red">
            {props.price.toLocaleString("de-DE")} đ
          </Typography>
        </Grid>
        <Grid mt={1} item xs={3}>
          <Typography variant="subtitle1">Qty: {props.qty}</Typography>
        </Grid>
      </Grid>
    </ItemBox>
  );
};  

export default function Order(props) {
  const order = props.order
  return (
    <>
      <Link
        style={linkStyle}
        to={{
          pathname: "/dashboard/orders/detail/",
          state: order,
        }}
      >
        <OrderBox>
          <Header>
            <Typography variant="subtitle1" color="white" mr={2}>
              # {props.id}
            </Typography>
            <Typography variant="subtitle1" color="white">
              {moment(props.timestamps).format("MMMM Do YYYY, h:mm:ss a")}
            </Typography>
            <h6 style={{ color: "#df622d", fontWeight: "bold" }}>
              {(() => {
                switch (props.status) {
                  case "waiting":
                    return "Đang chờ xác nhận";
                  case "shipping":
                    return "Đang giao";
                  case "delivered":
                    return "Đã giao";
                  case "canceled":
                    return "Đã huỷ";
                  default:
                    return "";
                }
              })()}
            </h6>
          </Header>
          {props.products.map((product) => (
            <>
              <OrderItem
                img={product.productImg}
                name={product.productName}
                price={product.price}
                qty={product.quantity}
              />
              <hr style={{ marginBottom: "0" }} />
            </>
          ))}
        </OrderBox>
      </Link>
    </>
  );
}
