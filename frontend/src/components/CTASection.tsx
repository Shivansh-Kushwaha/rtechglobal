import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import DemoModal from "@/components/DemoModal";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <>
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Gradient Background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, hsl(222, 83%, 35%) 0%, hsl(224, 76%, 25%) 100%)",
          }}
        />
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div ref={ref} className="container-custom section-padding py-0 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 max-w-4xl mx-auto">
              Ready to Automate Your Institution — Without Breaking the Budget?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Join educational institutions that have transformed their operations 
              with our affordable, easy-to-use automation platform.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="xl"
                className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
                onClick={() => setIsDemoModalOpen(true)}
              >
                <Play className="w-5 h-5" />
                Book a Demo
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-2 border-white/30 bg-transparent text-primary-foreground hover:bg-white/10 shadow-md hover:scale-105 transform transition-all duration-300"
                asChild
              >
                <a href="#contact">
                  <ArrowRight className="w-5 h-5" />
                  Contact Our Team
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </>
  );
};

export default CTASection;
