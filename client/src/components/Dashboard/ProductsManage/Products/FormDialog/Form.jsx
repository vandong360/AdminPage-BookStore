import * as React from "react";
import "./Form.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import * as Yup from "yup";
import PopupAlert from "../../../PopupAlert";

import {
  openDialog,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../../../../store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";

//custom style form
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  backgroundColor: "rgb(232, 237, 243)",
  color: theme.palette.text.secondary,
}));

//main logic
export default function FormDialog(props) {
  const dispatch = useDispatch();
  const { setOpen } = useSelector((state) => state.products);

  //xử lý form
  const [edit, setEdit] = React.useState(true);
  const [typeSubmit, setTypeSubmit] = React.useState("");
  const [alert, setAlert] = React.useState(null);

  const initialValues = {
    name: props.product.name,
    image: props.product.image,
    price: props.product.price,
    oldPrice: props.product.oldPrice,
    discount: props.product.discount,
    description: props.product.description,
    author: props.product.author,
    nhaXB: props.product.nhaXB,
    namXB: props.product.namXB,
    soTrang: props.product.soTrang,
    category: props.product.category,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Khong duoc bo trong!"),
    image: Yup.string().required("Khong duoc bo trong!"),
    price: Yup.number().required("Khong duoc bo trong!"),
    oldPrice: Yup.number().required("Khong duoc bo trong!"),
    discount: Yup.number().required("Khong duoc bo trong!"),
    description: Yup.string().required("Khong duoc bo trong!"),
    author: Yup.string().required("Khong duoc bo trong!"),
    nhaXB: Yup.string().required("Khong duoc bo trong!"),
    namXB: Yup.number().required("Khong duoc bo trong!"),
    soTrang: Yup.number().required("Khong duoc bo trong!"),
    category: Yup.string().required("Khong duoc bo trong!"),
  });

  //ham xu ly khi login
  const handleClose = async () => {
    dispatch(openDialog(false));
    window.location.reload();
  };

  const handleUpdate = async (formValue) => {
    let id = props.product._id;
    const {
      name,
      image,
      price,
      oldPrice,
      discount,
      description,
      author,
      nhaXB,
      namXB,
      soTrang,
      category,
    } = formValue;

    try {
      const response = await dispatch(
        updateProduct({
          id,
          name,
          image,
          price,
          oldPrice,
          discount,
          description,
          author,
          nhaXB,
          namXB,
          soTrang,
          category,
        })
      );
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleNew = async (formValue) => {
    try {
      const response = await dispatch(createProduct(formValue));
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    let id = props.product._id;
    const response = await dispatch(deleteProduct(id));
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
  };

  const handleEdit = () => setEdit(!edit);
  
  const handleSubmit = async (formValue) => {
    if (typeSubmit === "update") {
      handleUpdate(formValue);
    } else if (typeSubmit === "new") {
      handleNew(formValue);
    }
  };

  setTimeout(() => {
    if (initialValues.name) {
      setTypeSubmit("update");
    } else {
      setTypeSubmit("new");
    }
  }, 10);

  return (
    <div>
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "#003349",
            color: "white",
          },
        }}
        bg=""
        fullWidth="true"
        maxWidth="lg"
        TransitionComponent={Transition}
        open={setOpen}
        onClose={handleClose}
      >
        <PopupAlert info={alert} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form
            className="form-dialog"
            // onSubmit={() => handleSubmit(typeSubmit)}
          >
            <DialogTitle>Chi tiết sản phẩm</DialogTitle>
            <DialogContent>
              {/* <AlertMessage info={alert} /> */}
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <Item>
                    <img src={props.product.image || ""} alt="image here" />
                  </Item>
                </Grid>
                <Grid item xs={5}>
                  <Item>
                    <div className="form-group">
                      <label htmlFor="username">Tên sản phẩm</label>
                      <Field
                        disabled={edit}
                        name="name"
                        type="text"
                        className="form-control input"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="image">Image link</label>
                      <Field
                        disabled={edit}
                        name="image"
                        type="text"
                        className="form-control input"
                      />
                      <ErrorMessage
                        name="image"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="author">Tác giả</label>
                      <Field
                        disabled={edit}
                        name="author"
                        type="text"
                        className="form-control input"
                      />
                      <ErrorMessage
                        name="author"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="nhaXB">Nhà xuất bản</label>
                      <Field
                        disabled={edit}
                        name="nhaXB"
                        type="text"
                        className="form-control input"
                      />
                      <ErrorMessage
                        name="nhaXB"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="description">Mô tả</label>
                      <Field
                        disabled={edit}
                        name="description"
                        type="text"
                        component="textarea"
                        className="form-control input"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    <div className="form-group">
                      <label htmlFor="price">Giá</label>
                      <Field
                        disabled={edit}
                        name="price"
                        type="number"
                        className="form-control input"
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="oldPrice">Giá cũ</label>
                      <Field
                        disabled={edit}
                        name="oldPrice"
                        type="number"
                        className="form-control input"
                      />
                      <ErrorMessage
                        name="oldPrice"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="discount">Giảm giá</label>
                      <Field
                        disabled={edit}
                        name="discount"
                        type="number"
                        className="form-control input"
                      />
                      <ErrorMessage
                        name="discount"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="soTrang">Số trang</label>
                      <Field
                        disabled={edit}
                        name="soTrang"
                        type="number"
                        className="form-control input"
                      />
                      <ErrorMessage
                        name="soTrang"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="namXB">Năm xuất bản</label>
                      <Field
                        disabled={edit}
                        name="namXB"
                        type="number"
                        className="form-control input"
                      />
                      <ErrorMessage
                        name="namXB"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="category">Danh mục sản phẩm</label>
                      <Field
                        disabled={edit}
                        name="category"
                        type="text"
                        component="select"
                        className="form-control input"
                      >
                        <option value="">--Chọn danh mục--</option>
                        <option value="van-hoc">Văn học</option>
                        <option value="giao-khoa">Giáo khoa</option>
                        <option value="lap-trinh">Lập trình</option>
                        <option value="kinh-te">Kinh tế</option>
                        <option value="thieu-nhi">Thiếu nhi</option>
                        <option value="tam-ly">Tâm lý</option>
                        <option value="khoa-hoc">Khoa Học</option>
                      </Field>
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                  </Item>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              {initialValues.name ? (
                <div className="form-group">
                  <Button disabled={edit} onClick={() => handleDelete()}>
                    Xoá Sản Phẩm
                  </Button>
                </div>
              ) : (
                ""
              )}

              <div className="form-group">
                <Button type="submit" disabled={edit}>
                  {typeSubmit}
                </Button>
              </div>

              <div className="form-group">
                <Button onClick={() => handleEdit()}>Chỉnh sửa</Button>
              </div>
              <div className="form-group">
                <Button onClick={handleClose}>Cancel</Button>
              </div>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </div>
  );
}
