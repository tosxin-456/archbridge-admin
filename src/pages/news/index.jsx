import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  Calendar,
  User,
  Tag,
  Search,
  Filter,
  X,
  Save,
  Upload,
  BarChart3,
  FileText,
  Heart,
  MessageCircle,
  TrendingUp
} from "lucide-react";

const AdminNewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [previewArticle, setPreviewArticle] = useState(null);

  const articlesPerPage = 10;
  const categories = [
    "All",
    "Announcements",
    "Events",
    "Partnerships",
    "Technology",
    "Community"
  ];

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Announcements",
    tags: "",
    image: "",
    author: "Admin User"
  });

  // Sample admin articles data
  const initialArticles = [
    {
      id: 1,
      title: "Major Partnership Announcement: Expanding Global Reach",
      excerpt:
        "We're excited to announce our strategic partnership with leading international organizations.",
      content:
        "In a groundbreaking move that will reshape our industry landscape, we are thrilled to announce our strategic partnership with three leading international organizations. This collaboration will enable us to expand our services to over 50 new markets worldwide, bringing innovative solutions to millions of new users.\n\nThe partnership, which has been in development for over 18 months, represents a significant milestone in our company's growth trajectory.",
      category: "Partnerships",
      author: "Admin User",
      date: "2025-06-15",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
      likes: 234,
      comments: 12,
      views: 1250,
      tags: ["Partnership", "Global", "Expansion"],
      status: "published"
    },
    {
      id: 2,
      title: "Annual Tech Conference 2025: Innovation Showcase",
      excerpt:
        "Join us for our biggest technology conference yet, featuring cutting-edge innovations.",
      content:
        "Our Annual Tech Conference 2025 is set to be our most ambitious event yet, bringing together over 5,000 technology enthusiasts, industry leaders, and innovators from around the world.",
      category: "Events",
      author: "Admin User",
      date: "2025-06-14",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      likes: 187,
      comments: 8,
      views: 890,
      tags: ["Conference", "Technology", "Innovation"],
      status: "published"
    },
    {
      id: 3,
      title: "Product Update: Enhanced Security Features",
      excerpt:
        "We've implemented advanced security measures to protect your data.",
      content:
        "Security has always been our top priority, and today we're excited to announce significant enhancements to our platform's security infrastructure.",
      category: "Announcements",
      author: "Admin User",
      date: "2025-06-13",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop",
      likes: 156,
      comments: 5,
      views: 567,
      tags: ["Security", "Privacy", "Update"],
      status: "draft"
    }
  ];

  useEffect(() => {
    setArticles(initialArticles);
    setFilteredArticles(initialArticles);
  }, []);

  useEffect(() => {
    let filtered = articles;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (article) => article.category === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredArticles(filtered);
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, articles]);

  const handleCreateArticle = () => {
    const newArticle = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      comments: 0,
      views: 0,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      status: "published"
    };

    setArticles((prev) => [newArticle, ...prev]);
    setShowCreateModal(false);
    resetForm();
  };

  const handleEditArticle = () => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === selectedArticle.id
          ? {
              ...article,
              ...formData,
              tags: formData.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag)
            }
          : article
      )
    );
    setShowEditModal(false);
    setSelectedArticle(null);
    resetForm();
  };

  const handleDeleteArticle = (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      setArticles((prev) => prev.filter((article) => article.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "Announcements",
      tags: "",
      image: "",
      author: "Admin User"
    });
  };

  const openEditModal = (article) => {
    setSelectedArticle(article);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      tags: article.tags.join(", "),
      image: article.image,
      author: article.author
    });
    setShowEditModal(true);
  };

  const handlePreview = (article) => {
    setPreviewArticle(article);
    setShowPreview(true);
  };

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

const ArticleModal = ({
  isEdit = false,
  onClose,
  onSubmit,
  editData = null
}) => {
  const [formData, setFormData] = useState({
    title: editData?.title || "",
    category: editData?.category || "",
    tags: editData?.tags || "",
    image: null, // Changed to handle file object
    author: editData?.author || "",
    excerpt: editData?.excerpt || "",
    content: editData?.content || ""
  });

  const [imagePreview, setImagePreview] = useState(editData?.image || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp"
      ];
      if (!allowedTypes.includes(file.type)) {
        setSubmitError(
          "Please select a valid image file (JPEG, PNG, GIF, or WebP)"
        );
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError("Image file size must be less than 5MB");
        return;
      }

      setFormData({ ...formData, image: file });

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setSubmitError("");
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.title || !formData.excerpt || !formData.content) {
      setSubmitError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Create FormData for multipart/form-data submission
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("category", formData.category);
      submitData.append("tags", formData.tags);
      submitData.append("author", formData.author);
      submitData.append("excerpt", formData.excerpt);
      submitData.append("content", formData.content);

      // Add image if present
      if (formData.image) {
        submitData.append("image", formData.image);
      }

      // If editing, add the ID
      if (isEdit && editData?.id) {
        submitData.append("id", editData.id);
      }

      const endpoint = isEdit
        ? `/backend/articles/${editData.id}`
        : "/backend/articles";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method: method,
        body: submitData
        // Don't set Content-Type header - let browser set it with boundary for FormData
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Unknown error occurred" }));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();

      // Call the parent's onSubmit callback with the result
      if (onSubmit) {
        onSubmit(result);
      }

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error submitting article:", error);
      setSubmitError(
        error.message || "Failed to submit article. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            {isEdit ? "Edit Article" : "Create New Article"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {submitError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter article title"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                >
                  {categories
                    .filter((cat) => cat !== "All")
                    .map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Technology, Innovation, AI"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Author name"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  placeholder="Brief description of the article"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={12}
                  placeholder="Write your article content here..."
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={
                !formData.title ||
                !formData.excerpt ||
                !formData.content ||
                isSubmitting
              }
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {isEdit ? "Update Article" : "Create Article"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

  const PreviewModal = ({ article, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Article Preview</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
              {article.category}
            </span>
          </div>

          <div className="prose max-w-none mb-6">
            <p className="text-lg text-gray-700 mb-4 italic">
              {article.excerpt}
            </p>
            {article.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {article.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const stats = {
    total: articles.length,
    published: articles.filter((a) => a.status === "published").length,
    drafts: articles.filter((a) => a.status === "draft").length,
    totalViews: articles.reduce((sum, a) => sum + (a.views || 0), 0),
    totalLikes: articles.reduce((sum, a) => sum + (a.likes || 0), 0),
    totalComments: articles.reduce((sum, a) => sum + (a.comments || 0), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                News Management
              </h1>
              <p className="text-gray-600">
                Create, edit, and manage your news articles
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#3C6674] text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Article
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Total Articles</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.total}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Published</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.published}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Edit3 className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-gray-600">Drafts</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.drafts}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-600">Total Views</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalViews.toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-red-600" />
              <span className="text-sm text-gray-600">Total Likes</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalLikes}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-5 h-5 text-indigo-600" />
              <span className="text-sm text-gray-600">Total Comments</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalComments}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Articles Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Article
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stats
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
                {paginatedArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {article.image && (
                          <img
                            src={article.image}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover mr-4"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900 line-clamp-1">
                            {article.title}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {article.excerpt}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{article.views || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{article.likes || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{article.comments || 0}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {article.date}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          article.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePreview(article)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(article)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-gray-50 border-t">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-700">
                  Showing {(currentPage - 1) * articlesPerPage + 1} to{" "}
                  {Math.min(
                    currentPage * articlesPerPage,
                    filteredArticles.length
                  )}{" "}
                  of {filteredArticles.length} articles
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 border rounded ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <ArticleModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateArticle}
        />
      )}

      {showEditModal && (
        <ArticleModal
          isEdit={true}
          onClose={() => {
            setShowEditModal(false);
            setSelectedArticle(null);
            resetForm();
          }}
          onSubmit={handleEditArticle}
        />
      )}

      {showPreview && previewArticle && (
        <PreviewModal
          article={previewArticle}
          onClose={() => {
            setShowPreview(false);
            setPreviewArticle(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminNewsPage;
