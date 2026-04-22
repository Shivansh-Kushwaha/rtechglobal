import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useBookDemo } from "@/contexts/bookdemoContext";
import { useContact } from "@/contexts/contactContext";
import { useBlog } from '@/contexts/BlogContext'
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isCheckingAuth } = useAuth();
  const location = useLocation();
  const getDemo = useBookDemo((state) => state.getDemo);
  const getContact = useContact((state) => state.getContact);
  const getAllBlogs = useBlog((state) => state.getAllBlogs);


  useEffect(() => {
    getAllBlogs();

    getDemo();
    getContact();
  }, [ getDemo, getContact,]);


  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
      </div>
    );
  }

  if (isAuthenticated !== true) {
    return (
      <Navigate
        to="/a/login"
        state={{ from: location }}
        replace
      />
    );
  }
  return <>{children}</>;
};

export default ProtectedRoute;
