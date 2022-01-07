import * as React from "react";
import "./UserManage.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

import { getAllUser, deleteUser } from "../../../store/slices/authSlice";
import { getAll } from "../../../store/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";

// custom table here
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PopupAlert from "../PopupAlert";
import moment from "moment";

function createData(
  name,
  username,
  phone,
  totalOrder,
  action,
  created,
  address
) {
  const createdAt = moment(created).format("MMMM Do YYYY, h:mm:ss a");
  const age = moment(created).startOf("day").fromNow();
  return {
    name,
    username,
    phone,
    totalOrder,
    age,
    action,
    createdAt,
    address,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.username}</TableCell>
        <TableCell align="right">{row.phone}</TableCell>
        <TableCell align="right">{row.totalOrder}</TableCell>
        <TableCell align="right">{row.age}</TableCell>
        <TableCell align="right">{row.action}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                More
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Ngày đăng ký</TableCell>
                    <TableCell>Địa chỉ</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.createdAt}
                    </TableCell>
                    <TableCell>{row.address}</TableCell>
                    {/* <TableCell align="right">
                        {Math.round(moreRow.amount * row.createdAt * 100) / 100}
                      </TableCell> */}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e97f52",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function UserManage() {
  const { allUser } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);
  const [alert, setAlert] = React.useState(null);

  const dispatch = useDispatch();
  const stableDispatch = React.useCallback(dispatch, []);

  React.useEffect(() => {
    stableDispatch(getAllUser());
    stableDispatch(getAll());
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await dispatch(deleteUser(userId));
      if (response.payload.success) {
        setAlert({ type: "success", message: response.payload.message });
        setTimeout(() => {
          setAlert(null);
          window.location.reload();
        }, 2000);
      } else {
        setAlert({ type: "warning", message: response.payload.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {}
  };

  const actionIcon = (userId) => (
    <IconButton onClick={() => handleDelete(userId)}>
      <PersonRemoveIcon style={{ color: "red" }} />
    </IconButton>
  );

  const countingOrder = (userId) => {
    let totalOrder = 0;
    if (orders !== null) {
      for (let item of orders) {
        if (item.userId.indexOf(userId) > -1) {
          totalOrder++;
        }
      }
      return totalOrder;
    } else console.log('')
  };

  let rows = [];

  //Get data and import to table
  if (allUser !== null) {
    rows = allUser.map((user) => {
      return createData(
        user.name,
        user.username,
        user.phone,
        countingOrder(user._id),
        actionIcon(user._id),
        user.createdAt,
        user.address
      );
    });
  } else {
    console.log("");
  }

  return (
    <div>
      <PopupAlert info={alert} />
      <div style={{ overflow: "scroll" }} className="manage-user-container">
        {/* <Box>{allUser === null ? "" : allUser.map((user) => <Typography>{user.name}</Typography>)}</Box> */}
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <StyledTableCell />
                <StyledTableCell>Tên người dùng</StyledTableCell>
                <StyledTableCell align="right">username</StyledTableCell>
                <StyledTableCell align="right">Số điện thoại</StyledTableCell>
                <StyledTableCell align="right">Số đơn đã đặt</StyledTableCell>
                <StyledTableCell align="right">
                  Tuổi tài khoản
                </StyledTableCell>
                <StyledTableCell align="right">Xoá User</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <Row key={row.key} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
