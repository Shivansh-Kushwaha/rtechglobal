import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState} from "react";
import DemoModal from "@/components/DemoModal";
import { 
  Building2, 
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
  "Multi-department and multi-campus management",
  "Course and curriculum management system",
  "Advanced student enrollment and registration",
  "Faculty workload and scheduling management",
  "Research and publication tracking",
  "Placement and internship management",
  "Hostel and accommodation management",
  "Alumni relationship management",
];

const benefits = [
  {
    icon: Clock,
    title: "Streamlined Operations",
    description: "Reduce administrative complexity across multiple departments and campuses.",
  },
  {
    icon: DollarSign,
    title: "Cost Efficiency",
    description: "Optimize resource allocation and reduce operational overhead significantly.",
  },
  {
    icon: Shield,
    title: "Data Integrity",
    description: "Maintain accurate records with built-in validation and audit trails.",
  },
  {
    icon: TrendingUp,
    title: "Advanced Analytics",
    description: "Make data-driven decisions with comprehensive reporting and dashboards.",
  },
];

const CollegeERP = () => {
   const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  return (
    <>
      <Helmet>
        <title>College ERP Software - RTechGlobal | Higher Education Management System</title>
        <meta 
          name="description" 
          content="Advanced College ERP solution for universities and higher education. Multi-department management, course scheduling, research tracking, and more." 
        />
        <link rel="canonical" href="https://rtechglobal.in/services/college-erp" />
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
                  <BreadcrumbPage>College ERP</BreadcrumbPage>
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
                  <Building2 className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  College ERP Software
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  A comprehensive management system designed for universities and colleges. 
                  Handle complex multi-department operations, advanced reporting, and institutional scalability.
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
                    {["Multi-Campus", "Departments", "Research", "Placements"].map((item) => (
                      <div key={item} className="bg-background rounded-xl p-4 shadow-card">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                          <Building2 className="w-5 h-5 text-primary" />
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
                Multi-Department Management Made Simple
              </h2>
              <p className="text-lg text-muted-foreground">
                Our College ERP is built to handle the complexity of higher education institutions. 
                From managing multiple departments and courses to tracking research publications and placement records, 
                everything is organized in one powerful platform.
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
                College ERP integrates smoothly with all RTechGlobal modules. Connect fee management, 
                attendance systems, and custom solutions to create a unified ecosystem that scales with your institution.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Student Management", "Fee Management", "Attendance System", "Custom Development"].map((module) => (
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
                Ready to Elevate Your College Operations?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join leading colleges and universities that trust RTechGlobal for their digital transformation.
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

export default CollegeERP;
