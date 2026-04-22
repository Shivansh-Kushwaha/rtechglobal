import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Globe, 
  FileText, 
  MessageSquareQuote, 
  Mail, 
  Calendar, 
  LogOut,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/a/dashboard' },
  { icon: Globe, label: 'Website Info', path: '/a/website-info' },
  { icon: FileText, label: 'Blogs', path: '/a/blogs' },
  { icon: MessageSquareQuote, label: 'Testimonials', path: '/a/testimonials' },
  { icon: Mail, label: 'Contact Requests', path: '/a/contact-requests' },
  { icon: Calendar, label: 'Demo Requests', path: '/a/demo-requests' },
];

const AdminSidebar = () => {
  const { logout, authAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/a/login');
  };

  const [collapsed, setCollapsed] = useState(
  () => window.matchMedia("(max-width: 768px)").matches
);

useEffect(() => {
  const mediaQuery = window.matchMedia("(max-width: 768px)");

  const handleChange = (e: MediaQueryListEvent) => {
    setCollapsed(e.matches);
  };

  mediaQuery.addEventListener("change", handleChange);

  return () => {
    mediaQuery.removeEventListener("change", handleChange);
  };
}, []);

  return (
    
    
    <aside
      className={cn(
        "min-h-screen bg-slate-900 text-white flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Link to="/">
            <img src="/logo.png" alt="RTechGlobal" className="h-8" />
            </Link>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-white hover:bg-slate-800"
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-slate-700">
        {!collapsed && authAdmin && (
          <div className="mb-3 px-3">
            <p className="text-sm font-medium truncate">{authAdmin.fullName}</p>
            <p className="text-xs text-slate-400 truncate">{authAdmin.email}</p>
          </div>
        )}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full text-slate-300 hover:text-white hover:bg-slate-800",
            collapsed ? "justify-center px-2" : "justify-start"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;