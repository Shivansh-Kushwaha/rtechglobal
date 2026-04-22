import { create } from "zustand"
import { axiosInstance } from "../lib/axios.tsx";
import toast from "react-hot-toast";

export type RequestStatus = "pending" | "active" | "fulfilled";

export interface DemoRequest {
    _id: string;
    fullname: string;
    institution: string;
    institutionType: string;
    email: string;
    phone: number;
    preferredDate: string;
    city: string;
    message: string;
    status: RequestStatus;
    createdAt: string;
}

interface BookDemoState {
    demos: DemoRequest[];
    isGettingDemo: boolean;
    isUpdatingDemoStatus: boolean;
    isPostingDemo: boolean;
    getDemo: () => Promise<any>;
    updateDemoStatus?: (id: string, status: RequestStatus) => Promise<void>;
    postDemo: (data: {
        fullname: string;
        institution: string;
        institutionType: string;
        email: string;
        phone: number;
        city: string;
        preferredDate: string;
        message: string;
    }) => Promise<void>;
}


export const useBookDemo = create<BookDemoState>((set, get) => ({
    demos: [],
    isGettingDemo: false,
    isUpdatingDemoStatus: false,
    isPostingDemo: false,

    postDemo: async (data) => {
        set({ isPostingDemo: true });
        try {
            await axiosInstance.post("/bookdemo/postdemo", data);
            toast.success("Demo booked successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isPostingDemo: false });
        }
    },

    getDemo: async () => {
        set({ isGettingDemo: true });
        try {
            const response = await axiosInstance.get("/bookdemo/getdemo");
            set({ demos: response.data });
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isGettingDemo: false });
        }
    },

    updateDemoStatus: async (id, status) => {
        set({ isUpdatingDemoStatus: true });
        try {
            const response = await axiosInstance.patch(`/bookdemo/updatedemo/${id}/status`, { status });
            toast.success(response.data.message);
            set({
                demos: get().demos.map((d) =>
                    d._id === id ? { ...d, status } : d
                )
            });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingDemoStatus: false });
        }
    },

}));
