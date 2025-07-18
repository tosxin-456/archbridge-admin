import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminNewsPage from "./pages/news";
import DonationAdminDashboard from "./pages/donations";
import VolunteersAdminPage from "./pages/Volunteer";
import ContactAdminPage from "./pages/contact-us";
import AdminDashboard from "./pages/dashboard/eindex";
import AdminSettingsPage from "./pages/settings";
import AdminProfilePage from "./pages/profile";
import ProgramsPage from "./pages/programs";
import GalleryPage from "./pages/gallery";

// Dummy pages for routing (you can replace them with your actual components)
const Dashboard = () => <div className="p-6">Dashboard Page</div>;
const Users = () => <div className="p-6">Users Page</div>;
const Programs = () => <div className="p-6">Programs Page</div>;
const Articles = () => <div className="p-6">Articles Page</div>;
const Gallery = () => <div className="p-6">Gallery Page</div>;
const Messages = () => <div className="p-6">Messages Page</div>;
const Donations = () => <div className="p-6">Donations Page</div>;
const Volunteers = () => <div className="p-6">Volunteers Page</div>;
const News = () => <div className="p-6">News Page</div>;
const Analytics = () => <div className="p-6">Analytics Page</div>;
const Settings = () => <div className="p-6">Settings Page</div>;
const Profile = () => <div className="p-6">Profile Page</div>;
const Login = () => <div className="p-6">Admin Login Page</div>;


const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex">
      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        className={`flex-1 ml-${
          isCollapsed ? "16" : "64"
        } transition-all duration-300`}
      >
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="programs" element={<ProgramsPage />} />
          <Route path="articles" element={<Articles />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="messages" element={<ContactAdminPage />} />
          <Route path="news" element={<AdminNewsPage />} />
          <Route path="donations" element={<DonationAdminDashboard />} />
          <Route path="volunteers" element={<VolunteersAdminPage />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="profile" element={<AdminProfilePage />} />
          <Route
            path="*"
            element={<Navigate to="/admin/dashboard" replace />}
          />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
