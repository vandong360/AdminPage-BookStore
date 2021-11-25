import React from 'react'
import './Details.css'
import Button from '@mui/material/Button'
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import RatingBar from '../Card/RatingBar'
import Stack from '@mui/material/Stack'
import Divider from "@mui/material/Divider"
import InputQuantity from "../InputQuantity/InputQuantity";

const ProductDetails = () => {
  return (
    <>
      <div className="block-details">
        <div className="row">
          <div className="col-md-5">
            <div className="product-img">
              <img
                src={process.env.PUBLIC_URL + "/images/test/tamQuoc.jpg"}
                alt=""
              />
            </div>
            <div className="order-btn">
              <Button id="add-cart" variant="outlined">
                <AddShoppingCartIcon /> Thêm Vào Giỏ Hàng
              </Button>
              <Button id="buy" variant="contained">
                Mua Ngay
              </Button>
            </div>
          </div>

          <div className="col-md-7">
            <div className="product-content">
              <h3 className="title">tam quốc diễn nghĩa - bộ 2 tập</h3>

              <div className="rate-bar">
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                >
                  <RatingBar />
                  <span className="total"> 21 Đánh Giá</span>
                </Stack>
              </div>

              <div className="content">
                <div className="row">
                  <div className="col-md-7">
                    <span id="label">Nhà xuất bản:</span>
                    <span id="value"> NXB Văn Học</span>

                    <span id="label">Năm xuất bản: </span>
                    <span id="value">2020</span>
                  </div>
                  <div className="col-md-5">
                    <span id="label">Tác giả:</span>
                    <span id="value">La Quán Trung</span>

                    <span id="label">Loại bìa: </span>
                    <span id="value">Bìa mềm</span>
                  </div>
                </div>
                <Stack direction="row" spacing={1}>
                  <h2 className="price"> 332.000 đ</h2>
                  <span className="discount">-15%</span>
                  <h5 className="old-price">390.000 đ</h5>
                </Stack>
                <h6>Giao hàng đến:</h6>
                <h6 className="address">
                  Phường Hoà Hải, Quận Ngũ Hành Sơn, Đà Nẵng
                </h6>{" "}
                <br />
                <h6>Số lượng:</h6>
                <div className="quantity">
                  <InputQuantity />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block-infor">
        <h4>Thông tin sản phẩm</h4>
        <table>
          <colgroup>
            <col />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th>Nhà phát hành:</th>
              <td>Đông A</td>
            </tr>

            <tr>
              <th>Tác giả:</th>
              <td>La Quán Trung</td>
            </tr>

            <tr>
              <th>Nhà xuất bản:</th>
              <td>NXB Văn Học</td>
            </tr>

            <tr>
              <th>Năm xuất bản:</th>
              <td>2020</td>
            </tr>

            <tr>
              <th>Số trang:</th>
              <td>1892</td>
            </tr>

            <tr>
              <th>Loại bìa:</th>
              <td>Bìa mềm</td>
            </tr>
          </tbody>
        </table>
        <hr id="horizontal"/>
        <p className="text">
          Tam quốc diễn nghĩa của La Quán Trung là một trong những kiệt tác của
          văn học thế giới. Ngay từ khi được dịch sang chữ quốc ngữ vào đầu thế
          kỷ XX, tiểu thuyết này đã được bạn đọc Việt Nam đón nhận nồng nhiệt;
          từ đó đến nay có vô vàn ấn bản Tam quốc ra đời, mỗi ấn bản lại mang
          một màu sắc khác nhau. Để có thêm sự lựa chọn cho bạn đọc, Đông A ra
          mắt bản Tam quốc diễn nghĩa 2 tập bìa cứng.
        </p> <br />
      </div>
    </>
  );
}

export default ProductDetails;
