import express from 'express';
import {
  getAllProduct,
  postProduct,
  getProductById,
  deleteProduct,
  updateProduct,
  getAllByCategory,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/product/", getAllProduct);
router.post('/product/post', postProduct);
router.delete("/product/delete/:id", deleteProduct);
router.put("/product/update/:id", updateProduct);
router.get('/product/:id', getProductById);

router.get("/get", getAllByCategory);

export default router;
