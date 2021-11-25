import React, { useEffect, useCallback } from "react";
import "./ProductsManage.css";
import FormDialog from "../Products/FormDialog/Form";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getAll,
  openDialog,
  getAllByCategory,
} from "../../../store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

//custom table
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

//custom style for table columns
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#00293a",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const columns = [
  {
    id: "name",
    label: "Tên sách",
    minWidth: 100,
  },
  {
    id: "price",
    label: "Giá",
    minWidth: 50,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "oldPrice",
    label: "Giá cũ",
    minWidth: 50,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "discount",
    label: "% Giảm",
    minWidth: 50,
    align: "right",
  },
  {
    id: "author",
    label: "Tác giả",
    minWidth: 70,
    align: "center",
  },
  {
    id: "namXB",
    label: "Năm XB",
    minWidth: 70,
    align: "center",
  },
  {
    id: "rating",
    label: "Đánh giá",
    minWidth: 70,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 30,
    align: "center",
  },
];

function rowData(
  name,
  price,
  oldPrice,
  discount,
  author,
  namXB,
  rating,
  action
) {
  discount = discount + " %";
  return { name, price, oldPrice, discount, author, namXB, rating, action };
}

//main here
const ProductsManage = (props) => {
  const dispatch = useDispatch();
  const { products, setOpen } = useSelector((state) => state.products);

  const stableDispatch = useCallback(dispatch, []);
  const category = props.category;

  useEffect(() => {
    if (!products && category === "all") {
      stableDispatch(getAll());
    } else {
      // stableDispatch(getAllByCategory(category));
    }
  }, [products, category, stableDispatch]);

  //table code here: -------------------------------------------------------------------------------
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [getProduct, setProduct] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAction = (product) => {
    setProduct(product);
    dispatch(openDialog(true));
  };

  //<FormDialog open={open} />
  const actionIcon = (product) => (
    <IconButton onClick={() => handleAction(product)}>
      <AppRegistrationIcon color="primary" />
    </IconButton>
  );

  let rows = [];

  if (products === null) {
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>;
  } else {
    rows = products.map((product) => {
      return rowData(
        product.name,
        product.price,
        product.oldPrice,
        product.discount,
        product.author,
        product.namXB,
        product.rating,
        actionIcon(product)
      );
    });
  }

  return (
    <div className="manage-product-container">
      {setOpen ? <FormDialog product={getProduct} /> : ""}

      <TableContainer sx={{ width: "100%", height: "92%", overflow: "scoll" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ProductsManage;
