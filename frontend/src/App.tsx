import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import ScrollToTop from "@/components/ScrollToTop";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";

/* ---------- Public Pages ---------- */
import Index from "@/pages/Index";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

/* ---------- Policy Pages ---------- */
import PrivacyPolicy from "@/pages/policy/PrivacyPolicy";
import TermsConditions from "@/pages/policy/TermsConditions";
import CookiePolicy from "@/pages/policy/CookiePolicy";
import Security from "@/pages/policy/Security";
import RefundPolicy from "@/pages/policy/RefundPolicy";

/* ---------- Services Pages ---------- */
import SchoolERP from "@/pages/services/SchoolERP";
import CollegeERP from "@/pages/services/CollegeERP";
import StudentManagement from "@/pages/services/StudentManagement";
import FeeManagement from "@/pages/services/FeeManagement";
import AttendanceSystem from "@/pages/services/AttendanceSystem";
import CustomDevelopment from "@/pages/services/CustomDevelopment";

/* ---------- Admin Pages ---------- */
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminSignUp from "@/pages/admin/AdminSignUp";
import AdminForgotPassword from "@/pages/admin/AdminForgotPassword";
import Dashboard from "@/pages/admin/Dashboard";
import WebsiteInfo from "@/pages/admin/WebsiteInfo";
import Blogs from "@/pages/admin/Blogs";
import BlogEditor from "@/pages/admin/BlogEditor";
import Testimonials from "@/pages/admin/Testimonials";
import ContactRequests from "@/pages/admin/ContactRequests";
import DemoRequests from "@/pages/admin/DemoRequests";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
const { isAuthenticated, checkAuth } = useAuth();


  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <ScrollToTop />
            <Toaster />
            <Sonner />
            <Routes>
              {/* ================= PUBLIC ROUTES ================= */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />

              {/* ================= SERVICES ROUTES ================= */}
              <Route path="/services/school-erp" element={<SchoolERP />} />
              <Route path="/services/college-erp" element={<CollegeERP />} />
              <Route path="/services/student-management" element={<StudentManagement />} />
              <Route path="/services/fee-management" element={<FeeManagement />} />
              <Route path="/services/attendance-system" element={<AttendanceSystem />} />
              <Route path="/services/custom-development" element={<CustomDevelopment />} />

              {/* ================= POLICY ROUTES ================= */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/security" element={<Security />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />

              {/* ================= ADMIN ROUTES ================= */}
              <Route path="/a/login" element={isAuthenticated ? <Navigate to="/a" replace /> : <AdminLogin />} />
              <Route path="/a/signup" element={isAuthenticated ? <Navigate to="/a" replace /> :<AdminSignUp />} />
              <Route path="/a/forgot-password" element={isAuthenticated ? <Navigate to="/a" replace /> :<AdminForgotPassword />} />
              <Route
                path="/a"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="website-info" element={<WebsiteInfo />} />
                <Route path="contact-requests" element={<ContactRequests />} />
                <Route path="demo-requests" element={<DemoRequests />} />
                <Route path="testimonials" element={<Testimonials />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="blogs/new" element={<BlogEditor />} />
                <Route path="blogs/edit/:id" element={<BlogEditor />} />

              </Route>

              {/* ================= FALLBACK ================= */}
              <Route path="*" element={<NotFound />} />
            </Routes>

          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
