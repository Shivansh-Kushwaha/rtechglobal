import express from 'express'
import { protectRoute } from '../middleware/auth_middleware.js';
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogBySlug,
  deleteBlogImage
} from "../controllers/blog_controllers.js";

const router=express.Router();

router.get("/", getAllBlogs);

router.get("/id/:id", protectRoute,getBlogById);
router.post("/createblog",protectRoute, createBlog);
router.put("/updateblog/:id", protectRoute, updateBlog);
router.delete("/deleteblog/:id", protectRoute, deleteBlog);
router.delete("/deleteblogimage/:id", protectRoute, deleteBlogImage);

router.get("/:slug", getBlogBySlug);


export default router;