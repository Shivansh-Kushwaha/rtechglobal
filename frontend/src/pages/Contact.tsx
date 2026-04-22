import { Helmet } from "react-helmet-async";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Send, Phone, Mail, MapPin, MessageCircle, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useContact } from "@/contexts/contactContext";
import Toast from "react-hot-toast";
import { useWebInfo } from "@/contexts/WebInfoContext";

const Contact = () => {

  const { webInfo } = useWebInfo();

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 " + (webInfo?.phone || "7755044399"),
      href: `tel:${webInfo?.phone || "+917755044399"}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: webInfo?.email || "rtechglobaledu@gmail.com",
      href: `mailto:${webInfo?.email || "rtechglobaledu@gmail.com"}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: webInfo?.address?.split('Plot No.- 176, Kulgaon Rd, Chakeri Ward,').pop()?.split('209402') || "Rooma, Kanpur",
      href: "https://www.google.com/maps/place/Rtechglobal/@26.367088,80.4327267,17z/data=!3m1!4b1!4m6!3m5!1s0x399c43c5ee3e2e0f:0x9d7ee80772f22cc4!8m2!3d26.3670833!4d80.4375976!16s%2Fg%2F11z12l67l7?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat with us",
      href: "https://wa.me/7755044399",
    },
  ];

  const validateForm = () => {
    if (!formData.fullname.trim()) return Toast.error("Name is required");
    if (!formData.email.trim()) return Toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return Toast.error("Invalid email format");
    if (!formData.institution) return Toast.error("Institution is required");
    if (formData.phone.length < 10) return Toast.error("Phone number must be at least 10 characters");
    if (!formData.message.trim()) return Toast.error("Message is required");
    return true;
  }
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const { postContact, isPostingContact } = useContact();
  const [formData, setFormData] = useState({
    fullname: "",
    institution: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) return;

    postContact(formData).then(() => {
      setFormData({
        fullname: "",
        institution: "",
        email: "",
        phone: "",
        message: "",
      });
    });
    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for reaching out. Our team will get back to you within 24 hours.",
    });

  };

  return (
    <>
      <Helmet>
        <title>Contact Us - RTechGlobal | Get in Touch</title>
        <meta name="description" content="Contact RTechGlobal for school and college ERP solutions. Get in touch with our team to discuss your institution's requirements." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 section-padding py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Get in Touch
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Contact Us
              </h1>
              <p className="text-lg text-muted-foreground">
                Get in touch with our team to discuss your requirements. We're here to help you transform your institution.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="section-padding py-16">
          <div className="container-custom">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-3"
              >
                <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-card">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Full Name *
                        </label>
                        <Input
                          required
                          placeholder="Enter name"
                          value={formData.fullname}
                          onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Institution Name *
                        </label>
                        <Input
                          required
                          placeholder="Enter school or institute name"
                          value={formData.institution}
                          onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <Input
                          required
                          type="email"
                          placeholder="Enter E-mail address"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          placeholder="+91 xxxxxxxxxx"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Message *
                      </label>
                      <Textarea
                        required
                        placeholder="Tell us about your institution and what you're looking for..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                      />
                    </div>

                    <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto" disabled={isPostingContact}>
                      <Send className="w-4 h-4" />
                      {isPostingContact ? "Sending..." : "Send Message"}
                    </Button>

                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Our team will get back within 24 hours
                    </p>
                  </form>
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">Contact Details</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center gap-4 p-5 bg-card rounded-xl border border-border/50 hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <info.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        <p className="font-semibold text-foreground">{info.value}</p>
                      </div>
                    </motion.a>
                  ))}

                  {/* Office Location */}
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="font-semibold text-foreground mb-1">Visit Our Office</p>
                    <p className="text-sm text-muted-foreground">
                      {webInfo?.address ? (
                        (() => {
                          const addr = webInfo?.address;
                          if (!addr) return null;

                          const parts = addr.split("Rooma,");

                          return (
                            <>
                              {parts[0]}Rooma,
                              <br />
                              {parts[1]?.trim()}
                            </>
                          );
                        })()
                      ) : (
                        "Plot No.- 176, Kulgaon Rd, Chakeri Ward, Rooma, Kanpur, Uttar Pradesh 209402"
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;