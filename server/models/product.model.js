import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  nhaXB: {
    type: String,
    required: true,
  },
  namXB: {
    type: String,
    required: true,
  },
  soTrang: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: [
      "van-hoc",
      "giao-khoa",
      "tam-ly",
      "thieu-nhi",
      "kinh-te",
      "lap-trinh",
      "khoa-hoc",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Product = mongoose.model('products', ProductSchema);


// collection User {
//   name,
//   username,
//   ....  
// }