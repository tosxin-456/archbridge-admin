import React, { useState } from "react";
import {
  GraduationCap,
  Heart,
  Home,
  Users,
  Utensils,
  Book,
  MapPin,
  Calendar,
  TrendingUp,
  Eye,
  Filter
} from "lucide-react";

const ProgramsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'

  const categories = [
    "All",
    "Education",
    "Healthcare",
    "Community Development",
    "Emergency Relief",
    "Youth Programs"
  ];

  const years = ["All", "2024", "2023", "2022", "2021"];
  const statuses = ["All", "Ongoing", "Completed", "Planning"];

  const programs = [
    {
      id: 1,
      title: "Digital Literacy for All",
      category: "Education",
      year: 2024,
      status: "Ongoing",
      description:
        "Empowering communities with essential digital skills through comprehensive training programs and technology access.",
      goals: [
        "Train 500+ individuals",
        "Establish 5 computer labs",
        "Create online learning platform"
      ],
      progress: 75,
      beneficiaries: 342,
      location: "Lagos, Nigeria",
      images: [
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=250&fit=crop"
      ],
      videoThumbnail:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Clean Water Initiative",
      category: "Community Development",
      year: 2024,
      status: "Ongoing",
      description:
        "Providing sustainable access to clean water through well drilling, filtration systems, and community education.",
      goals: [
        "Install 20 water points",
        "Serve 2000+ people",
        "Train local maintenance teams"
      ],
      progress: 60,
      beneficiaries: 1250,
      location: "Rural Communities",
      images: [
        "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1594736797933-d0601ba2fe65?w=400&h=250&fit=crop"
      ],
      videoThumbnail:
        "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=400&h=250&fit=crop",
      icon: <Home className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Mobile Health Clinics",
      category: "Healthcare",
      year: 2023,
      status: "Completed",
      description:
        "Brought essential healthcare services to underserved communities through mobile medical units.",
      goals: [
        "Serve 50 communities",
        "Conduct 1000+ consultations",
        "Provide vaccinations"
      ],
      progress: 100,
      beneficiaries: 1800,
      location: "Northern Nigeria",
      images: [
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=250&fit=crop",
        "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=250&fit=crop"
      ],
      videoThumbnail:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop",
      icon: <Heart className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Youth Leadership Academy",
      category: "Youth Programs",
      year: 2023,
      status: "Completed",
      description:
        "Developing the next generation of leaders through mentorship, skills training, and community service projects.",
      goals: [
        "Train 100 youth leaders",
        "Complete 20 community projects",
        "Establish mentorship network"
      ],
      progress: 100,
      beneficiaries: 156,
      location: "Abuja & Lagos",
      images: [
        "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop"
      ],
      videoThumbnail:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop",
      icon: <Users className="w-6 h-6" />
    },
    {
      id: 5,
      title: "Emergency Food Relief",
      category: "Emergency Relief",
      year: 2022,
      status: "Completed",
      description:
        "Provided critical food assistance during regional crisis, ensuring families had access to nutritious meals.",
      goals: [
        "Distribute 10,000 food packages",
        "Serve 5000 families",
        "Establish food distribution centers"
      ],
      progress: 100,
      beneficiaries: 5200,
      location: "Northeastern Nigeria",
      images: [
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=250&fit=crop",
        "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=250&fit=crop"
      ],
      videoThumbnail:
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=250&fit=crop",
      icon: <Utensils className="w-6 h-6" />
    },
    {
      id: 6,
      title: "Scholarship Program",
      category: "Education",
      year: 2022,
      status: "Ongoing",
      description:
        "Supporting promising students from disadvantaged backgrounds to pursue higher education and achieve their dreams.",
      goals: [
        "Award 50 scholarships",
        "Maintain 95% graduation rate",
        "Provide mentorship support"
      ],
      progress: 85,
      beneficiaries: 47,
      location: "National",
      images: [
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop"
      ],
      videoThumbnail:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
      icon: <Book className="w-6 h-6" />
    }
  ];

  const filteredPrograms = programs.filter((program) => {
    return (
      (selectedCategory === "All" || program.category === selectedCategory) &&
      (selectedYear === "All" || program.year.toString() === selectedYear) &&
      (selectedStatus === "All" || program.status === selectedStatus)
    );
  });

  const getCategoryColor = (category) => {
    const colors = {
      Education: "bg-blue-100 text-blue-800",
      Healthcare: "bg-red-100 text-red-800",
      "Community Development": "bg-green-100 text-green-800",
      "Emergency Relief": "bg-orange-100 text-orange-800",
      "Youth Programs": "bg-purple-100 text-purple-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status) => {
    const colors = {
      Ongoing: "bg-green-100 text-green-700",
      Completed: "bg-blue-100 text-blue-700",
      Planning: "bg-yellow-100 text-yellow-700"
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const ProgramCard = ({ program }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={program.images[0]}
          alt={program.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-full p-2">
          {program.icon}
        </div>
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 text-sm rounded-full ${getStatusColor(
              program.status
            )}`}
          >
            {program.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
            {program.title}
          </h3>
          <span
            className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(
              program.category
            )}`}
          >
            {program.category}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {program.description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            {program.location}
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            {program.year}
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2" />
            {program.beneficiaries} beneficiaries
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Progress</span>
              <span className="font-medium">{program.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#195C70] h-2 rounded-full transition-all duration-300"
                style={{ width: `${program.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Key Goals:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {program.goals.slice(0, 2).map((goal, index) => (
              <li key={index} className="flex items-center">
                <div className="w-1.5 h-1.5 bg-[#195C70] rounded-full mr-2"></div>
                {goal}
              </li>
            ))}
            {program.goals.length > 2 && (
              <li className="text-xs text-gray-500">
                +{program.goals.length - 2} more goals
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#195C70] mb-2">Programs</h1>
          <p className="text-gray-600">
            Discover our impactful initiatives making a difference in
            communities
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <Eye className="w-4 h-4" />
            {viewMode === "grid" ? "Table View" : "Grid View"}
          </button>
          <button className="bg-[#195C70] text-white px-6 py-2 rounded-lg hover:bg-[#144b5d] transition">
            + Add New Program
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Programs</p>
              <p className="text-2xl font-bold text-[#195C70]">
                {programs.length}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-[#195C70]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Beneficiaries</p>
              <p className="text-2xl font-bold text-green-600">
                {programs
                  .reduce((sum, program) => sum + program.beneficiaries, 0)
                  .toLocaleString()}
              </p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Programs</p>
              <p className="text-2xl font-bold text-blue-600">
                {programs.filter((p) => p.status === "Ongoing").length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed Programs</p>
              <p className="text-2xl font-bold text-purple-600">
                {programs.filter((p) => p.status === "Completed").length}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-[#195C70]" />
          <h3 className="text-lg font-semibold text-[#195C70]">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Programs Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#195C70] text-white">
                <tr>
                  <th className="text-left py-4 px-6">Program</th>
                  <th className="text-left py-4 px-6">Category</th>
                  <th className="text-left py-4 px-6">Year</th>
                  <th className="text-left py-4 px-6">Status</th>
                  <th className="text-left py-4 px-6">Progress</th>
                  <th className="text-left py-4 px-6">Beneficiaries</th>
                  <th className="text-left py-4 px-6">Location</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrograms.map((program) => (
                  <tr
                    key={program.id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-full">
                          {program.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {program.title}
                          </h4>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {program.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(
                          program.category
                        )}`}
                      >
                        {program.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{program.year}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 text-sm rounded-full ${getStatusColor(
                          program.status
                        )}`}
                      >
                        {program.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#195C70] h-2 rounded-full"
                            style={{ width: `${program.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {program.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {program.beneficiaries.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {program.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredPrograms.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Filter className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No programs found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters to see more programs.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProgramsPage;
