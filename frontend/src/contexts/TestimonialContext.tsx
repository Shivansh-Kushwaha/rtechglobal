import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import set from "node_modules/react-hook-form/dist/utils/set";

export interface Testimonial {
    _id: string;
    quote: string;
    author: string;
    role: string;
    organization: string;
    location: string;
    testimonialPic: string;
    createdAt: string;
}
export interface GoogleReview {
    _id: string;
    quote: string;
    author: string;
    role: string;
    organization: string;
    location: string;
    testimonialPic: string;
    createdAt: string;
}

interface TestimonialState {
    testimonials: Testimonial[];
    googleReviews: GoogleReview[];
    isGettingTestimonials: boolean;
    isCreatingTestimonial: boolean;
    isUpdatingTestimonial: boolean;
    isDeletingTestimonial: boolean;
    isGoogleReviewsFetching: boolean;
    isdeletingImage: boolean;

    getAllTestimonials: () => Promise<void>;
    fetchGoogleReviews: () => Promise<void>;
    updateTestimonial: (id: string, data: {
        quote?: string;
        author?: string;
        role?: string;
        organization?: string;
        location?: string;
        testimonialPic?: string;
    }) => Promise<void>;
    deleteTestimonial: (id: string) => Promise<void>;
    createTestimonial: (data: {
        quote: string;
        author: string;
        role: string;
        organization: string;
        location: string;
        testimonialPic: string;
    }) => Promise<void>;
    deleteTestimonialPic: (id: string) => Promise<void>;
}

export const useTestimonial = create<TestimonialState>((set, get) => ({
    testimonials: [],
    googleReviews: [],
    isGettingTestimonials: false,
    isCreatingTestimonial: false,
    isUpdatingTestimonial: false,
    isDeletingTestimonial: false,
    isGoogleReviewsFetching: false,
    isdeletingImage: false,

    getAllTestimonials: async () => {
        set({ isGettingTestimonials: true });
        try {
            const response = await axiosInstance.get("/testimonials/");
            set({ testimonials: response.data });
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isGettingTestimonials: false });
        }
    },

    createTestimonial: async (data) => {
        set({ isCreatingTestimonial: true });
        try {
            const response = await axiosInstance.post("/testimonials/createtestimonial", data);
            set((state) => ({
                testimonials: [response.data, ...state.testimonials],
            }));
            toast.success("Testimonial created successfully");
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isCreatingTestimonial: false });
        }
    },

    updateTestimonial: async (id, data) => {
        set({ isUpdatingTestimonial: true });
        try {
            const response = await axiosInstance.put(`/testimonials/updatetestimonial/${id}`, data);
            set((state) => ({
                testimonials: state.testimonials.map((d) =>
                    d._id === id ? response.data : d
                ),
            }));
            toast.success("Testimonial updated successfully");
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isUpdatingTestimonial: false });
        }
    },

    deleteTestimonial: async (id) => {
        set({ isDeletingTestimonial: true });
        try {
            await axiosInstance.delete(`/testimonials/deletetestimonial/${id}`);
            set((state) => ({
                testimonials: state.testimonials.filter((d) => d._id !== id),
            }));

            toast.success("Testimonial deleted successfully");
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isDeletingTestimonial: false });
        }
    },

    fetchGoogleReviews: async () => {
        set({ isGoogleReviewsFetching: true });
        try {
            const response = await axiosInstance.get("/testimonials/google-reviews");
            set({ googleReviews: response.data });
            toast.success("Google reviews fetched successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isGoogleReviewsFetching: false });
        }
    },

    deleteTestimonialPic: async (id) => {
        set({ isdeletingImage: true });
        try {
            const response = await axiosInstance.delete(`/testimonials/deletetestimonialpic/${id}`);
            set((state) => ({
                testimonials: state.testimonials.map((d) =>
                    d._id === id ? { ...d, testimonialPic: "" } : d
                ),
            }));
            toast.success("Testimonial image deleted successfully");
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isdeletingImage: false });
        }
     },
}));