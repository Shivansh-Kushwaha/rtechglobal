import contactUS from "../models/contactUs_model.js"
import { sendContactUsEmail } from "../services/email_services.js";

export const getContactedUs = async (req, res) => {
    try {
        const UsersContacted = await contactUS.find({});
        
        if (!UsersContacted || UsersContacted.length === 0) {
            return res.status(404).json({ message: "No contacted users found" });
        }

        res.status(200).json(UsersContacted);

    } catch (error) {
        console.error("Error in getting UsersContacted", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const postContactedUs = async (req, res) => {

    const { fullname, institution, email, phone, message } = req.body;

    try {
        if (!fullname || !email || !institution || !phone || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await contactUS.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUser = new contactUS({
            fullname,
            email,
            institution,
            phone,
            message
        });

        sendContactUsEmail(email, fullname);

        if (newUser) {
            await newUser.save();
            res.status(200).json({ message: "Your message has been sent successfully" });
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in contacting", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateContactedUsStatus = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    try {
        if (!id || !status) {
            return res.status(400).json({ message: "ID and status are required" });
        }

        const validStatuses = ["pending", "active", "fulfilled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(", ")}` });
        }

        const updatedUser = await contactUS.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Contact request not found" });
        }

        res.status(200).json({ message: "Contact status updated successfully", user: updatedUser });
    } catch (error) {
        console.log("Error in updating contact status", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};