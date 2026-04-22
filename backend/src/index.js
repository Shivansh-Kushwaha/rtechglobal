import express from "express";
import dotenv from "dotenv";

// routes imports
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import demoRoutes from "./routes/demo.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import webInfoRoutes from "./routes/webInfo.routes.js";

import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path";


dotenv.config();
const app=express();
const PORT=process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:8080",
    credentials:true
}))

app.use("/auth",authRoutes);
app.use("/contactus",contactRoutes);
app.use("/bookdemo",demoRoutes);
app.use("/testimonials",testimonialRoutes);
app.use("/blogs",blogRoutes);
app.use("/webinfo",webInfoRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend", "dist", "index.html"));
    })
}

app.listen(PORT ,()=>{
    console.log("server is running on PORT: ",PORT);
    connectDB();
});