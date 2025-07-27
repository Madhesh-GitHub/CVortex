import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, PlusCircle, Search, Edit, Eye,
  Calendar, Clock
} from "lucide-react";
import BlogWriteForm from '../components/Blog/BlogWriteForm';

const UserBlogDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingBlog, setEditingBlog] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        if (!userId) {
          setError("No user ID found in session.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`/api/blogs/user/${userId}`);
        const data = response.data;
        if (Array.isArray(data)) {
          setBlogs(data);
        } else if (Array.isArray(data.data)) {
          setBlogs(data.data);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        console.error("Failed to fetch user's blogs:", err);
        setError("Error loading blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, [userId]);

  const handleSave = (newOrUpdatedBlog) => {
    const exists = blogs.find(blog => blog._id === newOrUpdatedBlog._id);
    if (exists) {
      setBlogs(prev =>
        prev.map(b => (b._id === newOrUpdatedBlog._id ? newOrUpdatedBlog : b))
      );
    } else {
      setBlogs(prev => [newOrUpdatedBlog, ...prev]);
    }
    setShowEditor(false);
    setEditingBlog(null);
  };

  const categories = ['All', ...new Set(blogs.map(blog => blog.category || 'Uncategorized'))];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || (blog.category || 'Uncategorized') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4" />
          <p>Loading your blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-md text-center text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/blog")}
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600"
            >
              <ArrowLeft size={20} />
              Back to Blog
            </button>
            <h1 className="text-2xl font-bold text-indigo-600 ml-4">
              My Blog Dashboard
            </h1>
          </div>
          <button
            onClick={() => {
              setEditingBlog(null);
              setShowEditor(true);
            }}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            <PlusCircle size={18} />
            Write Article
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search your articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm ${selectedCategory === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog List */}
        <div className="grid gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-sm p-6 border"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-xl font-bold">{blog.title}</h2>
                  <div className="flex gap-4 text-sm text-gray-500 mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{blog.readTime}</span>
                    </div>
                    {blog.category && (
                      <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">
                        {blog.category}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingBlog(blog);
                      setShowEditor(true);
                    }}
                    className="p-2 hover:bg-indigo-100 text-indigo-600 rounded"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 text-gray-600 rounded"
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 line-clamp-2">{blog.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Editor */}
      {showEditor && (
        <BlogWriteForm
          isOpen={showEditor}
          editingBlog={editingBlog}
          onClose={() => {
            setShowEditor(false);
            setEditingBlog(null);
          }}
          onSave={handleSave}
          onUpdateBlog={handleSave} // Reuse same handler for update
        />
      )}
    </div>
  );
};

export default UserBlogDashboard;
