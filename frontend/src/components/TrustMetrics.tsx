import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { School, Layers, Clock, Users } from "lucide-react";

const metrics = [
  {
    icon: School,
    value: "2+",
    label: "Institutions Served",
    description: "Schools & colleges across India",
  },
  {
    icon: Layers,
    value: "10+",
    label: "Modules Available",
    description: "Comprehensive ERP solutions",
  },
  {
    icon: Clock,
    value: "70%",
    label: "Time Saved",
    description: "In administrative tasks",
  },
  {
    icon: Users,
    value: "1,000+",
    label: "Users Impacted",
    description: "Students, teachers & staff",
  },
];

const TrustMetrics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-card py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      
      <div ref={ref} className="container-custom section-padding py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Institutions Across India
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to long-term partnerships, providing reliable support 
            and continuous improvements to help your institution thrive.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-background rounded-2xl p-6 md:p-8 text-center shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50 group-hover:border-primary/30">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  <metric.icon className="w-7 h-7" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {metric.value}
                </p>
                <p className="text-sm font-semibold text-foreground mb-1">
                  {metric.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustMetrics;
