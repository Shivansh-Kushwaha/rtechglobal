import bookDemoRequests from "../models/bookDemo_model.js"
import { sendBookDemoEmail } from "../services/email_services.js";

export const getBookDemoRequests = async (req, res) => {
    try {
        const UsersBookedDemo = await bookDemoRequests.find({});
        res.status(200).json(UsersBookedDemo);

    } catch (error) {
        console.error("Error in getting UsersBookedDemo", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const postBookDemoRequests = async (req, res) => {
    const { fullname, institution, institutionType, email, phone, city, preferredDate, message } = req.body;
    try {
        if (!fullname || !email || !institution || !phone || !message || !institutionType || !city || !preferredDate) {
            return res.status(400).json({ message: "All fields are required" });
        }
        console.log("Received book demo request:", req.body);

        const user = await bookDemoRequests.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUser = new bookDemoRequests({
            fullname,
            institution,
            institutionType,
            email,
            phone,
            city,
            preferredDate,
            message
        });

        sendBookDemoEmail(email, fullname);
        if (newUser) {
            await newUser.save();

            res.status(200).json({ message: "Your demo request has been sent successfully" });
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in contacting", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateBookDemoStatus = async (req, res) => {
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

        const updatedUser = await bookDemoRequests.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Demo request not found" });
        }

        res.status(200).json({ message: "Demo status updated successfully" });
    } catch (error) {
        console.log("Error in updating demo status", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};