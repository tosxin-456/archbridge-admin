// 📁 AdminSidebar.js
import React from "react";
import {
  Home,
  Users,
  Calendar,
  FileText,
  Mail,
  Image,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  BarChart3,
  Heart,
  UserPlus,
  Newspaper
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const AdminSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adminLinks = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: Home,
      description: "Overview & Analytics"
    },
    {
      label: "Programs",
      path: "/admin/programs",
      icon: Calendar,
      description: "Manage Programs"
    },
    {
      label: "Gallery",
      path: "/admin/gallery",
      icon: Image,
      description: "Photo Gallery"
    },
    {
      label: "Messages",
      path: "/admin/messages",
      icon: Mail,
      description: "Contact Messages"
    },
    {
      label: "Donations",
      path: "/admin/donations",
      icon: Heart,
      description: "Donation Records"
    },
    {
      label: "News",
      path: "/admin/news",
      icon: Newspaper,
      description: "News Records & Articles"
    },
    {
      label: "Volunteers",
      path: "/admin/volunteers",
      icon: UserPlus,
      description: "Volunteer Applications"
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`h-screen bg-white shadow-lg z-40 transition-all duration-300 flex flex-col fixed top-0 left-0 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        {!isCollapsed ? (
          <div className="flex items-center space-x-3">
            <img src={logo} className="w-10 h-10" alt="Logo" />
            <div>
              <h1 className="text-lg font-bold text-[#020202]">ArchBridge</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        ) : (
          <img src={logo} className="w-10 h-10 mx-auto" alt="Logo" />
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors ml-2"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-2">
          {adminLinks.map(({ label, path, icon: Icon, description }) => {
            const active = isActive(path);
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`w-full flex items-center px-3 py-3 rounded-lg group transition-all ${
                  active
                    ? "bg-[#195C70] text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-[#195C70]"
                }`}
                title={isCollapsed ? label : ""}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    active
                      ? "text-white"
                      : "text-gray-500 group-hover:text-[#195C70]"
                  } ${isCollapsed ? "mx-auto" : "mr-3"}`}
                />
                {!isCollapsed && (
                  <div className="flex flex-col text-left">
                    <span className="font-medium">{label}</span>
                    <span className="text-xs text-gray-400">{description}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Settings + Logout */}
      <div className="border-t border-gray-200 px-3 py-4 space-y-2">
        {[
          {
            label: "Settings",
            path: "/admin/settings",
            icon: Settings,
            description: "System Settings"
          },
          {
            label: "Profile",
            path: "/admin/profile",
            icon: User,
            description: "Account Settings"
          }
        ].map(({ label, path, icon: Icon, description }) => {
          const active = isActive(path);
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`w-full flex items-center px-3 py-3 rounded-lg group transition-all ${
                active
                  ? "bg-[#195C70] text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-[#195C70]"
              }`}
              title={isCollapsed ? label : ""}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 ${
                  active
                    ? "text-white"
                    : "text-gray-500 group-hover:text-[#195C70]"
                } ${isCollapsed ? "mx-auto" : "mr-3"}`}
              />
              {!isCollapsed && (
                <div className="flex flex-col text-left">
                  <span className="font-medium">{label}</span>
                  <span className="text-xs text-gray-400">{description}</span>
                </div>
              )}
            </button>
          );
        })}

        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-3 rounded-lg transition-all group text-red-600 hover:bg-red-50 hover:text-red-700"
          title={isCollapsed ? "Logout" : ""}
        >
          <LogOut className={`w-5 h-5 ${isCollapsed ? "mx-auto" : "mr-3"}`} />
          {!isCollapsed && (
            <div className="flex flex-col text-left">
              <span className="font-medium">Logout</span>
              <span className="text-xs text-red-400">Sign out of admin</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
