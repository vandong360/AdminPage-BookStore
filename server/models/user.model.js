import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const CartSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'products', unique: true },
  productImage: String,
  productName: String,
  productPrice: Number,
  productDiscount: Number,
  quantity: Number,
});


const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: [CartSchema],
    default: [],
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

export const Admin = mongoose.model("admins", AdminSchema);

export const User = mongoose.model('users', UserSchema);