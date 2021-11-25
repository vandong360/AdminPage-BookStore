import mongoose from "mongoose";
import { User, Admin } from "../models/user.model.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

// // @route /
// // @controller checkAuth
// export const checkAuth = async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select('-password')
//     if (!user) return res.status(400).json({ success: false, message: "User not found" })
//     res.json({ success: false, user })
    
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({success: false, message: "Internal server error"})
//   }
// }

// @route admin/register
// @controller register for Admin
export const getAdminRegister = async (req, res) => {
  const { username, password } = req.body;

  try {
    //check for existing user
    const admin = await Admin.findOne({ username });

    if (admin)
      return res
        .status(400)
        .json({ success: false, message: "Tên người dùng đã tồn tại!" });
    //all good here.

    //hash password
    const hashedPassword = await argon2.hash(password);
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });
    await newAdmin.save();

    //json web token 
    const accessToken = jwt.sign(
      { adminId: newAdmin._id },
      process.env.ACCESS_TOKEN_KEY
    );

    res.json({
      success: true,
      message: "Admin created successfully!",
      accessToken,
      username
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @route admin/login
// @controller login for Admin
export const getAdminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    //check user exist
    if (!admin)
      return res
        .status(400)
        .json({ success: false, message: "username không chính xác!" });

    //check password
    const passwordValid = await argon2.verify(admin.password, password);

    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "password không chính xác!" });
    //all good here.

    //return token
    const accessToken = jwt.sign(
      { adminId: admin._id },
      process.env.ACCESS_TOKEN_KEY
    );

    res.json({
      success: true,
      message: "Login thành công",
      accessToken,
      username
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @route /register
// @controller register for User
export const getUserRegister = async (req, res) => {
  const { username, name, phone, address, password } = req.body;

  try {
    //check for existing user
    const user = await User.findOne({ username });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Tên người dùng đã tồn tại!" });
    //all good here.

    //hash password
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      name,
      phone,
      address,
      password: hashedPassword,
    });
    await newUser.save();

    //json web token 
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_KEY
    );

    res.json({
      success: true,
      message: "User created successfully!",
      accessToken,
      name
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @route /login
// @controller login for User
export const getUserLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    //check user exist
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "username không chính xác!" });

    //check password
    const passwordValid = await argon2.verify(user.password, password);

    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "password không chính xác!" });
    //all good here.

    //return token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_KEY
    );

    res.json({
      success: true,
      message: "Login thành công",
      accessToken,
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @route /update/:id
// @controller update data User
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    //check for existing user
    const user = await User.findByIdAndUpdate(id, req.body);
    console.log(user)
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Update không thành công!" });
    //all good here.

    res.json({
      success: true,
      message: "Thông tin user đã thay đổi thành công!",
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndRemove(id);
    if (!user) {
      res.json({
        success: false,
        message: "Xoá user thất bại!",
      });
    } else {
      res.json({ success: true, message: "Đã xoá user!"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}



