import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext.tsx';

const AdminForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [resetEmail, setResetEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);

    const [errors, setErrors] = useState({
    email: ""
  });

  const validateForm = () => {
    const newErrors = { email: "" };
    let isValid = true;

    if (!resetEmail.trim()) {
      newErrors.email = "Email is required";
      toast.error("Email is required");
      isValid = false;
    } else if (!/\S+@gmail\.com/.test(resetEmail) || !/\S+@\S+.\S+/.test(resetEmail)) {
      newErrors.email = "Invalid email format";
      toast.error("Invalid email format");
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (validateForm() !== true)
      return;
    setIsSubmitting(true);
    try {
      await resetPassword(resetEmail);
      toast.success("Password reset link sent! Please check your email.");
    } catch {
      // ignore
    } finally {
      setResetSent(true);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link to="/">
              <img src="/logo.png" alt="RTechGlobal" className="h-10" />
            </Link>
          </div>


          {/* Content */}
          {!resetSent ? (
            <>
              <div className="text-center mb-8">
                
                <h1 className="text-2xl font-bold text-foreground">Forgot Password</h1>
                <p className="text-muted-foreground mt-2">
                  Enter your email and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleForgotPassword} className="space-y-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email Address</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="Enter your email to receive reset instructions"
                    onChange={(e) => setResetEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </form>
              <Link
            to="/a/login"
            className="text-sm text-primary hover:underline flex items-center gap-1 mt-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Check Your Email</h2>
              <p className="text-muted-foreground mb-6">
                We've sent a password reset link to <span className="font-medium text-foreground">{resetEmail}</span>
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/a/login">Return to Login</Link>
              </Button>
            </div>
          )}
          
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-6">
          © 2026 RTechGlobal. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminForgotPassword;