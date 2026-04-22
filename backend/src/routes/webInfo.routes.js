import express from 'express'
import { protectRoute } from '../middleware/auth_middleware.js';
import {
  getWebsiteInfo,
  updateWebsiteInfo,
} from "../controllers/webInfo_controllers.js";

const router = express.Router();

router.get("/getwebinfo", getWebsiteInfo);
router.put("/updatewebinfo", protectRoute, updateWebsiteInfo);

export default router;