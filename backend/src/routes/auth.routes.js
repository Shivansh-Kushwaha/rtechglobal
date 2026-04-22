import express from "express";
import { login, logout, signup ,checkAuth ,resetPassword} from "../controllers/auth_controllers.js"
import { protectRoute } from "../middleware/auth_middleware.js";

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/check",protectRoute,checkAuth);
router.post("/reset-password",resetPassword);

export default router;