import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        institution: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "active", "fulfilled"],
            default: "pending"
        }
    },
    { timestamps: true }
);

const ContactUs = mongoose.model("ContactUs", contactUsSchema);

export default ContactUs;