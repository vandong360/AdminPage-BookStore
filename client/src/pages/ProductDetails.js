import React from 'react'
import BreadcrumbBar from '../components/Dashboard/Products/Breadcrumb/BreadcrumbBar'
import Detail from '../components/Dashboard/Products/Details/Details'
import BlockProducts from '../components/Home/BlockProducts/BlockProducts'

const imgtq1 = "/images/test/tamQuoc.jpg";

const cateSVH = {
  title: "Sách cùng thể loại",
  products: [
    {
      id: 1,
      img: imgtq1,
      name: "tam quốc diễn nghĩa - la quán trung",
      price: "145.000",
      oldPrice: "199.000",
    },
    {
      id: 2,
      img: imgtq1,
      name: "tam quốc diễn nghĩa - la quán trung",
      price: "145.000",
      oldPrice: "199.000",
    },
    {
      id: 3,
      img: imgtq1,
      name: "tam quốc diễn nghĩa - la quán trung",
      price: "145.000",
      oldPrice: "199.000",
    },
    {
      id: 4,
      img: imgtq1,
      name: "tam quốc diễn nghĩa - la quán trung",
      price: "145.000",
      oldPrice: "199.000",
    },
    {
      id: 5,
      img: imgtq1,
      name: "tam quốc diễn nghĩa - la quán trung",
      price: "145.000",
      oldPrice: "199.000",
    },
  ],
};

export default function ProductDetails() {
  return (
    <>
      <BreadcrumbBar />
      <Detail />
    </>
  );
}
