import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  X,
  GraduationCap,
  Heart,
  Home,
  Utensils,
  Book,
  Target,
  CheckCircle,
  Clock,
  Play
} from "lucide-react";
import AddProgramModal from "../../components/addProgram";

const ProgramsPage = () => {
  const categories = [
    "All",
    "Education",
    "Healthcare",
    "Community Development",
    "Emergency Relief",
    "Youth Programs"
  ];
  const years = ["All", "2024", "2023", "2022", "2021"];

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

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesSearch =
        program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || program.category === selectedCategory;
      const matchesYear =
        selectedYear === "All" || program.year.toString() === selectedYear;

      return matchesSearch && matchesCategory && matchesYear;
    });
  }, [searchTerm, selectedCategory, selectedYear, programs]);

    const handleSaveProgram = (newProgram) => {
      setPrograms((prev) => [...prev, newProgram]);
      console.log("New program created:", newProgram);
      // Here you would typically send the data to your backend
    };

  const getStatusColor = (status) => {
    switch (status) {
      case "Ongoing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "Planning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Ongoing":
        return <Clock className="w-4 h-4" />;
      case "Completed":
        return <CheckCircle className="w-4 h-4" />;
      case "Planning":
        return <Target className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const ProgramCard = ({ program }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={program.images[0]}
          alt={program.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
            {program.icon}
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
              program.status
            )} flex items-center gap-1`}
          >
            {getStatusIcon(program.status)}
            {program.status}
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
            <Play className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {program.title}
          </h3>
          <span className="text-sm text-gray-500 ml-2">{program.year}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {program.description}
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>{program.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{program.beneficiaries.toLocaleString()} beneficiaries</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-[#195C70]">
              {program.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#195C70] h-2 rounded-full transition-all duration-300"
              style={{ width: `${program.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSelectedProgram(program)}
            className="flex-1 bg-[#195C70] text-white py-2 px-4 rounded-lg hover:bg-[#144b5d] transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Edit className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );

  const ProgramListItem = ({ program }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex-shrink-0">
          <img
            src={program.images[0]}
            alt={program.title}
            className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-lg"
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {program.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{program.year}</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  program.status
                )} flex items-center gap-1`}
              >
                {getStatusIcon(program.status)}
                {program.status}
              </span>
            </div>
          </div>

          <p className="text-gray-600 mb-4">{program.description}</p>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{program.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Users className="w-4 h-4" />
              <span>
                {program.beneficiaries.toLocaleString()} beneficiaries
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <TrendingUp className="w-4 h-4" />
              <span>{program.progress}% complete</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setSelectedProgram(program)}
              className="bg-[#195C70] text-white py-2 px-4 rounded-lg hover:bg-[#144b5d] transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Details
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Edit className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ProgramModal = ({ program, onClose }) => {
    if (!program) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">
              {program.title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <img
                    src={program.images[0]}
                    alt={program.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                          program.status
                        )} flex items-center gap-1`}
                      >
                        {getStatusIcon(program.status)}
                        {program.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {program.year}
                      </span>
                    </div>

                    <p className="text-gray-600">{program.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{program.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>
                          {program.beneficiaries.toLocaleString()} beneficiaries
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Progress
                        </span>
                        <span className="text-sm font-medium text-[#195C70]">
                          {program.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-[#195C70] h-3 rounded-full transition-all duration-300"
                          style={{ width: `${program.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Program Goals</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {program.goals.map((goal, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                    >
                      <Target className="w-4 h-4 text-[#195C70]" />
                      <span className="text-sm">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Program Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {program.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${program.title} - ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Programs</h1>
            <p className="text-gray-600 mt-1">
              Discover our impactful community programs
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#195C70] text-white px-6 py-3 rounded-lg hover:bg-[#144b5d] transition-colors flex items-center gap-2 w-fit"
          >
            <Plus className="w-5 h-5" />
            Add New Program
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent"
              />
            </div>

            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              <button
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {viewMode === "grid" ? "List View" : "Grid View"}
              </button>
            </div>
          </div>
        </div>

        {/* Programs Grid/List */}
        {filteredPrograms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500 text-lg">
              No programs found matching your criteria.
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6"
            }
          >
            {filteredPrograms.map((program) =>
              viewMode === "grid" ? (
                <ProgramCard key={program.id} program={program} />
              ) : (
                <ProgramListItem key={program.id} program={program} />
              )
            )}
          </div>
        )}

        <AddProgramModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProgram}
        />

        {/* Program Modal */}
        <ProgramModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      </div>
    </div>
  );
};

export default ProgramsPage;
