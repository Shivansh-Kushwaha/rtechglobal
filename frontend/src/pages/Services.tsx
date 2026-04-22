import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Building2, 
  Users, 
  CreditCard, 
  ClipboardCheck, 
  Code,
  ArrowRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    icon: GraduationCap,
    title: "School ERP",
    description: "Complete automation solution for K-12 schools and institutions.",
    slug: "school-erp",
  },
  {
    icon: Building2,
    title: "College ERP",
    description: "Multi-department management system for higher education.",
    slug: "college-erp",
  },
  {
    icon: Users,
    title: "Student Management",
    description: "Centralized student records and academic tracking system.",
    slug: "student-management",
  },
  {
    icon: CreditCard,
    title: "Fee Management",
    description: "Streamlined fee collection, receipts, and financial tracking.",
    slug: "fee-management",
  },
  {
    icon: ClipboardCheck,
    title: "Attendance System",
    description: "Automated attendance tracking for students and staff.",
    slug: "attendance-system",
  },
  {
    icon: Code,
    title: "Custom Development",
    description: "Tailored software solutions for your unique requirements.",
    slug: "custom-development",
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <Helmet>
        <title>Our Services - RTechGlobal | School & College ERP Solutions</title>
        <meta 
          name="description" 
          content="Explore RTechGlobal's affordable automation services for schools and colleges. School ERP, College ERP, Student Management, Fee Management, and more." 
        />
        <link rel="canonical" href="https://rtechglobal.in/services" />
      </Helmet>

      <main className="min-h-screen">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                What We Offer
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Our Services
              </h1>
              <p className="text-lg text-muted-foreground">
                Affordable automation and software solutions designed for schools and colleges. 
                Transform your institution with our comprehensive suite of tools.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section ref={ref} className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={`/services/${service.slug}`}
                    className="group block h-full"
                  >
                    <div className="h-full bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <service.icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all duration-300">
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary/5">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Transform Your Institution?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get in touch with our team to discuss how we can help automate your school or college operations.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300"
              >
                Contact Us Today
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Services;
