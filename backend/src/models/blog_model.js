import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique:true
        },
        title: {
            type: String,
            required: true
        },
        excerpt: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        readTime: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        blogPic: {
            type: String,
            default:""
        },
    },
    { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;