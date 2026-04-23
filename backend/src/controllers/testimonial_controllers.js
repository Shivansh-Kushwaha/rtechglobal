import Testimonial from "../models/testimonial_model.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    if (!testimonials) {
      return res.status(404).json({ message: "No testimonials found" });
    }
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch testimonials" });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { testimonialPic } = req.body;
    if (!testimonialPic) {
      return res.status(400).json({ message: "Testimonial pic is required" });
    }

    if (testimonialPic) {
      const uploadResponse = await cloudinary.uploader.upload(testimonialPic);
      req.body.testimonialPic = uploadResponse.secure_url;
    }

    const testimonial = await Testimonial.create(req.body);
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ message: "Failed to create testimonial" });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { testimonialPic } = req.body;

    if (!testimonialPic) {
      return res.status(400).json({ message: "Testimonial pic is required" });
    }

    if (testimonialPic) {
      const uploadResponse = await cloudinary.uploader.upload(testimonialPic);
      req.body.testimonialPic = uploadResponse.secure_url;
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    return res.status(200).json(testimonial);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete testimonial" });
  }
};

export const fetchGoogleReviews = async (req, res) => {
  try {

    res.json([
      {
        author_name: "John Doe",
        rating: 5,
        text: "Excellent service!",
      },
    ]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Google reviews" });
  }
};

export const deleteTestimonialPic = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    const urlParts = testimonial.testimonialPic.split('/');
    const fileName = urlParts[urlParts.length - 1];
    
    const publicId = `${fileName.split('.')[0]}`;
    // Delete the image from Cloudinary
    if (testimonial.testimonialPic) {
      await cloudinary.uploader.destroy(publicId);
    }

    // Update the testimonial to remove the image URL
    testimonial.testimonialPic = "";
    await testimonial.save();

    res.json({ message: "Testimonial pic deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete testimonial pic" });
  }
};