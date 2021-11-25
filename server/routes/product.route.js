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

router.get("/products/", getAllProduct);
router.post('/products/post', postProduct);
router.delete("/products/delete/:id", deleteProduct);
router.put("/products/update/:id", updateProduct);
router.get('/products/:id', getProductById);
router.get("/products/category/", getAllByCategory);

export default router;
