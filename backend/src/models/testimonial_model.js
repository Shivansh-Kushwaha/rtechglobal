import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
    {
        quote: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        organization: {
            type: String,
            required: true,
        },
        location:{
            type: String,
            required: true,
        },
        testimonialPic: {
            type: String,
            default:"",
        },
    },
    { timestamps: true }
);

const Testimonial = mongoose.model("Testimonial",testimonialSchema);

export default Testimonial;