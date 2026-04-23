import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export interface Blog {
    _id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    content: string;
    blogPic: string;
    createdAt: string;
}

interface BlogState {
    blogs: Blog[];
    selectedBlogId?: Blog;
    selectedBlogSlug?: Blog;

    isGettingBlogs: boolean;
    isGettingBlogById: boolean;
    isGettingBlogBySlug: boolean;
    isCreatingBlog: boolean;
    isUpdatingBlog: boolean;
    isDeletingBlog: boolean;
    isDeletingBlogImage: boolean;
    totalPages: number;
    currentPage: number;


    clearSelectedBlog: () => void;
    getAllBlogs: (page?: number, limit?: number) => Promise<void>;
    getBlogById: (id: string) => Promise<void>;
    createBlog: (data: {
        slug: string;
        title: string;
        excerpt: string;
        category: string;
        readTime: string;
        content: string;
        blogPic: string;
    }) => Promise<void>;
    updateBlog: (id: string, data: {
        slug: string;
        title: string;
        excerpt: string;
        category: string;
        readTime: string;
        content: string;
        blogPic: string;
    }) => Promise<void>;
    deleteBlog: (id: string) => Promise<void>;
    getBlogBySlug: (slug: string) => Promise<void>;
    deleteBlogImage: (id: string) => Promise<void>;

}

export const useBlog = create<BlogState>((set) => ({
    blogs: [],
    selectedBlogId: undefined,
    selectedBlogSlug: undefined,
    isGettingBlogs: false,
    isGettingBlogById: false,
    isGettingBlogBySlug: false,
    isCreatingBlog: false,
    isUpdatingBlog: false,
    isDeletingBlog: false,
    isDeletingBlogImage: false,
    totalPages: 1,
    currentPage: 1,


    clearSelectedBlog: () => set({ selectedBlogId: undefined }),

    deleteBlogImage: async (id) => {
        set({ isDeletingBlogImage: true });
        try {
            await axiosInstance.delete(`/blogs/deleteblogimage/${id}`);
            set((state) => ({
                selectedBlogId: state.selectedBlogId
                    ? { ...state.selectedBlogId, blogPic: "" }
                    : state.selectedBlogId,
            }));
            toast.success("Blog image deleted successfully");
        }
        catch (error: any) {
            toast.error(error?.response?.data?.message || "Error");
        } finally {
            set({ isDeletingBlogImage: false });
        }
    },


    getAllBlogs: async (page = 1, limit = 6) => {
        set({ isGettingBlogs: true });
        try {
            const response = await axiosInstance.get(
                `/blogs?page=${page}&limit=${limit}`
            );
            set({
                blogs: response.data.data,
                totalPages: response.data.totalPages,
                currentPage: response.data.page,
            });
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Error");
        } finally {
            set({ isGettingBlogs: false });
        }
    },

    getBlogBySlug: async (slug) => {
        set({ isGettingBlogBySlug: true , selectedBlogSlug: undefined});
        try {
            const res = await axiosInstance.get(`/blogs/${slug}`);
            set({ selectedBlogSlug: res.data });
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Error");
        } finally {
            set({ isGettingBlogBySlug: false });
        }
    },

    getBlogById: async (id) => {
        set({ isGettingBlogById: true });
        try {
            const response = await axiosInstance.get(`/blogs/id/${id}`);
            set({ selectedBlogId: response.data });
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isGettingBlogById: false });
        }
    },

    createBlog: async (data) => {
        set({ isCreatingBlog: true });
        try {
            const response = await axiosInstance.post("/blogs/createblog", data);
            set((state) => ({
                blogs: [response.data, ...state.blogs],
            }));
            toast.success("Blog created successfully");
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isCreatingBlog: false });
        }
    },

    updateBlog: async (id, data) => {
        set({ isUpdatingBlog: true });
        try {
            const response = await axiosInstance.put(`/blogs/updateblog/${id}`, data);
            set((state) => ({
                blogs: state.blogs.map((d) =>
                    d._id === id ? response.data : d
                ),
                selectedBlog:
                    state.selectedBlogId?._id === id
                        ? response.data
                        : state.selectedBlogId,
            }));

            toast.success("Blog updated successfully");
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isUpdatingBlog: false });
        }
    },

    deleteBlog: async (id) => {
        set({ isDeletingBlog: true });
        try {
            await axiosInstance.delete(`/blogs/deleteblog/${id}`);
            set((state) => ({
                blogs: state.blogs.filter((d) => d._id !== id),
            }));

            toast.success("Blog deleted successfully");
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isDeletingBlog: false });
        }
    },

}));