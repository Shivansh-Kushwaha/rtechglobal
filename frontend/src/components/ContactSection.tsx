import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useContact } from "@/contexts/contactContext";
import Toast from "react-hot-toast";
import { useWebInfo } from "@/contexts/WebInfoContext";  

const ContactSection = () => {


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
        href: "https://maps.app.goo.gl/jPR3vr6cGydQVWQ79",
      },
      {
        icon: MessageCircle,
        label: "WhatsApp",
        value: "Chat with us",
        href: "https://wa.me/7755044399",
      },
    ];
  

  const validateForm = (): boolean => {
  if (!formData.fullname.trim()) {
    Toast.error("Name is required");
    return false;
  }

  if (!formData.email.trim()) {
    Toast.error("Email is required");
    return false;
  }

  if (!/\S+@\S+\.\S+/.test(formData.email)) {
    Toast.error("Invalid email format");
    return false;
  }

  if (!formData.institution) {
    Toast.error("Institution is required");
    return false;
  }


  if (!formData.phone.trim()) {
    Toast.error("Phone number is required");
    return false;
  }

  if (formData.phone.length < 10) {
    Toast.error("Phone number must be at least 10 characters");
    return false;
  }

  return true;
};

  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { postContact, isPostingContact } = useContact();
    const [formData, setFormData] = useState({
      fullname: "",
      institution: "",
      email: "",
      phone: "",
      message: "",
    });


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
    <section id="contact" className="bg-background section-padding">
      <div ref={ref} className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Let's Start the Conversation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you have questions or are ready to get started, our team is here to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Your Name *
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
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
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

              {/* Map Placeholder */}
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
  );
};

export default ContactSection;
