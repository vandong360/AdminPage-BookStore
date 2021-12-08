import express from "express";
import {
  newOrder,
  getAllOrder,
  getUserOrder,
  changeStatusOrder,
  getOneOrder,
} from "../controllers/order.controller.js";

const router = express.Router();
//for admin
router.get("/dashboard/orders/", getAllOrder);
router.get("/dashboard/orders/:id", getOneOrder);
router.put("/dashboard/orders/:id", changeStatusOrder);

//for user
router.get("/orders/user/:userId", getUserOrder);
router.post("/orders/", newOrder);

export default router;
