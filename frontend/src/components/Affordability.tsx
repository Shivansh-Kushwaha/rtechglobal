import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Sparkles, Puzzle, TrendingDown, Scale } from "lucide-react";

const valuePoints = [
  {
    icon: Sparkles,
    title: "Simple Pricing",
    description: "No hidden fees or complex licensing. What you see is what you pay.",
  },
  {
    icon: Puzzle,
    title: "Modular ERP",
    description: "Choose only the modules you need. Start small, expand as you grow.",
  },
  {
    icon: TrendingDown,
    title: "Budget-Friendly",
    description: "Designed specifically for institutions with limited IT budgets.",
  },
  {
    icon: Scale,
    title: "Scalable Plans",
    description: "From small schools to large universities - we scale with you.",
  },
];

const benefits = [
  "No per-student pricing traps",
  "Free initial consultation",
  "Flexible payment options",
  "No long-term contracts required",
  "Training included in every plan",
  "Dedicated account manager",
];

const Affordability = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative bg-card section-padding overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div ref={ref} className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              Affordability First
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Quality Software at{" "}
              <span className="gradient-text">Honest Prices</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We believe every educational institution deserves access to modern 
              automation tools, regardless of budget. Our modular approach means 
              you only pay for what you actually need.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {valuePoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-background rounded-2xl p-6 border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <point.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Affordability;
