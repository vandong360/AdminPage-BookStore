import express from 'express';
import {
  getAdminRegister,
  getAdminLogin,
  getUserRegister,
  getUserLogin,
  updateUser,
  deleteUser,
} from "../controllers/auth.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";


const router = express.Router();
// router.get('/',verifyToken, checkAuth);
router.post("/admin/register", getAdminRegister);
router.post('/admin/login', getAdminLogin)

router.post("/register", getUserRegister);
router.post("/login", getUserLogin);
router.put("/update/:id", updateUser)
router.delete("/delete/:id", deleteUser);

export default router;  