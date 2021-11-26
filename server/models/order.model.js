import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    userName: String,
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "products" },
        price: Number,
        quantity: Number,
      },
    ],
    amount: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    status: {
      type: String,
      default: "waiting",
      enum: ["waiting", "shipping", "delivered", "canceled"],
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("orders", OrderSchema);
