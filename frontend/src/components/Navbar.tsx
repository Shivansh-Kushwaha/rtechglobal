import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import DemoModal from "@/components/DemoModal";

const navLinks = [
  { name: "Services", href: "/services", isPage: true },
  { name: "Testimonials", href: "/#testimonials", isPage: true },
  { name: "Blog", href: "/blog", isPage: true },
  { name: "About", href: "/about", isPage: true },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 2);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const isHomePage = location.pathname === "/";

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
      >
        <nav className="fixed mx-auto w-full z-[100] lg:py-4">
          <div className={isScrolled ? "box-border mx-auto w-[1400px] max-2xl:w-[95%] max-xl:w-[95%] max-lg:w-[95%] max-md:w-[95%] max-sm:w-[95%] px-5 lg::px-8 items-center justify-between rounded transition-all py-2 bg-white shadow-lg hidden lg:flex " : "box-border mx-auto w-[1400px] max-2xl:w-[95%] max-xl:w-[95%] max-lg:w-[95%] max-md:w-[95%] max-sm:w-[95%] px-5 lg::px-8 items-center justify-between rounded transition-all py-3 hidden lg:flex"}>
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="RTechGlobal" className="h-9 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-8">
                {navLinks.map((link) =>
                  link.isPage ? (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                    >
                      {link.name}
                    </a>
                  )
                )}
              </div>

              <div className="flex items-center gap-4">
                <Button variant="outline" size="lg" onClick={() => setIsDemoModalOpen(true)}>
                  Book a Demo
                </Button>
                <Button variant="hero" size="lg" asChild>
                  <Link
                    key={"Get Started"}
                    to={"/contact"}
                  >
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={isMobileMenuOpen ? "px-5 py-2 lg:hidden pb-4 bg-white shadow-md" : "px-5 py-2 lg:hidden bg-white shadow-md"}>
            <div className="flex w-full justify-between items-center">
              <Link to="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="RTechGlobal" className="h-9 w-auto" />
              </Link>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-foreground"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:hidden mt-4 pb-4"
                >
                  <div className="flex-col gap-4 mt-4 flex ">
                    {navLinks.map((link) =>
                      link.isPage ? (
                        <Link
                          key={link.name}
                          to={link.href}
                          className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <a
                          key={link.name}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                        >
                          {link.name}
                        </a>
                      )
                    )}

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </nav>
      </motion.header>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </>
  );
};

export default Navbar;
