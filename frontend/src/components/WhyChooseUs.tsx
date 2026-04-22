import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, IndianRupee, GraduationCap, Phone, Handshake } from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Built for Indian Education",
    description: "Designed specifically for the unique needs of Indian schools and colleges, with local language support.",
  },
  {
    icon: IndianRupee,
    title: "Budget-Friendly Pricing",
    description: "Affordable plans that don't compromise on features. Get enterprise-grade software at SMB prices.",
  },
  {
    icon: GraduationCap,
    title: "Easy Onboarding",
    description: "Quick setup with comprehensive training. Your staff will be productive from day one.",
  },
  {
    icon: Phone,
    title: "Reliable Support Team",
    description: "Dedicated support via phone, email, and WhatsApp. We're always here when you need us.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnership",
    description: "We grow with you. Continuous updates, new features, and strategic guidance included.",
  },
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-background section-padding">
      <div ref={ref} className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Your Success is Our Mission
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're not just a software vendor. We're a partner committed to your 
            institution's digital transformation journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.slice(0, 3).map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <reason.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
          {reasons.slice(3).map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <reason.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
