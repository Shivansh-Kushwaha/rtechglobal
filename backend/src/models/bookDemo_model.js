import mongoose from "mongoose";

const bookDemoSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            maxlength: 50,
        },
        institution: {
            type: String,
            required: true,
        },
        institutionType: {
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
            maxlength: 10,
        },
        city: {
            type: String,
            required: true,
        },
        preferredDate: { 
            type: Date, 
            required: true 
        }, 
        message: {
            type: String,
            maxlength: 500,
        },
        status: {
            type: String,
            enum: ["pending", "active", "fulfilled"],
            default: "pending"
        }
    },
    { timestamps: true }
);

const BookDemo= mongoose.model("BookDemo", bookDemoSchema);

export default BookDemo;