import express from "express";
import { newOrder, getAllOrder, getOrderByUserId, changeStateOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/orders/", getAllOrder);
router.post("/orders/post", newOrder);
router.put("/orders/update/:id", changeStateOrder);
router.get("/orders/user/:id", getOrderByUserId);

export default router;
