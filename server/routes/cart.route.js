import express from "express";
import {
  newCart,
  updateCart,
  deleteCart,
  getCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", newCart);
router.put("/:id", updateCart);
router.delete("/:userId", deleteCart);
router.get("/:userId", getCart);

export default router;
