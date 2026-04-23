import { useEffect } from "react";
import { useWebInfo } from "./contexts/WebInfoContext";
import { useTestimonial } from "./contexts/TestimonialContext";

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const getWebInfo = useWebInfo((state) => state.getWebInfo);
  const getAllTestimonials = useTestimonial((state) => state.getAllTestimonials)

  useEffect(() => {
    getWebInfo();
    getAllTestimonials();
  }, [getWebInfo, getAllTestimonials]);

  return <>{children}</>;
};

export default AppInitializer;
