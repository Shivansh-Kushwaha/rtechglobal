import { useEffect } from "react";
import { useWebInfo } from "./contexts/WebInfoContext";
import { useTestimonial } from "./contexts/TestimonialContext";
import { useBlog } from '@/contexts/BlogContext'
import { useAuth } from "./contexts/AuthContext";

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
    const checkAuth = useAuth((state) => state.checkAuth);
  const getWebInfo = useWebInfo((state) => state.getWebInfo);
  const getAllTestimonials = useTestimonial((state) => state.getAllTestimonials)
  const getBlogBySlug = useBlog((state) => state.getBlogBySlug);



  useEffect(() => {
    checkAuth();
    getWebInfo();
    getAllTestimonials();
  }, [checkAuth,getWebInfo, getAllTestimonials, getBlogBySlug,]);

  return <>{children}</>;
};

export default AppInitializer;
