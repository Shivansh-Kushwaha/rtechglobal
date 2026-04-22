import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, UserPlus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Toast from "react-hot-toast";


const AdminRegister = () => {
    const { signUp } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const navigate = useNavigate();
    const { toast } = useToast();


    const validateForm = () => {
        const newErrors = { email: "", password: "", fullName: "", confirmPassword: "" };
        let isValid = true;

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
            Toast.error("Full name is required");
            isValid = false;
        } else if (formData.fullName.split(' ').length < 2) {
            newErrors.fullName = "Full name must be at least 2 words";
            Toast.error("Full name must be at least 2 words");
            isValid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            Toast.error("Email is required");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
            Toast.error("Invalid email format");
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            Toast.error("Password is required");
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
            Toast.error("Password must be at least 8 characters");
            isValid = false;
        }

        if (formData.password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            Toast.error("Passwords do not match");
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };


    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }
        try {
            await signUp(formData);
            toast({
                title: 'Registration Successful',
                description: 'Your account has been created. Please sign in.',
            });
            navigate('/a/login');
        } catch (error) {
            toast({
                title: 'Registration Failed',
                description: error instanceof Error ? error.message : 'Could not create account. Please try again.',
                variant: 'destructive',
            });
        } finally {
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
                            <img src="/logo.png" alt="RTechGlobal" className="h-12" />
                        </Link>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
                        <p className="text-muted-foreground mt-2">Register for admin access</p>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="reg-name">Full Name</Label>
                            <Input
                                id="reg-name"
                                type="text"
                                placeholder="Enter your full name"
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className={errors.fullName ? 'border-destructive' : ''}
                                disabled={isSubmitting}
                            />
                            {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="reg-email">Email</Label>
                            <Input
                                id="reg-email"
                                type="email"
                                placeholder="Enter your email address"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={errors.email ? 'border-destructive' : ''}
                                disabled={isSubmitting}
                            />
                            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="reg-password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="reg-password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a password"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="reg-confirm">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    id="reg-confirm"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Re-enter password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={errors.confirmPassword ? 'border-destructive pr-10' : 'pr-10'}
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                        </div>

                        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link to="/a/login" className="text-primary font-medium hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>

                </div>

                {/* Footer */}
                <p className="text-center text-sm text-slate-500 mt-6">
                    © 2026 RTechGlobal. All rights reserved.
                </p>
            </motion.div>
        </div>
    );
};

export default AdminRegister;