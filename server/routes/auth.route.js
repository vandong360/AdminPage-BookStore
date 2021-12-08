import express from 'express';
import {
  getAdminRegister,
  getAdminLogin,
  getAllUser,
  getUserRegister,
  getUserLogin,
  updateUser,
  deleteUser,
} from "../controllers/auth.controller.js";

// import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();
// router.get('/',verifyToken, checkAuth);
router.post("/auth/admin/register", getAdminRegister);
router.post('/auth/admin/login', getAdminLogin)
router.get('/dashboard/users/', getAllUser)
router.delete("/dashboard/users/:id", deleteUser);

router.post("/auth/register", getUserRegister);
router.post("/auth/login", getUserLogin);
router.put("/auth/update/:id", updateUser)

export default router;  