import React, { useEffect, useState } from "react";
import {
  Users,
  Mail,
  FileText,
  TrendingUp,
  Eye,
  Calendar,
  Clock,
  ChevronRight
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    messages: 0,
    reports: 0,
    volunteers: 0,
    donations: 0,
    programs: 0
  });

  const [recentMessages, setRecentMessages] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [adminName, setAdminName] = useState("Abigail");

  useEffect(() => {
    // Simulated data
    setStats({
      users: 124,
      messages: 8,
      reports: 3,
      volunteers: 45,
      donations: 12,
      programs: 6
    });

    setRecentMessages([
      {
        id: 1,
        name: "Jane Doe",
        email: "jane@example.com",
        message:
          "I need help with my account and would like to know more about upcoming programs.",
        date: "2025-07-18 10:15 AM",
        isNew: true
      },
      {
        id: 2,
        name: "John Smith",
        email: "john@example.com",
        message:
          "I'd like to volunteer with your team for the upcoming community event.",
        date: "2025-07-18 11:30 AM",
        isNew: true
      },
      {
        id: 3,
        name: "Sarah Johnson",
        email: "sarah@example.com",
        message:
          "Thank you for organizing such wonderful programs for the community.",
        date: "2025-07-17 2:45 PM",
        isNew: false
      }
    ]);

    setRecentActivities([
      {
        id: 1,
        type: "volunteer",
        message: "New volunteer application received",
        time: "2 hours ago",
        icon: Users
      },
      {
        id: 2,
        type: "donation",
        message: "New donation of $250 received",
        time: "4 hours ago",
        icon: TrendingUp
      },
      {
        id: 3,
        type: "program",
        message: "Community Workshop scheduled",
        time: "1 day ago",
        icon: Calendar
      }
    ]);
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: Users,
      color: "bg-blue-500",
      change: "+12%"
    },
    {
      title: "Messages",
      value: stats.messages,
      icon: Mail,
      color: "bg-green-500",
      change: "+5%"
    },
    {
      title: "Reports",
      value: stats.reports,
      icon: FileText,
      color: "bg-yellow-500",
      change: "-2%"
    },
    {
      title: "Volunteers",
      value: stats.volunteers,
      icon: Users,
      color: "bg-purple-500",
      change: "+8%"
    },
    {
      title: "Donations",
      value: stats.donations,
      icon: TrendingUp,
      color: "bg-pink-500",
      change: "+15%"
    },
    {
      title: "Programs",
      value: stats.programs,
      icon: Calendar,
      color: "bg-indigo-500",
      change: "+3%"
    }
  ];

  const truncateMessage = (message, maxLength = 60) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 lg:p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          Welcome, {adminName} 👋
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Here's what's happening today
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-3 sm:p-4 lg:p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className={`p-2 sm:p-2.5 rounded-lg ${stat.color}`}>
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-xs sm:text-sm text-green-600 font-medium">
                {stat.change}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mb-1">
              {stat.title}
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Recent Messages */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
              Recent Messages
            </h3>
            <button className="flex items-center text-sm text-[#195C70] hover:text-[#144A5A] font-medium">
              View all
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {recentMessages.length === 0 ? (
            <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
              <Mail className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No recent messages.</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#195C70] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm sm:text-base font-medium">
                          {msg.name.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                          {msg.name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">
                          {msg.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {msg.isNew && (
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                      )}
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {msg.date.split(" ")[1]} {msg.date.split(" ")[2]}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    <span className="sm:hidden">
                      {truncateMessage(msg.message, 80)}
                    </span>
                    <span className="hidden sm:inline">
                      {truncateMessage(msg.message, 120)}
                    </span>
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      {msg.date.split(" ")[0]}
                    </span>
                    <button className="text-xs text-[#195C70] hover:text-[#144A5A] font-medium">
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
              Recent Activities
            </h3>
            <Eye className="w-5 h-5 text-gray-400" />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 sm:p-5">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <activity.icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-900 leading-relaxed">
                        {activity.message}
                      </p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-4 sm:px-5 py-3 bg-gray-50 rounded-b-lg">
              <button className="w-full text-center text-sm text-[#195C70] hover:text-[#144A5A] font-medium">
                View all activities
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 sm:mt-8">
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
              Quick Actions
            </h4>
            <div className="grid grid-cols-1 gap-3">
              <button className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    Add New User
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    Create Program
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Mail className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    Send Newsletter
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
