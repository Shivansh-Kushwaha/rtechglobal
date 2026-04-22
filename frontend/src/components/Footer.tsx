import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Twitter, Linkedin,Instagram,Facebook ,Mail, Phone, MapPin } from "lucide-react";
import { useWebInfo } from "@/contexts/WebInfoContext";

const footerLinks = {
  services: [
    { name: "School ERP", href: "/services/school-erp" },
    { name: "College ERP", href: "/services/college-erp" },
    { name: "Student Management", href: "/services/student-management" },
    { name: "Fee Management", href: "/services/fee-management" },
    { name: "Attendance System", href: "/services/attendance-system" },
    { name: "Custom Development", href: "/services/custom-development" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
 
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-conditions" },
    { name: "Cookie Policy", href: "/cookie-policy" },
    { name: "Security", href: "/security" },
    { name: "Refund & Cancellation", href: "/refund-policy" },
  ],
};

const Footer = () => {
const {webInfo} = useWebInfo();

const socialLinks = [
  { icon: Twitter, href: webInfo?.socialLinks?.twitter || "", label: "Twitter" },
  { icon: Linkedin, href: webInfo?.socialLinks?.linkedin || "", label: "LinkedIn" },
  {icon:Instagram, href: webInfo?.socialLinks?.instagram || "", label: "Instagram"},
  {icon:Facebook, href: webInfo?.socialLinks?.facebook || "", label: "Facebook"},
];

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container-custom section-padding py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <a href="/" className="flex items-center gap-2 mb-6">
                <img src="/logo.png" alt="RTechGlobal" className="h-10 w-auto brightness-0 invert" />
              </a>
              <p className="text-primary-foreground/70 mb-6 max-w-sm">
                {webInfo?.footerText || "Making digital automation affordable and accessible for educational institutions across India. Your partner in digital transformation."} 
              </p>
              <div className="space-y-3">
                <a href={`mailto:${webInfo?.email || "rtechglobaledu@gmail.com"}`} className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  <Mail className="w-4 h-4" />
                  {webInfo?.email || "rtechglobaledu@gmail.com"}
                </a>
                <a href={`tel:${webInfo?.phone || "+91 7755044399"}`} className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  <Phone className="w-4 h-4" />
                  {"+91 " + (webInfo?.phone || "7755044399")}
                </a>
                <p className="flex items-center gap-3 text-primary-foreground/70">
                  <MapPin className="w-4 h-4" />
                  {webInfo?.address?.split('Plot No.- 176, Kulgaon Rd, Chakeri Ward,').pop()?.split('209402') || "Rooma, Kanpur, Uttar Pradesh"}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>


          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-b border-primary-foreground/10 mt-8 pt-4  pb-4 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-primary-foreground">
            © 2026 RTechGlobal. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
