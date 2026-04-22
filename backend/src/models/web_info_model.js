import mongoose from "mongoose";

const webInfoSchema = new mongoose.Schema(
  {
    phone: String,
    email: String,
    address: String,
    whatsapp: String,

    socialLinks: {
      facebook: String,
      instagram: String,
      linkedin: String,
      twitter: String,
    },

    footerText: String
  },
  { timestamps: true }
);

const webinfo = mongoose.model("webinfo", webInfoSchema);

export default webinfo;