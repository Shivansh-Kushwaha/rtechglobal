import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState} from "react";
import DemoModal from "@/components/DemoModal";
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Shield, 
  TrendingUp,
  Puzzle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const features = [
  "Complete student profile management with photo and documents",
  "Academic history tracking across all years",
  "Enrollment and admission workflow automation",
  "Class and section assignment management",
  "Parent and guardian information linking",
  "Health records and emergency contact management",
  "Transfer and migration certificate generation",
  "Custom fields for institution-specific data",
];

const benefits = [
  {
    icon: Clock,
    title: "Instant Access",
    description: "Find any student record in seconds with powerful search and filters.",
  },
  {
    icon: DollarSign,
    title: "Paperless Office",
    description: "Eliminate physical files and reduce storage costs significantly.",
  },
  {
    icon: Shield,
    title: "Data Security",
    description: "Role-based access ensures sensitive information stays protected.",
  },
  {
    icon: TrendingUp,
    title: "Better Insights",
    description: "Track student progress and identify trends with detailed analytics.",
  },
];

const StudentManagement = () => {
   const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  return (
    <>
      <Helmet>
        <title>Student Management System - RTechGlobal | Student Information Software</title>
        <meta 
          name="description" 
          content="Centralized Student Management System for schools and colleges. Manage student records, academic history, enrollment, and more efficiently." 
        />
        <link rel="canonical" href="https://rtechglobal.in/services/student-management" />
      </Helmet>

      <main className="min-h-screen">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container-custom">
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/services">Services</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Student Management</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Users className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Student Management System
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  A centralized platform to manage all student information efficiently. 
                  From admission to graduation, track every aspect of the student journey with ease.
                </p>
                <Link
                  to=""
              onClick={() => {
                        setIsDemoModalOpen(true);
                      }}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300"
                >
                  Book a Demo
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl p-8 lg:p-12">
                  <div className="grid grid-cols-2 gap-4">
                    {["Profiles", "Academics", "Documents", "Analytics"].map((item) => (
                      <div key={item} className="bg-background rounded-xl p-4 shadow-card">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <p className="font-semibold text-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Complete Student Records at Your Fingertips
              </h2>
              <p className="text-lg text-muted-foreground">
                Our Student Management System provides a 360-degree view of every student. 
                Access personal details, academic performance, attendance records, and fee status from one unified dashboard.
              </p>
            </motion.div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Key Features</h3>
              <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border/50"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Benefits for Your Institution</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-6 bg-card rounded-2xl border border-border/50"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="section-padding bg-primary/5">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                <Puzzle className="w-7 h-7" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Seamless Integration with Other Modules
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Student Management works as the foundation that connects with all other RTechGlobal modules. 
                Link student records with attendance, fees, and academic modules for complete automation.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["School ERP", "College ERP", "Fee Management", "Attendance System"].map((module) => (
                  <span key={module} className="px-4 py-2 bg-background rounded-full text-sm font-medium text-foreground border border-border/50">
                    {module}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Organize Your Student Data?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Transform how you manage student information with our intuitive management system.
              </p>
              <Link
                to=""
              onClick={() => {
                        setIsDemoModalOpen(true);
                      }}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300"
              >
                Book a Demo
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </>
  );
};

export default StudentManagement;
