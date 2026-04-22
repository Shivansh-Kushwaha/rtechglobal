import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Calendar, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Toast from "react-hot-toast";
import { useBookDemo } from "@/contexts/bookdemoContext.tsx";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type formData = {
  fullname: string;
  institution: string;
  institutionType: string;
  email: string;
  phone: string;
  city: string;
  preferredDate: string;
  message: string;
};

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {

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

    if (!formData.institutionType) {
      Toast.error("Institution type is required");
      return false;
    }

    if (!formData.city) {
      Toast.error("City is required");
      return false;
    }

    if (!formData.preferredDate) {
      Toast.error("Preferred date is required");
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { postDemo, isPostingDemo } = useBookDemo();
  const [formData, setFormData] = useState<formData>({
    fullname: "",
    institution: "",
    institutionType: "",
    email: "",
    phone: "",
    city: "",
    preferredDate: "",
    message: ""
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const isValid = validateForm();
    if (!isValid) return;

    postDemo(formData).then(() => {
      setFormData({
        fullname: "",
        institution: "",
        institutionType: "",
        email: "",
        phone: "",
        city: "",
        preferredDate: "",
        message: "",
      });
    });

    toast({
      title: "Demo Booked!",
      description: "Our team will contact you shortly to schedule your demo.",
    });

  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({
      fullname: "",
      institution: "",
      institutionType: "",
      email: "",
      phone: "",
      city: "",
      preferredDate: "",
      message: "",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card border-b border-border/50 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Book a Demo</h2>
                  <p className="text-sm text-muted-foreground">Schedule a personalized walkthrough</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-8">
                    Our team will contact you shortly to schedule your demo.
                    We typically respond within 24 hours.
                  </p>
                  <Button onClick={handleClose} variant="hero">
                    Close
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
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
                        Institution Type *
                      </label>
                      <select
                        required
                        value={formData.institutionType}
                        onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
                        className="w-full h-12 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Select type</option>
                        <option value="school">School</option>
                        <option value="college">College</option>
                        <option value="coaching">Coaching Institute</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        required
                        type="email"
                        placeholder="Enter E-mail Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <Input
                        required
                        type="tel"
                        placeholder="+91 xxxxxxxxxx"
                        value={formData.phone}
                        onChange={(e) => {
                          // allow only digits
                          const onlyDigits = e.target.value.replace(/\D/g, "");

                          // limit to 10 numbers
                          const limited = onlyDigits.slice(0, 10);

                          setFormData({ ...formData, phone: limited })}
                        }
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        City / Location *
                      </label>
                      <Input
                        required
                        placeholder="Enter location"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Preferred Date *
                      </label>
                      <Input
                        required
                        type="date"
                        placeholder="Enter preferred date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="h-12"
                      />
                    </div>
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message / Requirements (Optional)
                    </label>
                    <Textarea
                      placeholder="Tell us about your specific requirements or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isPostingDemo}>
                    <Calendar className="w-5 h-5" />
                    {isPostingDemo ? "Booking..." : "Book Demo"}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoModal;
