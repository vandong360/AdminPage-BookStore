import { Cart } from "../models/cart.model.js";

// @route /cart
// @controller create new cart
export const newCart = async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    const cart = await newCart.save();

    res.json({
      success: true,
      message: "Đã tạo giỏ hàng",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @route /cart/:id
// @controller update cart
export const updateCart = async (req, res) => {
  const id = req.params.id;

  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body);

    if (!cart)
      return res
        .status(400)
        .json({ success: false, message: "Update cart không thành công!" });
    //all good here.

    res.json({
      success: true,
      message: "Giỏ hàng đã được update thành công!",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @route /cart/:id
// @controller delete cart when delete user
export const deleteCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOneAndRemove({ userId }).exec();
    if (!cart) {
      res.json({
        success: false,
        message: "Cannot delete cart!",
      });
    } else {
      res.json({ success: true, message: "Cart have been deleted!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @route /cart/:id
// @controller get user cart
export const getCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ userId }).exec();
    res.json({ success: true, message: "Good!", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
