import { Order } from "../models/order.model.js";

// @route /orders/
// @controller create new cart
export const newOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const order = await newOrder.save();

    res.json({
      success: true,
      message: "Đặt hàng thành công!",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @route /orders/:id
// @controller change status Order
export const changeStatusOrder = async (req, res) => {
  const id = req.params.id;
  const status = req.body;
  try {
    const order = await Order.findByIdAndUpdate(id, status);

    if (!order)
      return res
        .status(400)
        .json({
          success: false,
          message: "Không thể đổi trạng thái đơn hàng!",
        });
    //all good here.

    res.json({
      success: true,
      message: "Đơn hàng đã chuyển trạng thái!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @route /orders/
// @controller get all order
export const getAllOrder = async (req, res) => {
  try {
    const order = await Order.find();
    res.json({ success: true, message: "All here!", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  } 
};

// @route /orders/:userId
// @controller get all user order
export const getUserOrder = async (req, res) => {
  try {
    const userId = req.params.userId;
    const order = await Order.find({ userId }).exec();
    res.json({ success: true, message: "Good!", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
