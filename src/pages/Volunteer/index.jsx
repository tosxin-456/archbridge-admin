import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Check,
  X,
  Download,
  Mail,
  Phone,
  Calendar,
  User,
  HeartHandshake,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

const VolunteersAdminPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  // Mock volunteer data
  const [volunteers, setVolunteers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      appliedDate: "2024-07-15",
      status: "pending",
      motivation:
        "I'm passionate about helping my community and have experience working with children. I believe volunteering is a great way to make a positive impact and develop new skills while contributing to meaningful causes.",
      skills: ["Communication", "Organization", "Teaching"],
      availability: "Weekends"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "+1 (555) 234-5678",
      appliedDate: "2024-07-14",
      status: "approved",
      motivation:
        "I want to give back to the community that has given me so much. I have technical skills that could be valuable for various projects and I'm excited to contribute my time and expertise.",
      skills: ["Web Development", "Data Analysis", "Project Management"],
      availability: "Evenings"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      email: "emma.r@email.com",
      phone: "+1 (555) 345-6789",
      appliedDate: "2024-07-13",
      status: "rejected",
      motivation:
        "I'm looking for volunteer opportunities to gain experience in nonprofit work. I'm particularly interested in event planning and fundraising activities.",
      skills: ["Event Planning", "Marketing", "Social Media"],
      availability: "Flexible"
    },
    {
      id: 4,
      name: "James Wilson",
      email: "james.wilson@email.com",
      phone: "+1 (555) 456-7890",
      appliedDate: "2024-07-12",
      status: "pending",
      motivation:
        "After retiring, I want to use my professional experience to help others. I have decades of business experience and would love to mentor young entrepreneurs or help with administrative tasks.",
      skills: ["Business Strategy", "Mentoring", "Finance"],
      availability: "Mornings"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      email: "l.thompson@email.com",
      phone: "+1 (555) 567-8901",
      appliedDate: "2024-07-11",
      status: "approved",
      motivation:
        "I'm studying social work and want to gain hands-on experience while helping my community. I'm particularly interested in working with families and youth programs.",
      skills: ["Counseling", "Youth Work", "Spanish"],
      availability: "Afternoons"
    }
  ]);

  const updateVolunteerStatus = (id, newStatus) => {
    setVolunteers(
      volunteers.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-700 bg-green-100";
      case "rejected":
        return "text-red-700 bg-red-100";
      case "pending":
        return "text-yellow-700 bg-yellow-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredVolunteers = volunteers.filter((volunteer) => {
    const matchesSearch =
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || volunteer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: volunteers.length,
    pending: volunteers.filter((v) => v.status === "pending").length,
    approved: volunteers.filter((v) => v.status === "approved").length,
    rejected: volunteers.filter((v) => v.status === "rejected").length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <HeartHandshake className="w-8 h-8 text-[#195C70]" />
            Volunteer Applications
          </h1>
          <p className="text-gray-600">
            Manage and review volunteer applications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Applications
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <User className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Review
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.approved}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.rejected}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search volunteers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent outline-none bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-[#195C70] text-white rounded-lg hover:bg-[#154d5f] transition">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Volunteers Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volunteer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
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
                {filteredVolunteers.map((volunteer) => (
                  <tr key={volunteer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#195C70] rounded-full flex items-center justify-center text-white font-medium">
                          {volunteer.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {volunteer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {volunteer.availability}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {volunteer.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {volunteer.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(volunteer.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          volunteer.status
                        )}`}
                      >
                        {getStatusIcon(volunteer.status)}
                        {volunteer.status.charAt(0).toUpperCase() +
                          volunteer.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedVolunteer(volunteer)}
                          className="text-[#195C70] hover:text-[#154d5f] p-1 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {volunteer.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                updateVolunteerStatus(volunteer.id, "approved")
                              }
                              className="text-green-600 hover:text-green-800 p-1 rounded"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                updateVolunteerStatus(volunteer.id, "rejected")
                              }
                              className="text-red-600 hover:text-red-800 p-1 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button className="text-blue-600 hover:text-blue-800 p-1 rounded">
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Volunteer Detail Modal */}
        {selectedVolunteer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  Volunteer Details
                </h2>
                <button
                  onClick={() => setSelectedVolunteer(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#195C70] rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {selectedVolunteer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {selectedVolunteer.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {selectedVolunteer.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {selectedVolunteer.phone}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Application Date
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {new Date(
                        selectedVolunteer.appliedDate
                      ).toLocaleDateString()}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Status
                    </h4>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        selectedVolunteer.status
                      )}`}
                    >
                      {getStatusIcon(selectedVolunteer.status)}
                      {selectedVolunteer.status.charAt(0).toUpperCase() +
                        selectedVolunteer.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVolunteer.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Availability
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedVolunteer.availability}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Motivation
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedVolunteer.motivation}
                  </p>
                </div>

                {selectedVolunteer.status === "pending" && (
                  <div className="flex gap-3 pt-4 border-t">
                    <button
                      onClick={() => {
                        updateVolunteerStatus(selectedVolunteer.id, "approved");
                        setSelectedVolunteer(null);
                      }}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        updateVolunteerStatus(selectedVolunteer.id, "rejected");
                        setSelectedVolunteer(null);
                      }}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteersAdminPage;
