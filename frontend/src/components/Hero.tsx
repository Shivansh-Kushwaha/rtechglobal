import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";
import DemoModal from "@/components/DemoModal";

const Hero = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: "linear-gradient(180deg, hsl(214, 95%, 93%) 0%, hsl(210, 40%, 98%) 100%)",
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom section-padding pt-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Trusted by 2+ Institutions
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
              >
                Affordable{" "}
                <span className="gradient-text">Automation</span>{" "}
                <br className="hidden md:block" />
                for Schools & Colleges
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
              >
                Simplify administration, academics, and communication with 
                easy-to-use software designed specifically for educational institutions. 
                Save time and reduce costs without complexity.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button variant="hero" size="xl" onClick={() => setIsDemoModalOpen(true)}>
                  <Play className="w-5 h-5" />
                  Book a Demo
                </Button>
                <Button variant="hero-outline" size="xl" asChild>
                  <a href="#contact">
                    <ArrowRight className="w-5 h-5" />
                    Contact Us
                  </a>
                </Button>
              </motion.div>

            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                <motion.img
                  src={heroIllustration}
                  alt="Educational automation platform dashboard showing school management features"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute -inset-4 bg-primary/5 rounded-3xl -z-10 blur-xl" />
              </div>

              {/* Floating Stats Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -left-6 top-1/4 bg-card rounded-xl shadow-card-hover p-4 hidden md:block"
              >
                <p className="text-2xl font-bold text-primary">70%</p>
                <p className="text-xs text-muted-foreground">Time Saved</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute -right-6 bottom-1/4 bg-card rounded-xl shadow-card-hover p-4 hidden md:block"
              >
                <p className="text-2xl font-bold text-accent">24/7</p>
                <p className="text-xs text-muted-foreground">Support</p>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </>
  );
};

export default Hero;
