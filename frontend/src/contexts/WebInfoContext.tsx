import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
}

export interface WebInfo {
  phone?: string;
  email?: string;
  address?: string;
  whatsapp?: string;
  socialLinks?: SocialLinks;
  footerText?: string;
}

interface WebsiteInfoState {
  webInfo: WebInfo | null;
  isGettingWebInfo: boolean;
  isUpdatingWebInfo: boolean;
  getWebInfo: () => Promise<void>;
  updateWebInfo: (data: Partial<WebInfo>) => Promise<void>;
}

export const useWebInfo = create<WebsiteInfoState>((set) => ({
  webInfo: null,
  isGettingWebInfo: false,
  isUpdatingWebInfo: false,

  getWebInfo: async () => {
    set({ isGettingWebInfo: true });
    try {
      const res = await axiosInstance.get("/webinfo/getwebinfo");
      set({
        webInfo: res.data,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to load website info"
      );
    } finally {
      set({ isGettingWebInfo: false });
    }
  },

  updateWebInfo: async (data) => {
    set({ isUpdatingWebInfo: true });
    try {
      const res = await axiosInstance.put("/webinfo/updatewebinfo", data);
      set({
        webInfo: res.data,
        isUpdatingWebInfo: false,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to update website info"
      );
      set({ isUpdatingWebInfo: false });
    }
  },
}));
