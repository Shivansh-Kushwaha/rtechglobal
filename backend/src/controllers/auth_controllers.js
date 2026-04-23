import { generateToken } from "../lib/utils.js";
import User from "../models/user_model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            });
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signing up", error.message);
        res.status(500).json({ message: "Internal server error" });


    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credential" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credential" });
        }
        else {
            generateToken(user._id, res);
            res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                createdAt: user.createdAt
            });
        }
    } catch (error) {
        console.log("Error in loging in", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in loging out", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        // const { fullName, email } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile Pic is required" });
        }
        
        // if (!fullName) {
        //     return res.status(400).json({ message: "Full name is required" });

        // }
        // if (!email) {
        //     return res.status(400).json({ message: "Email is required" });

        // }


        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updates={ profilePic: uploadResponse.secure_url };

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        res.status(200).json(updatedUser);



    } catch (error) {
        console.log("Error in updating profile", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const resetPassword = async (req, res) => {      
    try {
        const { email } = req.body; 
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User with this email does not exist" });
        }

        res.status(200).json({ message: "Password reset instructions have been sent to your email" });
    } catch (error) {
        console.log("Error in resetting password", error.message);
        res.status(500).json({ message: "Internal server error" });
    }   
};
