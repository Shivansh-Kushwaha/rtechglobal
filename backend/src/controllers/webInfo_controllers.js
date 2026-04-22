import WebsiteInfo from "../models/web_info_model.js";

export const getWebsiteInfo = async (req, res) => {
  try {
    let info = await WebsiteInfo.findOne();
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch website info" });
  }
};


export const updateWebsiteInfo = async (req, res) => {
  try {
    const info = await WebsiteInfo.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    
    res.status(200).json(info);
  } catch (error) {
    res.status(400).json({ message: "Failed to update website info" });
  }
};


