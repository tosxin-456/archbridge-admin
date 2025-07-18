import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    messages: 0,
    reports: 0
  });

  const [recentMessages, setRecentMessages] = useState([]);
  const [adminName, setAdminName] = useState("Abigail");

  useEffect(() => {
    // Simulated data
    setStats({
      users: 124,
      messages: 8,
      reports: 3
    });

    setRecentMessages([
      {
        id: 1,
        name: "Jane Doe",
        email: "jane@example.com",
        message: "I need help with my account.",
        date: "2025-07-18 10:15 AM"
      },
      {
        id: 2,
        name: "John Smith",
        email: "john@example.com",
        message: "I'd like to volunteer with your team.",
        date: "2025-07-18 11:30 AM"
      }
    ]);
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Welcome, {adminName} 👋
        </h1>
        <p className="text-gray-600">Here’s what’s happening today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Total Users</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">
            {stats.users}
          </h2>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Messages</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">
            {stats.messages}
          </h2>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Reports</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">
            {stats.reports}
          </h2>
        </div>
      </div>

      {/* Recent Messages */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Messages
        </h3>
        {recentMessages.length === 0 ? (
          <p className="text-gray-500">No recent messages.</p>
        ) : (
          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700 font-medium text-left">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentMessages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{msg.name}</td>
                    <td className="px-4 py-2 text-blue-600">{msg.email}</td>
                    <td className="px-4 py-2">{msg.message}</td>
                    <td className="px-4 py-2 text-gray-500">{msg.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
