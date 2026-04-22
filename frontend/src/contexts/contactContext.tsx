import { create } from "zustand"
import { axiosInstance } from "../lib/axios.tsx";
import toast from "react-hot-toast";

export type RequestStatus = "pending" | "active" | "fulfilled";

export interface ContactRequest {
    _id: string;
    fullname: string;
    institution: string;
    email: string;
    phone: number;
    message: string;
    status: RequestStatus;
    createdAt: string;
}

interface ContactState {
    contacts: ContactRequest[];
    isPostingContact: boolean;
    isGettingContact: boolean;
    isupdatingContactStatus: boolean;
    getContact: () => Promise<any>;
    updateContactStatus?: (id: string, status: RequestStatus) => Promise<void>;
    postContact: (data: { fullname: string; institution: string; email: string; phone: number; message: string }) => Promise<void>;
}

export const useContact = create<ContactState>((set, get) => ({
    contacts: [],
    isPostingContact: false,
    isGettingContact: false,
    isupdatingContactStatus: false,

    postContact: async (data) => {
        set({ isPostingContact: true });
        try {
            const response = await axiosInstance.post("/contactus/postcontact", data);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isPostingContact: false });
        }
    },

    getContact: async () => {
        set({ isGettingContact: true });
        try {
            const response = await axiosInstance.get("/contactus/getcontact");
            set({ contacts: response.data });
            return response;
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isGettingContact: false });
        }
    },

    updateContactStatus: async (id, status) => {
        set({ isupdatingContactStatus: true });
        try {
            const response = await axiosInstance.patch(`/contactus/updatecontact/${id}/status`, { status });
            toast.success(response.data.message);
            set({
                contacts: get().contacts.map((c) =>
                    c._id === id ? { ...c, status } : c
                )
            });
            
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isupdatingContactStatus: false });
        }
    },
}));
