import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { LayoutDashboard, Briefcase, GraduationCap, BarChart3, User, LogOut, Settings, Bell, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useApp } from "../context/useApp";

export function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useApp();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const handleLogout = () => {
    navigate('/login');
  };

  const navItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/portfolio", icon: Briefcase, label: "Portfolio" },
    { path: "/learning", icon: GraduationCap, label: "Learning" },
    { path: "/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/profile", icon: User, label: "Profile" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <motion.aside
        initial={false}
        animate={{ width: isSidebarExpanded ? 256 : 80 }}
        className="bg-white border-r border-gray-200 flex flex-col shadow-lg"
      >
        <div className="p-6 border-b border-gray-200">
          <motion.div
            animate={{ opacity: isSidebarExpanded ? 1 : 0 }}
            className="overflow-hidden"
          >
            {isSidebarExpanded && (
              <>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  DevPath
                </h1>
                <p className="text-sm text-gray-500 mt-1">Professional Growth Platform</p>
              </>
            )}
          </motion.div>
          {!isSidebarExpanded && (
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
              DP
            </div>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className="block"
              >
                <motion.div
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                  {isSidebarExpanded && <span className="font-medium">{item.label}</span>}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 w-full transition-all"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarExpanded && <span className="font-medium">Logout</span>}
          </motion.button>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects, courses, skills..."
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-gray-100 rounded-xl relative transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </motion.button>

              <Link to="/profile">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {user?.name.charAt(0)}
                    </div>
                  )}
                  <div className="text-left hidden md:block">
                    <div className="text-sm font-semibold text-gray-900">{user?.name}</div>
                    <div className="text-xs text-gray-500">View Profile</div>
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
