import express from 'express'
import { protectRoute } from '../middleware/auth_middleware.js';
import {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  fetchGoogleReviews,
  deleteTestimonialPic
} from "../controllers/testimonial_controllers.js";

const router = express.Router();

router.get("/", getAllTestimonials);
router.post("/createtestimonial", createTestimonial);
router.put("/updatetestimonial/:id", protectRoute, updateTestimonial);
router.delete("/deletetestimonial/:id", protectRoute, deleteTestimonial);
router.get("/google-reviews", fetchGoogleReviews);
router.delete("/deletetestimonialpic/:id", protectRoute, deleteTestimonialPic);

export default router;