import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface Admin {
  id: string;
  fullName: string;
  email: string;
}

interface AuthState {
  authAdmin: Admin | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isSigningUp: boolean;
  isresettingPassword: boolean;

  checkAuth: () => Promise<void>;
  signUp: (data: { fullName: string; email: string; password: string }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<Admin>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  authAdmin: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isSigningUp: false,
  isresettingPassword: false,

  /* ---------------- CHECK AUTH ---------------- */
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({
        authAdmin: res.data,
        isAuthenticated: true,
      });
    } catch (error) {
      console.log("Error in CheckAuth", error);
      set({
        authAdmin: null,
        isAuthenticated: false,
      });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  /* ---------------- SIGN UP ---------------- */
  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);   
      set({
        authAdmin: res.data,
        isAuthenticated: true,
      });
      toast.success("Signed up successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Sign up failed"
      );
    } finally {
      set({ isSigningUp: false });
    }
  },

  /* ---------------- LOGIN ---------------- */
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);

      set({
        authAdmin: res.data,
        isAuthenticated: true,
      });

      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed"
      );
    } finally {
      set({ isLoggingIn: false });
    }
  },

  /* ---------------- LOGOUT ---------------- */
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({
        authAdmin: null,
        isAuthenticated: false,
      });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Logout failed"
      );
    }
  },

  /* ---------------- UPDATE PROFILE ---------------- */
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);

      set({
        authAdmin: res.data,
      });

      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Update failed"
      );
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  /* ---------------- RESET PASSWORD ---------------- */
  resetPassword: async (email) => {
    set({ isresettingPassword: true });   
    try {
      await axiosInstance.post("/auth/reset-password", { email });
      toast.success("Password reset link sent to your email");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Password reset failed"
      );
    } finally {
      set({ isresettingPassword: false });
    }
  }
  
}));
