import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Heart, Shield, Headphones, Lightbulb, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  {
    icon: Eye,
    title: "Transparency",
    description: "Clear pricing, honest communication, and no hidden costs."
  },
  {
    icon: Heart,
    title: "Accessibility",
    description: "Making technology available to institutions of all sizes."
  },
  {
    icon: Shield,
    title: "Quality",
    description: "Enterprise-grade solutions without enterprise prices."
  },
  {
    icon: Headphones,
    title: "Support",
    description: "Dedicated assistance throughout your automation journey."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Continuously evolving to meet modern educational needs."
  }
];

const missionPoints = [
  {
    title: "Affordability",
    description: "Premium features at prices that work for every institution's budget."
  },
  {
    title: "Simplicity",
    description: "Intuitive interfaces that require minimal training to get started."
  },
  {
    title: "Reliability",
    description: "Stable, secure systems you can depend on every single day."
  },
  {
    title: "Long-term Partnerships",
    description: "We grow with you, adapting to your changing needs over time."
  }
];

const About = () => {
  const storyRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const focusRef = useRef(null);
  
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const focusInView = useInView(focusRef, { once: true, margin: "-100px" });

  return (
    <>
      <Helmet>
        <title>About Us - RTechGlobal | Affordable Automation for Education</title>
        <meta 
          name="description" 
          content="Learn about RTechGlobal's mission to provide affordable automation solutions for schools and colleges. Discover our story, values, and commitment to education." 
        />
        <meta property="og:title" content="About RTechGlobal - Affordable Education Automation" />
        <meta property="og:description" content="Building affordable automation solutions for modern educational institutions." />
        <link rel="canonical" href="https://rtechglobal.in/about" />
      </Helmet>

      <main className="min-h-screen">
        <Navbar />
        
        {/* Hero Section */}
        <section 
          className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(214, 95%, 93%) 0%, hsl(210, 40%, 98%) 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          </div>
          
          <div className="container-custom section-padding pt-0 pb-0 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                About <span className="gradient-text">Us</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Building affordable automation solutions for modern educational institutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story Section */}
        <section ref={storyRef} className="bg-card section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                Why We Started RTechGlobal
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  We witnessed firsthand how schools and colleges struggled with outdated administrative processes. 
                  Paper-based attendance, manual fee collection, scattered communication—these inefficiencies were 
                  costing institutions valuable time and resources.
                </p>
                <p>
                  When we looked at the market, we found that existing ERP solutions were either prohibitively 
                  expensive or overly complex for small to medium-sized institutions. Large vendors charged 
                  lakhs for software that schools barely used, while cheaper alternatives lacked the reliability 
                  and support that educational institutions needed.
                </p>
                <p>
                  We founded RTechGlobal with a simple vision: <strong className="text-foreground">make powerful automation 
                  accessible to every school and college, regardless of their budget.</strong> We believe that 
                  technology should be an enabler, not a barrier—and that's exactly what we're building.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section ref={missionRef} className="bg-background section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Empowering Education Through Technology
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're on a mission to transform how educational institutions operate, one automation at a time.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {missionPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={missionInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-6 border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-foreground mb-3">{point.title}</h3>
                  <p className="text-muted-foreground">{point.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section ref={valuesRef} className="bg-card section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What We Stand For
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These core values guide every decision we make and every product we build.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Education Section */}
        <section ref={focusRef} className="bg-background section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={focusInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Our Focus
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Why We Focus on Education
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Education is the foundation of society, and the people who run educational institutions 
                    deserve tools that make their jobs easier—not harder. We specialize exclusively in the 
                    education sector because we understand its unique challenges.
                  </p>
                  <p>
                    Generic ERP systems often fail in educational settings because they're designed for 
                    businesses, not schools. Features like academic year management, student lifecycle 
                    tracking, parent communication, and fee structures require specialized understanding.
                  </p>
                  <p>
                    By focusing on education, we can build solutions that truly fit how institutions work, 
                    with features that administrators actually need and interfaces that everyone can use.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={focusInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Domain Expertise</h3>
                      <p className="text-muted-foreground">Built for education, by education enthusiasts</p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      Academic calendar integration
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      Student lifecycle management
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      Parent-teacher communication
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      Flexible fee structures
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      Examination & grading systems
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding" style={{ background: "var(--gradient-cta)" }}>
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Let's Build Smarter Institutions Together
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Ready to transform how your institution operates? We're here to help you every step of the way.
              </p>
              <Button variant="secondary" size="xl" asChild>
                <a href="/contact" className="inline-flex items-center gap-2">
                  Contact Us
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default About;
