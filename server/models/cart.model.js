import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    products: [
      {
        productId: { type: String },
        productImg: { type: String },
        productName: { type: String },
        productPrice: { type: Number },
        productDiscount: { type: Number },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = mongoose.model("carts", CartSchema);