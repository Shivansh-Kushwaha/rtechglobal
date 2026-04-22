import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  MessageSquareQuote,
  Mail,
  Calendar,
  TrendingUp,
  Users,
  Eye,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useBookDemo } from '@/contexts/bookdemoContext';
import { useContact } from '@/contexts/contactContext';
import { useTestimonial } from '@/contexts/TestimonialContext';
import { useBlog } from '@/contexts/BlogContext';

const Dashboard = () => {
  const { authAdmin } = useAuth();
  const { demos } = useBookDemo();
  const { contacts } = useContact();
  const { testimonials } = useTestimonial();
  const { blogs } = useBlog();


  const statCards = [
    {
      title: 'Total Blogs',
      value: blogs.length,
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      title: 'Testimonials',
      value: testimonials.length,
      icon: MessageSquareQuote,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      title: 'Contact Requests',
      value: contacts?.length,
      subtitle: `${contacts?.filter(c => c.status === 'pending').length} Pending`,
      Active: `${contacts?.filter(c => c.status === 'active').length} Active`,
      icon: Mail,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
    {
      title: 'Demo Bookings',
      value: demos?.length,
      subtitle: `${demos?.filter(d => d.status === 'pending').length} Pending`,
      Active: `${demos?.filter(d => d.status === 'active').length} Active`,
      icon: Calendar,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
  ];

  const quickActions = [
    { label: 'Write New Blog', href: '/a/blogs/new', icon: FileText },
    { label: 'Add Testimonial', href: '/a/testimonials', icon: MessageSquareQuote },
    { label: 'View Contacts', href: '/a/contact-requests', icon: Mail },
    { label: 'View Demo Requests', href: '/a/demo-requests', icon: Calendar },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, {authAdmin?.fullName || 'Admin'}!
        </h1>
        <p className="text-slate-500 mt-2">
          Here's an overview of your website's activity.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                <span className='flex justify-between'>
                <p className="text-sm text-slate-500 mt-1">{stat.subtitle}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.Active}</p>
                </span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center justify-center p-4 rounded-lg border border-slate-200 hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <action.icon className="h-6 w-6 text-slate-400 group-hover:text-primary mb-2" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-primary text-center">
                    {action.label}
                  </span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >

      </motion.div>
    </div>
  );
};

export default Dashboard;