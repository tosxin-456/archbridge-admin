import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  X,
  Check,
  AlertCircle,
  MoreVertical
} from "lucide-react";

const DonationAdminDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDateRange, setFilterDateRange] = useState("all");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  // Sample donation data - In real app, this would come from your backend/Paystack webhooks
  const sampleDonations = [
    {
      id: "archbridge_1705123456789",
      reference: "PAY_123456789",
      donor_name: "John Doe",
      email: "john.doe@email.com",
      amount: 25000,
      currency: "NGN",
      status: "success",
      payment_method: "card",
      transaction_date: "2024-01-13T10:30:00Z",
      paystack_reference: "ref_123456789",
      metadata: {
        custom_fields: [
          {
            display_name: "Donor Name",
            variable_name: "donor_name",
            value: "John Doe"
          },
          {
            display_name: "Foundation",
            variable_name: "foundation",
            value: "ArchBridge Foundation"
          }
        ]
      },
      phone: "+2348123456789",
      location: "Lagos, Nigeria"
    },
    {
      id: "archbridge_1705123456790",
      reference: "PAY_123456790",
      donor_name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      amount: 10000,
      currency: "NGN",
      status: "success",
      payment_method: "bank_transfer",
      transaction_date: "2024-01-12T14:15:00Z",
      paystack_reference: "ref_123456790",
      metadata: {
        custom_fields: [
          {
            display_name: "Donor Name",
            variable_name: "donor_name",
            value: "Sarah Johnson"
          },
          {
            display_name: "Foundation",
            variable_name: "foundation",
            value: "ArchBridge Foundation"
          }
        ]
      },
      phone: "+2348123456790",
      location: "Abuja, Nigeria"
    },
    {
      id: "archbridge_1705123456791",
      reference: "PAY_123456791",
      donor_name: "Michael Chen",
      email: "michael.chen@email.com",
      amount: 50000,
      currency: "NGN",
      status: "pending",
      payment_method: "card",
      transaction_date: "2024-01-11T09:45:00Z",
      paystack_reference: "ref_123456791",
      metadata: {
        custom_fields: [
          {
            display_name: "Donor Name",
            variable_name: "donor_name",
            value: "Michael Chen"
          },
          {
            display_name: "Foundation",
            variable_name: "foundation",
            value: "ArchBridge Foundation"
          }
        ]
      },
      phone: "+2348123456791",
      location: "Port Harcourt, Nigeria"
    },
    {
      id: "archbridge_1705123456792",
      reference: "PAY_123456792",
      donor_name: "Fatima Abdul",
      email: "fatima.abdul@email.com",
      amount: 5000,
      currency: "NGN",
      status: "success",
      payment_method: "ussd",
      transaction_date: "2024-01-10T16:20:00Z",
      paystack_reference: "ref_123456792",
      metadata: {
        custom_fields: [
          {
            display_name: "Donor Name",
            variable_name: "donor_name",
            value: "Fatima Abdul"
          },
          {
            display_name: "Foundation",
            variable_name: "foundation",
            value: "ArchBridge Foundation"
          }
        ]
      },
      phone: "+2348123456792",
      location: "Kano, Nigeria"
    },
    {
      id: "archbridge_1705123456793",
      reference: "PAY_123456793",
      donor_name: "David Williams",
      email: "david.williams@email.com",
      amount: 15000,
      currency: "NGN",
      status: "failed",
      payment_method: "card",
      transaction_date: "2024-01-09T11:30:00Z",
      paystack_reference: "ref_123456793",
      metadata: {
        custom_fields: [
          {
            display_name: "Donor Name",
            variable_name: "donor_name",
            value: "David Williams"
          },
          {
            display_name: "Foundation",
            variable_name: "foundation",
            value: "ArchBridge Foundation"
          }
        ]
      },
      phone: "+2348123456793",
      location: "Ibadan, Nigeria"
    }
  ];

  // Load sample data on component mount
  useEffect(() => {
    setDonations(sampleDonations);
    setFilteredDonations(sampleDonations);
  }, []);

  // Filter donations based on search and filters
  useEffect(() => {
    let filtered = donations;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (donation) =>
          donation.donor_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          donation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donation.reference.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (donation) => donation.status === filterStatus
      );
    }

    // Date range filter
    if (filterDateRange !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (filterDateRange) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case "year":
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      if (filterDateRange !== "all") {
        filtered = filtered.filter(
          (donation) => new Date(donation.transaction_date) >= filterDate
        );
      }
    }

    setFilteredDonations(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterDateRange, donations]);

  // Calculate statistics
  const stats = {
    totalDonations: filteredDonations.length,
    totalAmount: filteredDonations.reduce(
      (sum, donation) =>
        donation.status === "success" ? sum + donation.amount : sum,
      0
    ),
    successfulDonations: filteredDonations.filter((d) => d.status === "success")
      .length,
    pendingDonations: filteredDonations.filter((d) => d.status === "pending")
      .length
  };

  // Pagination
  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDonations = filteredDonations.slice(startIndex, endIndex);

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <Check className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "failed":
        return <X className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN"
    }).format(amount);
  };

  const exportToCsv = () => {
    const csvData = filteredDonations.map((donation) => ({
      Reference: donation.reference,
      "Donor Name": donation.donor_name,
      Email: donation.email,
      Amount: donation.amount,
      Status: donation.status,
      "Payment Method": donation.payment_method,
      "Transaction Date": formatDate(donation.transaction_date),
      Location: donation.location
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(","),
      ...csvData.map((row) => Object.values(row).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `donations_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In real app, fetch fresh data from backend
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Donation Records
          </h1>
          <p className="text-gray-600">
            Manage and track all donations to ArchBridge Foundation
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Donations
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalDonations}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Amount
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatAmount(stats.totalAmount)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Successful</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.successfulDonations}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pendingDonations}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, email, or reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>

              {/* Date Range Filter */}
              <select
                value={filterDateRange}
                onChange={(e) => setFilterDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
              <button
                onClick={exportToCsv}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Donations Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentDonations.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {donation.donor_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {donation.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatAmount(donation.amount)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {donation.currency}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          donation.status
                        )}`}
                      >
                        {getStatusIcon(donation.status)}
                        {donation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(donation.transaction_date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 capitalize">
                        {donation.payment_method.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedDonation(donation)}
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredDonations.length)} of{" "}
                {filteredDonations.length} results
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Donation Detail Modal */}
        {selectedDonation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    Donation Details
                  </h2>
                  <button
                    onClick={() => setSelectedDonation(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Status and Amount */}
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        selectedDonation.status
                      )}`}
                    >
                      {getStatusIcon(selectedDonation.status)}
                      {selectedDonation.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatAmount(selectedDonation.amount)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedDonation.currency}
                    </div>
                  </div>
                </div>

                {/* Donor Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Donor Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="text-sm text-gray-900">
                        {selectedDonation.donor_name}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {selectedDonation.email}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {selectedDonation.phone}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {selectedDonation.location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transaction Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Transaction Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reference
                      </label>
                      <div className="text-sm text-gray-900 font-mono">
                        {selectedDonation.reference}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Paystack Reference
                      </label>
                      <div className="text-sm text-gray-900 font-mono">
                        {selectedDonation.paystack_reference}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Method
                      </label>
                      <div className="text-sm text-gray-900 capitalize">
                        {selectedDonation.payment_method.replace("_", " ")}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Transaction Date
                      </label>
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(selectedDonation.transaction_date)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedDonation(null)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      // In real app, this would send a receipt email
                      alert("Receipt sent successfully!");
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Send Receipt
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

export default DonationAdminDashboard;
