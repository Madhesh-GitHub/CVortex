import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, PlusCircle, Search } from 'lucide-react';
import BlogList from '../components/Blog/BlogList';
import BlogWriteForm from '../components/Blog/BlogWriteForm';
import { COLORS } from '../styles/colors';
import axios from 'axios';

// Sample blog data
const sampleBlogs = [
  {
    id: 1,
    isSample: true,
    title: "10 ATS-Friendly Resume Tips That Actually Work",
    description: "Discover proven strategies to optimize your resume for Applicant Tracking Systems and increase your chances of landing interviews.",
    author: "ATS Expert",
    date: "2025-01-15",
    readTime: "5 min read",
    tags: ["ATS", "Resume Tips", "Job Search"],
    category: "Resume Optimization"
  },
  {
    id: 2,
    isSample: true,
    title: "How to Beat the ATS: Keywords That Matter",
    description: "Learn which keywords recruiters are looking for and how to naturally incorporate them into your resume without keyword stuffing.",
    author: "Career Coach",
    date: "2025-01-12",
    readTime: "7 min read",
    tags: ["Keywords", "ATS", "Recruitment"],
    category: "Job Search Strategy"
  },
  {
    id: 3,
    isSample: true,
    title: "Resume Formatting: Do's and Don'ts for ATS",
    description: "Understand the formatting rules that can make or break your resume's success with Applicant Tracking Systems.",
    author: "Resume Writer",
    date: "2025-01-10",
    readTime: "6 min read",
    tags: ["Formatting", "ATS", "Resume Design"],
    category: "Resume Optimization"
  },
  {
    id: 4,
    isSample: true,
    title: "Success Story: From 0 to 5 Interviews in 2 Weeks",
    description: "Read how Sarah transformed her resume using our ATS optimization tips and landed multiple interviews in just 2 weeks.",
    author: "Success Stories",
    date: "2025-01-08",
    readTime: "4 min read",
    tags: ["Success Story", "Case Study", "Interview"],
    category: "Success Stories"
  },
  {
    id: 5,
    isSample: true,
    title: "Industry-Specific Resume Keywords for 2025",
    description: "Get the latest keyword trends for different industries and learn how to tailor your resume for specific job roles.",
    author: "Industry Expert",
    date: "2025-01-05",
    readTime: "8 min read",
    tags: ["Keywords", "Industry Trends", "2025"],
    category: "Industry Insights"
  },
  {
    id: 6,
    isSample: true,
    title: "Common ATS Mistakes That Kill Your Chances",
    description: "Avoid these critical mistakes that prevent your resume from passing through ATS filters and reaching human recruiters.",
    author: "ATS Expert",
    date: "2025-01-03",
    readTime: "5 min read",
    tags: ["ATS Mistakes", "Common Errors", "Resume Tips"],
    category: "Resume Optimization"
  }
];

const BlogPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isWriteFormOpen, setIsWriteFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/blogs');
        const backendTitles = res.data.map(b => b.title);
        const filteredSamples = sampleBlogs.filter(sb => !backendTitles.includes(sb.title));
        setBlogs([...filteredSamples, ...res.data]);
      } catch (error) {
        console.error("Failed to fetch blogs from server", error);
        setBlogs(sampleBlogs); // fallback
      }
    };
    fetchBlogs();
  }, []);

  const categories = ['All', ...new Set(blogs.map(blog => blog.category))];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteBlog = async (id) => {
    const isSample = blogs.find(blog => blog.id === id);
    if (isSample) {
      setBlogs(prev => prev.filter(blog => blog.id !== id));
      alert('Sample blog deleted (frontend only)');
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/blogs/delete/${id}`);
      setBlogs(prev => prev.filter(blog => blog._id !== id && blog.id !== id));
      alert('Blog deleted successfully!');
    } catch (error) {
      console.error('Failed to delete blog:', error);
      alert('Failed to delete blog. Please try again.');
    }
  };

  const handleWriteBlog = () => {
    setEditingBlog(null);
    setIsWriteFormOpen(true);
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setIsWriteFormOpen(true);
  };

  const handleUpdateBlog = (updatedBlog) => {
    setBlogs(prev =>
      prev.map(blog => blog._id === updatedBlog._id ? updatedBlog : blog)
    );
    console.log('Updated blog successfully:', updatedBlog);
    setIsWriteFormOpen(false);
  };

  const handleSaveBlog = (newBlog) => {
    setBlogs(prev => [newBlog, ...prev]);
    console.log('New blog saved:', newBlog);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <ArrowLeft size={20} />
                Back to Home
              </button>
              <div className="h-6 border-l border-gray-300"></div>
              <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
                ATS Blog
              </h1>
            </div>

            {/* Right Side Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleWriteBlog}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <PlusCircle size={18} />
                Write Article
              </button>
              <button
                onClick={() => navigate('/dashboard/blogs')}
                className="text-sm font-medium text-indigo-600 hover:underline"
              >
                My Blogs
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Info */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredBlogs.length} of {blogs.length} articles
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </div>
        </motion.div>

        {/* Blog List */}
        <BlogList
          blogs={filteredBlogs}
          onDeleteBlog={handleDeleteBlog}
          onWriteBlog={handleWriteBlog}
          onEditBlog={handleEditBlog}
        />
      </div>

      {/* Blog Write Form Modal */}
      <BlogWriteForm
        isOpen={isWriteFormOpen}
        onClose={() => setIsWriteFormOpen(false)}
        onSave={handleSaveBlog}
        editingBlog={editingBlog}
        onUpdateBlog={handleUpdateBlog}
      />
    </motion.div>
  );
};

export default BlogPage;
