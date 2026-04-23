import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Quote, GraduationCap, Building, School, ChevronLeft, ChevronRight } from "lucide-react";
import { useTestimonial } from "@/contexts/TestimonialContext";



const Testimonials = () => {
  const { testimonials } = useTestimonial();
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

const hasData = testimonials && testimonials.length > 0;
const safeTestimonials = testimonials ?? [];
const len = safeTestimonials.length;

const getIndex = (offset: number) => {
  if (len === 0) return undefined;
  const i = (currentIndex + offset + len) % len;
  return safeTestimonials[i];
};

 const handlePrev = () => {
  if (!hasData) return;
  setDirection(-1);
  setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
};

const handleNext = () => {
  if (!hasData) return;
  setDirection(1);
  setCurrentIndex((prev) => (prev + 1) % testimonials.length);
};

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 10,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
    }),
  };


  return (
    <section id="testimonials" className="bg-card section-padding" >
      <div ref={ref} className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from educational institutions that have transformed their operations with our solutions.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center min-h-[400px] md:min-h-[450px]">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-4 z-20 p-2 md:p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          {/* Cards Container */}
          <div className="relative w-full max-w-5xl flex items-center justify-center">
            {/* Left Side Card */}
            <motion.div
              key={`left-${getIndex(-1)}`}
              className="absolute left-0 md:left-8 w-24 md:w-32 h-64 md:h-80 cursor-pointer hidden sm:block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 0.6, x: 0, rotateY: 15 }}
              whileHover={{ opacity: 0.8, scale: 1.02 }}
              onClick={handlePrev}
              style={{ transformStyle: "preserve-3d" }}
            >

              <div className="h-full bg-muted rounded-2xl border border-border/50 flex items-center justify-center overflow-hidden">
                <span className="text-muted-foreground font-medium text-sm writing-mode-vertical transform -rotate-180" style={{ writingMode: "vertical-rl" }}>
                  {getIndex(-1)?.author}
                </span>
              </div>
            </motion.div>
            {/* Left Second Card */}
            <motion.div
              key={`left2-${getIndex(-2)}`}
              className="absolute left-8 md:left-20 w-20 md:w-28 h-56 md:h-72 hidden lg:block"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 0.4, x: 0, rotateY: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="h-full bg-muted/60 rounded-2xl border border-border/30 flex items-center justify-center overflow-hidden">
                <span className="text-muted-foreground/60 font-medium text-xs writing-mode-vertical transform -rotate-180" style={{ writingMode: "vertical-rl" }}>
                </span>
              </div>
            </motion.div>
            {/* Main Center Card */}
            <div className="relative w-full max-w-lg md:max-w-xl z-10 px-4">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                  }}
                  className="bg-background rounded-2xl p-6 md:p-8 border border-border/50 shadow-xl"
                >
                  <div className="flex items-start gap-4 md:gap-5 mb-6">
                    <div className="relative shrink-0">
                      <img
                        src={testimonials[currentIndex]?.testimonialPic || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonials[currentIndex]?.author)}&background=random&color=fff&size=128`}
                        alt={testimonials[currentIndex]?.author}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-primary/20"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Quote className="w-3 h-3 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-lg">{testimonials[currentIndex]?.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonials[currentIndex]?.role}</p>
                      <p className="text-sm text-muted-foreground">{testimonials[currentIndex]?.organization}</p>
                      <p className="text-xs text-primary font-medium">{testimonials[currentIndex]?.location}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed italic text-sm md:text-base">
                    "{testimonials[currentIndex]?.quote}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Right Side Card */}
            <motion.div
              key={`right-${getIndex(1)}`}
              className="absolute right-0 md:right-8 w-24 md:w-32 h-64 md:h-80 cursor-pointer hidden sm:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 0.6, x: 0, rotateY: -15 }}
              whileHover={{ opacity: 0.8, scale: 1.02 }}
              onClick={handleNext}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="h-full bg-muted rounded-2xl border border-border/50 flex items-center justify-center overflow-hidden">
                <span className="text-muted-foreground font-medium text-sm" style={{ writingMode: "vertical-rl" }}>
                  {getIndex(1)?.author}
                </span>
              </div>
            </motion.div>
            {/* Right Second Card */}
            <motion.div
              key={`right2-${getIndex(2)}`}
              className="absolute right-8 md:right-20 w-20 md:w-28 h-56 md:h-72 hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 0.4, x: 0, rotateY: -20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="h-full bg-muted/60 rounded-2xl border border-border/30 flex items-center justify-center overflow-hidden">
                <span className="text-muted-foreground/60 font-medium text-xs" style={{ writingMode: "vertical-rl" }}>
                </span>
              </div>
            </motion.div>
          </div>
          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 md:right-4 z-20 p-2 md:p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-border" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Trusted by Educational Institutions
            </span>
            <div className="w-12 h-px bg-border" />
          </div>

          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Schools, colleges, and training centers across India rely on our platform for seamless automation.
          </p>

          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 text-muted-foreground/60">
              <School className="w-6 h-6" />
              <span className="text-sm font-medium">Schools</span>
            </div>
            <div className="w-px h-6 bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-muted-foreground/60">
              <GraduationCap className="w-6 h-6" />
              <span className="text-sm font-medium">Colleges</span>
            </div>
            <div className="w-px h-6 bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-muted-foreground/60">
              <Building className="w-6 h-6" />
              <span className="text-sm font-medium">Training Centers</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
