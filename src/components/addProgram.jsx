import React, { useState } from "react";
import {
  X,
  Upload,
  Plus,
  Minus,
  Calendar,
  MapPin,
  Users,
  Target,
  Image,
  Video
} from "lucide-react";

const AddProgramModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "Education",
    year: new Date().getFullYear(),
    status: "Planning",
    description: "",
    location: "",
    goals: [""],
    expectedBeneficiaries: "",
    images: [],
    videoThumbnail: "",
    startDate: "",
    endDate: "",
    budget: "",
    teamLead: "",
    partners: [""]
  });

  const [errors, setErrors] = useState({});

  const categories = [
    "Education",
    "Healthcare",
    "Community Development",
    "Emergency Relief",
    "Youth Programs"
  ];

  const statusOptions = ["Planning", "Ongoing", "Completed", "On Hold"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item))
    }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Program title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.expectedBeneficiaries)
      newErrors.expectedBeneficiaries = "Expected beneficiaries is required";
    if (formData.goals.filter((goal) => goal.trim()).length === 0)
      newErrors.goals = "At least one goal is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newProgram = {
        id: Date.now(), // Simple ID generation
        ...formData,
        progress: 0,
        beneficiaries: 0,
        goals: formData.goals.filter((goal) => goal.trim()),
        partners: formData.partners.filter((partner) => partner.trim()),
        expectedBeneficiaries: parseInt(formData.expectedBeneficiaries)
      };

      onSave(newProgram);
      onClose();

      // Reset form
      setFormData({
        title: "",
        category: "Education",
        year: new Date().getFullYear(),
        status: "Planning",
        description: "",
        location: "",
        goals: [""],
        expectedBeneficiaries: "",
        images: [],
        videoThumbnail: "",
        startDate: "",
        endDate: "",
        budget: "",
        teamLead: "",
        partners: [""]
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add New Program</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter program title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent"
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
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) =>
                    handleInputChange("year", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent"
                  min="2020"
                  max="2030"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Describe the program's purpose and impact"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Location and Beneficiaries */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g., Lagos, Nigeria"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Expected Beneficiaries *
                </label>
                <input
                  type="number"
                  value={formData.expectedBeneficiaries}
                  onChange={(e) =>
                    handleInputChange("expectedBeneficiaries", e.target.value)
                  }
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent ${
                    errors.expectedBeneficiaries
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Number of people to benefit"
                />
                {errors.expectedBeneficiaries && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.expectedBeneficiaries}
                  </p>
                )}
              </div>
            </div>

            {/* Goals */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Target className="w-4 h-4 inline mr-1" />
                Program Goals *
              </label>
              {formData.goals.map((goal, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) =>
                      handleArrayChange("goals", index, e.target.value)
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent"
                    placeholder={`Goal ${index + 1}`}
                  />
                  {formData.goals.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("goals", index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("goals")}
                className="flex items-center gap-2 text-[#195C70] hover:bg-[#195C70] hover:text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Goal
              </button>
              {errors.goals && (
                <p className="text-red-500 text-sm mt-1">{errors.goals}</p>
              )}
            </div>

            {/* Dates and Budget */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget (₦)
                </label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent"
                  placeholder="Program budget"
                />
              </div>
            </div>

            {/* Team Lead */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Lead
              </label>
              <input
                type="text"
                value={formData.teamLead}
                onChange={(e) => handleInputChange("teamLead", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent"
                placeholder="Program manager or team lead"
              />
            </div>

            {/* Partners */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Partners & Collaborators
              </label>
              {formData.partners.map((partner, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={partner}
                    onChange={(e) =>
                      handleArrayChange("partners", index, e.target.value)
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195C70] focus:border-transparent"
                    placeholder={`Partner ${index + 1}`}
                  />
                  {formData.partners.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("partners", index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("partners")}
                className="flex items-center gap-2 text-[#195C70] hover:bg-[#195C70] hover:text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Partner
              </button>
            </div>

            {/* Media Upload Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Image className="w-4 h-4 inline mr-1" />
                  Program Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Upload program images</p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG up to 5MB each
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Video className="w-4 h-4 inline mr-1" />
                  Video Thumbnail
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    Upload video thumbnail
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG up to 2MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-6 py-2 bg-[#195C70] text-white rounded-lg hover:bg-[#144b5d] transition-colors"
              >
                Create Program
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default AddProgramModal;
