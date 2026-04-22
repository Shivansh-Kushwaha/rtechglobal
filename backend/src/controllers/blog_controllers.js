import Blog from "../models/blog_model.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllBlogs = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Blog.countDocuments(),
    ]);

    res.json({
      data: blogs,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
    return req.query;
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};




export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blog" });
  }
};





export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blog" });
  }
};






export const createBlog = async (req, res) => {
  try {
    const { blogPic } = req.body;
    if (!blogPic) {
      return res.status(400).json({ message: "Blog pic is required" });
    }

    if (blogPic) {
      const uploadResponse = await cloudinary.uploader.upload(blogPic);
      req.body.blogPic = uploadResponse.secure_url;
    }

    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: "Failed to create blog" });
  }
};




export const updateBlog = async (req, res) => {
  try {
    const { blogPic } = req.body;
    if (!blogPic) {
      return res.status(400).json({ message: "Blog pic is required" });
    }
    if (blogPic) {
      const uploadResponse = await cloudinary.uploader.upload(blogPic);
      req.body.blogPic = uploadResponse.secure_url;
    }
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: "Failed to update blog" });
  }
};





export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog" });
  }
};




export const deleteBlogImage = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (!blog.blogPic) {
      return res.status(400).json({ message: "Blog image not found" });
    }

    // Extract public_id safely
    const urlParts = blog.blogPic.split('/');
    const fileName = urlParts[urlParts.length - 1];

    const publicId = `${fileName.split('.')[0]}`;
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== "ok" && result.result !== "not found") {
      return res.status(500).json({ message: "Cloudinary deletion failed" });
    }

    blog.blogPic = "";
    await blog.save();

    res.json({ message: "Blog image deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete blog image" });
  }
};
