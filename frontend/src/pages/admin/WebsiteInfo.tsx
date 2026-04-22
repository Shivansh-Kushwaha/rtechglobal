import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, Phone, MapPin, Mail, MessageCircle, Instagram, Facebook, Linkedin, Twitter, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useWebInfo } from "@/contexts/WebInfoContext";

const WebsiteInfo = () => {
  const { webInfo, isGettingWebInfo, isUpdatingWebInfo, getWebInfo, updateWebInfo } = useWebInfo();
  const { toast } = useToast();

  const [errors, setErrors] = useState({
    phone: "",
    address: "",
    whatsapp: "",
    email: "",
    footerText: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
  });


  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (value: string) =>
    /^[0-9+\s()-]{7,15}$/.test(value);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    let valid = true;

    const newErrors = {
      phone: "",
      address: "",
      whatsapp: "",
      email: "",
      footerText: "",
      socialLinks: {
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
      },
    };

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Invalid phone number";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      valid = false;
    }

    if (formData.whatsapp && !isValidPhone(formData.whatsapp)) {
      newErrors.whatsapp = "Invalid WhatsApp number";
      valid = false;
    }

    (Object.keys(formData.socialLinks) as Array<
      keyof typeof formData.socialLinks
    >).forEach((key) => {
      const value = formData.socialLinks[key];
      if (value && !isValidUrl(value)) {
        newErrors.socialLinks[key] = "Invalid URL";
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };


  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    whatsapp: "",
    email: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
    footerText: "",
  });

  useEffect(() => {
    if (webInfo) {
      setFormData({
        phone: webInfo.phone || "",
        address: webInfo.address || "",
        whatsapp: webInfo.whatsapp || "",
        email: webInfo.email || "",
        socialLinks: {
          facebook: webInfo.socialLinks?.facebook || "",
          twitter: webInfo.socialLinks?.twitter || "",
          instagram: webInfo.socialLinks?.instagram || "",
          linkedin: webInfo.socialLinks?.linkedin || "",
        },
        footerText: webInfo.footerText || "",
      });
    }
  }, [webInfo]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (
    field: keyof typeof formData.socialLinks,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [field]: value,
      },
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await updateWebInfo(formData);
      toast({
        title: "Saved",
        description: "Website information updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Unable to save website info.",
        variant: "destructive",
      });
    }
  };

  if (isGettingWebInfo && !webInfo) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">Website Information</h1>
        <p className="text-slate-500 mt-2">
          Manage contact information shown on your website.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Phone Number
                  </Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" /> WhatsApp Number
                  </Label>
                  <Input
                    value={formData.whatsapp}
                    onChange={(e) => handleChange("whatsapp", e.target.value)}
                  />
                  {errors.whatsapp && (
                    <p className="text-sm text-red-500">{errors.whatsapp}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Office Address
                </Label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
                {errors.address && (
                    <p className="text-sm text-red-500">{errors.address}</p>
                  )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Mail
                </Label>
                <Input
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Instagram className="h-4 w-4" /> Instagram
                  </Label>
                  <Input
                    value={formData.socialLinks?.instagram || ""}
                    onChange={(e) => handleSocialChange("instagram", e.target.value)}
                  />
                  {errors.socialLinks?.instagram && (
                    <p className="text-sm text-red-500">{errors.socialLinks?.instagram}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Facebook className="h-4 w-4" /> Facebook
                  </Label>
                  <Input
                    value={formData.socialLinks?.facebook || ""}
                    onChange={(e) => handleSocialChange("facebook", e.target.value)}
                  />
                  {errors.socialLinks?.facebook && (
                    <p className="text-sm text-red-500">{errors.socialLinks?.facebook}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </Label>
                  <Input
                    value={formData.socialLinks?.linkedin || ""}
                    onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                  />
                  {errors.socialLinks?.linkedin && (
                    <p className="text-sm text-red-500">{errors.socialLinks?.linkedin}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Twitter className="h-4 w-4" /> Twitter
                  </Label>
                  <Input
                    value={formData.socialLinks?.twitter || ""}
                    onChange={(e) => handleSocialChange("twitter", e.target.value)}
                  />
                  {errors.socialLinks?.twitter && (
                    <p className="text-sm text-red-500">{errors.socialLinks?.twitter}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isUpdatingWebInfo}>
                  {isUpdatingWebInfo ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default WebsiteInfo;
