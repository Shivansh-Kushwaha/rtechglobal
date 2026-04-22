import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustMetrics from "@/components/TrustMetrics";
import Services from "@/components/Services";
import Affordability from "@/components/Affordability";

import Stages from "@/components/Stages";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import BlogSection from "@/components/BlogSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>RTechGlobal - Affordable Automation Solutions for Schools & Colleges</title>
        <meta 
          name="description" 
          content="RTechGlobal provides affordable, easy-to-use ERP and automation software for schools and colleges. Simplify administration, academics, and communication with our modular solutions." 
        />
        <meta name="keywords" content="school ERP, college management software, education automation, student information system, school software India, affordable school ERP" />
        <meta property="og:title" content="RTechGlobal - Affordable Automation for Education" />
        <meta property="og:description" content="Simplify school and college administration with our affordable, easy-to-use automation platform. Trusted by institutions across India." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://rtechglobal.in" />
      </Helmet>

      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <TrustMetrics />
        <Services />
        <Affordability />
        <Stages />
        <WhyChooseUs />
        <Testimonials />
        <BlogSection />
        <CTASection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
