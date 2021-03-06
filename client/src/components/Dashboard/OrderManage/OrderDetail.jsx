import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { OrderItem } from "./OrderList";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import moment from "moment";

import { changeStatus, getOneOrder } from "../../../store/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";

const MainBox = styled(Box)({
  width: "96%",
  height: "96%",
  border: "1px solid #df622d",
  display: "block",
  margin: "1rem auto",
  backgroundColor: "#ecf1f7",
  borderRadius: "7px",
  overflow: "scroll",
});

const SpaceBox = styled(Box)({
  width: "100%",
  height: "3rem",
  backgroundColor: "#f97447",
  borderRadius: "7px",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  color: "white",
});

const HeaderBox = styled(Box)({
  width: "100%",
  height: "3.5rem",
  padding: "0.5rem",
  display: "inline-flex",
  justifyContent: "space-between",
  backgroundColor: "#cad5e2",
  marginBottom: "0",
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  backgroundColor: "#cad5e2",
  marginTop: "1rem",
  color: theme.palette.text.secondary,
}));

export default function OrderDetail(props) {
  const { order } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const id = props.order._id;

  React.useEffect(() => {
    dispatch(getOneOrder(id));
  }, []);

  let status;

  const handleAccept = async () => {
    status = "shipping";
    await dispatch(changeStatus({ id, status }));
    window.location.reload();
  };

  const handleCanceled = async () => {
    status = "canceled";
    await dispatch(changeStatus({ id, status }));
    window.location.reload();
  };

  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#e2e2e2" }}>
      {order === null ? (
        ""
      ) : (
        <MainBox>
          <SpaceBox>
            <Typography variant="h6" align="center">
              ????n h??ng #{order._id}
            </Typography>
          </SpaceBox>
          <HeaderBox>
            <div>
              <Typography variant="subtitle1" align="left" color="green">
                ?????t ng??y{" "}
                {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </Typography>
            </div>

            <div>
              <Typography
                sx={{
                  display: "inline-block",
                  backgroundColor: "#c7cad8",
                  padding: "0 10px",
                  borderRadius: "16px",
                  marginRight: "0.5rem",
                }}
                variant="subtitle1"
                align="right"
              >
                {(() => {
                  switch (order.status) {
                    case "waiting":
                      return "??ang ch??? x??c nh???n";
                    case "shipping":
                      return "??ang giao";
                    case "delivered":
                      return "???? giao";
                    case "canceled":
                      return "???? hu???";
                    default:
                      return "";
                  }
                })()}
              </Typography>

              {order.status === "waiting" ? (
                <>
                  <Button
                    sx={{ display: "inline-block", marginRight: "0.5rem" }}
                    variant="contained"
                    color="success"
                    onClick={handleAccept}
                  >
                    X??c nh???n
                  </Button>
                  <Button
                    sx={{ display: "inline-block", marginRight: "0.5rem" }}
                    variant="outlined"
                    color="error"
                    onClick={handleCanceled}
                  >
                    Hu???
                  </Button>
                </>
              ) : order.status === "shipping" ? (
                <Typography variant="subtitle1" align="left" color="green">B???t ?????u giao ng??y {moment(order.updatedAt).format("LL")}</Typography>
              ) : order.status === "delivered" ? (
                <Typography variant="subtitle1" align="left" color="blue">
                  Giao th??nh c??ng v??o l??c{" "}
                  {moment(order.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                </Typography>
              ) : (
                <Typography variant="subtitle1" align="left" color="red">
                  ???? hu??? l??c{" "}
                  {moment(order.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                </Typography>
              )}
            </div>
          </HeaderBox>
          <hr style={{ marginTop: "0", marginBottom: "0rem" }} />
          <Box>
            {order.products.map((product) => (
              <>
                <OrderItem
                  img={product.productImg}
                  name={product.productName}
                  price={product.price}
                  qty={product.quantity}
                />
                <hr style={{ marginBottom: "0rem", marginTop: "0rem" }} />
              </>
            ))}
          </Box>

          <Box sx={{ width: "98%", display: "block", margin: "0 auto" }}>
            <Grid container spacing={1}>
              <Grid item xs={7}>
                <Item>
                  <Typography variant="subtitle1" align="left">
                    Kh??ch h??ng: <b> {order.userName}</b>
                  </Typography>
                  <Typography variant="subtitle1" align="left">
                    S??? ??i???n tho???i: <b> {order.phone} </b>
                  </Typography>
                  <Typography variant="subtitle1" align="left">
                    ?????a ch???: <b> {order.address} </b>
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={5}>
                <Item>
                  <Grid container>
                    <Grid item xs={7}>
                      <Typography variant="subtitle1" align="left">
                        T???ng s??? l?????ng:
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="subtitle1" align="left">
                        <b>{order.amount}</b>
                      </Typography>
                    </Grid>

                    <Grid item xs={7}>
                      <Typography variant="subtitle1" align="left">
                        T???ng ti???n:
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="subtitle1" align="left">
                        <b>{order.totalPrice.toLocaleString("de-DE")} ??</b>
                      </Typography>
                    </Grid>

                    <Grid item xs={7}>
                      <Typography variant="subtitle1" align="left">
                        Ph?? v???n chuy???n:
                      </Typography>
                      <hr />
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="subtitle1" align="left">
                        <b>0 ??</b>
                      </Typography>
                      <hr />
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="subtitle1" align="left">
                        T???ng ti???n thanh to??n:
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography
                        variant="subtitle1"
                        align="left"
                        color="#df622d"
                      >
                        <b> {order.totalPrice.toLocaleString("de-DE")} ??</b>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography>--Thanh to??n khi nh???n h??ng--</Typography>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </MainBox>
      )}
    </div>
  );
}
