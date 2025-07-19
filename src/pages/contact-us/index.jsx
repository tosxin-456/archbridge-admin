import React, { useEffect, useState } from "react";
import {
  Mail,
  User,
  MessageCircle,
  Search,
  Filter,
  Eye,
  Trash2,
  Check,
  Clock,
  Calendar,
  X
} from "lucide-react";

const ContactAdminPage = ({ isCollapsed }) => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Simulated data (replace with fetch call later)
  useEffect(() => {
    const mockMessages = [
      {
        id: 1,
        name: "Jane Doe",
        email: "jane@example.com",
        message:
          "Hi, I need help with my account. I'm having trouble logging in and accessing my dashboard. Could you please assist me with resetting my password?",
        date: "2025-07-18 10:15 AM",
        status: "unread"
      },
      {
        id: 2,
        name: "John Smith",
        email: "john@example.com",
        message:
          "I'd like to volunteer with your organization. I have experience in community outreach and would love to contribute to your programs.",
        date: "2025-07-18 11:30 AM",
        status: "read"
      },
      {
        id: 3,
        name: "Sarah Wilson",
        email: "sarah.wilson@email.com",
        message:
          "Hello, I'm interested in learning more about your upcoming events. Do you have a calendar of activities I can view?",
        date: "2025-07-17 2:45 PM",
        status: "unread"
      },
      {
        id: 4,
        name: "Mike Johnson",
        email: "mike.j@email.com",
        message:
          "Thank you for the excellent service. I wanted to provide some feedback about my recent experience with your team.",
        date: "2025-07-17 9:20 AM",
        status: "read"
      }
    ];
    setMessages(mockMessages);
  }, []);

  const markAsRead = (id) => {
    setMessages(
      messages.map((msg) => (msg.id === id ? { ...msg, status: "read" } : msg))
    );
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id));
    setSelectedMessage(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "read":
        return "text-green-700 bg-green-100";
      case "unread":
        return "text-blue-700 bg-blue-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "read":
        return <Check className="w-3 h-3 sm:w-4 sm:h-4" />;
      case "unread":
        return <Clock className="w-3 h-3 sm:w-4 sm:h-4" />;
      default:
        return <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />;
    }
  };

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || message.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: messages.length,
    unread: messages.filter((m) => m.status === "unread").length,
    read: messages.filter((m) => m.status === "read").length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2 sm:gap-3">
            <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#195C70]" />
            <span className="break-words">Contact Messages</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage and respond to contact form submissions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Total Messages
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Unread Messages
                </p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">
                  {stats.unread}
                </p>
              </div>
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Read Messages
                </p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">
                  {stats.read}
                </p>
              </div>
              <Check className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1 sm:flex-none">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <select
                  className="w-full sm:w-auto pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent outline-none bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Messages - Mobile Cards / Desktop Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No messages found.</p>
            </div>
          ) : (
            <>
              {/* Mobile Cards */}
              <div className="block md:hidden">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className="p-4 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-[#195C70] rounded-full flex items-center justify-center text-white font-medium text-sm shrink-0">
                          {message.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {message.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {message.email}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          message.status
                        )} shrink-0`}
                      >
                        {getStatusIcon(message.status)}
                        {message.status.charAt(0).toUpperCase() +
                          message.status.slice(1)}
                      </span>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {message.message}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {message.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedMessage(message)}
                          className="text-[#195C70] hover:text-[#154d5f] p-1 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {message.status === "unread" && (
                          <button
                            onClick={() => markAsRead(message.id)}
                            className="text-green-600 hover:text-green-800 p-1 rounded"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteMessage(message.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block rounded-lg shadow-sm border border-gray-200    overflow-x-auto overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Message
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredMessages.map((message) => (
                        <tr key={message.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-[#195C70] rounded-full flex items-center justify-center text-white font-medium">
                                {message.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {message.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {message.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate">
                              {message.message}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {message.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                message.status
                              )}`}
                            >
                              {getStatusIcon(message.status)}
                              {message.status.charAt(0).toUpperCase() +
                                message.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedMessage(message)}
                                className="text-[#195C70] hover:text-[#154d5f] p-1 rounded"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              {message.status === "unread" && (
                                <button
                                  onClick={() => markAsRead(message.id)}
                                  className="text-green-600 hover:text-green-800 p-1 rounded"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => deleteMessage(message.id)}
                                className="text-red-600 hover:text-red-800 p-1 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Message Detail Modal */}
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-4 sm:p-6 border-b">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Message Details
                </h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#195C70] rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold">
                    {selectedMessage.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">
                      {selectedMessage.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="truncate">
                          {selectedMessage.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        {selectedMessage.date}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Status
                  </h4>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      selectedMessage.status
                    )}`}
                  >
                    {getStatusIcon(selectedMessage.status)}
                    {selectedMessage.status.charAt(0).toUpperCase() +
                      selectedMessage.status.slice(1)}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Message
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  {selectedMessage.status === "unread" && (
                    <button
                      onClick={() => {
                        markAsRead(selectedMessage.id);
                        setSelectedMessage(null);
                      }}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => {
                      deleteMessage(selectedMessage.id);
                      setSelectedMessage(null);
                    }}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactAdminPage;
