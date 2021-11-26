import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true},
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "products" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = mongoose.model("carts", CartSchema);