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
import AdminDashboard from "./pages/dashboard";
import AdminSettingsPage from "./pages/settings";
import AdminProfilePage from "./pages/profile";
import ProgramsPage from "./pages/programs";
import GalleryPage from "./pages/gallery";
import LoginPage from "./pages/login";

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
        style={{
          marginLeft: isCollapsed ? "5rem" : "16rem"
        }}
      >
        <div className="w-full">
          <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="programs" element={<ProgramsPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="messages" element={<ContactAdminPage />} />
            <Route path="news" element={<AdminNewsPage />} />
            <Route path="donations" element={<DonationAdminDashboard />} />
            <Route path="volunteers" element={<VolunteersAdminPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="profile" element={<AdminProfilePage />} />
            <Route
              path="*"
              element={<Navigate to="/admin/dashboard" replace />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
