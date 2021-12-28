import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

// @route /products/
// @controller get all product
export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 });
    res.json({ success: true, message: null, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// @route /product/trending
// @controller get all product 
export const getHotProduct = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 });
    res.json({ success: true, message: null, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// @route /products/:category
// @controller get all product by category
export const getAllByCategory = async (req, res) => {
  try {
    const category = req.query.category;
    const products = await Product.find({ category: { $regex: new RegExp(category), $options: "i" }}).exec();;
    res.json({ success: true, message: null, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  } 
};

// @route /products/post
// @controller add new product
export const postProduct = async (req, res) => {
  const name = req.body.name
  try {
    //check for existing user
    const product = await Product.findOne({ name });

    if (product)
      return res
        .status(400)
        .json({ success: false, message: "Sản phẩm đã tồn tại!" });
    //all good here.

    const newProduct = new Product(req.body);
    await newProduct.save();

    res.json({
      success: true,
      message: "Sản phẩm đã được thêm thành công!",
      product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @route /products/update/:id
// @controller update data product
export const updateProduct = async (req, res) => {
  const id = req.params.id;

  try {
    //check for existing user
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "Update không thành công!" });
    //all good here.
    
    res.json({
      success: true,
      message: "Sản phẩm đã được update thành công!",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @route /products/delete/:id
// @controller delete product
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndRemove(id);
    if (!product) {
      res.json({
        success: false,
        message: "Xoá thất bại!",
        product: null,
      });
    } else {
      res.json({ success: true, message: "Đã xoá sản phẩm!", product });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}; 

// @route /products/:id
// @controller get one product 
export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).exec();
    if (!product) {
      res.json({ success: false, message: "Khong tim thay san pham", product: null });
    } else {
      res.json({ success: true, message: "Thanh cong", product });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
} 