import express from "express";
import {
  newOrder,
  getAllOrder,
  getUserOrder,
  changeStatusOrder,
} from "../controllers/order.controller.js";

const router = express.Router();
//for admin
router.get("/dashboard/orders/", getAllOrder);
router.put("/dashboard/orders/:id", changeStatusOrder);

//for user
router.get("/orders/:userId", getUserOrder);
router.post("/orders/", newOrder);

export default router;
