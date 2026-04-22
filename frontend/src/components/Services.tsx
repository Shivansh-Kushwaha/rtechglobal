import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  GraduationCap,
  Users,
  ClipboardCheck,
  CreditCard,
  UserCog,
  ShoppingCart,
  Code,
  HeadphonesIcon,
} from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "School & College ERP",
    description: "Complete institutional management with customizable modules for all departments.",
  },
  {
    icon: Users,
    title: "Student Information System",
    description: "Centralized student records, admissions, and academic history management.",
  },
  {
    icon: ClipboardCheck,
    title: "Attendance & Exams",
    description: "Automated attendance tracking and seamless examination management.",
  },
  {
    icon: CreditCard,
    title: "Fee & Accounting",
    description: "Simplified fee collection, invoicing, and financial reporting.",
  },
  {
    icon: UserCog,
    title: "Faculty & Staff Management",
    description: "HR modules for payroll, leave, and performance tracking.",
  },
  {
    icon: ShoppingCart,
    title: "Point of Sale",
    description: "A streamlined POS system to manage fee transactions, receipts, payments, and financial records efficiently.",
  },
  {
    icon: Code,
    title: "Custom Development",
    description: "Tailored solutions built specifically for your institution's needs.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Reliable technical support available around the clock to ensure uninterrupted operations for schools and colleges.",
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="bg-background section-padding">
      <div ref={ref} className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Complete Automation Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From student management to accounting, we provide everything your institution 
            needs to run efficiently in the digital age.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              <div className="h-full bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
