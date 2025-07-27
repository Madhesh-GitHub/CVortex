import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Eye, Tag, User, Calendar, Clock } from 'lucide-react';
import axios from 'axios';

const BlogWriteForm = ({ isOpen, onClose, onSave, editingBlog, onUpdateBlog }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    author: 'ATS Expert',
    category: 'Resume Optimization',
    tags: '',
    readTime: '5 min read'
  });

  const [isPreview, setIsPreview] = useState(false);

  const userId = sessionStorage.getItem('userId'); // ✅ Getting the userId here

  const categories = [
    'Resume Optimization',
    'Job Search Strategy',
    'Industry Insights',
    'Success Stories',
    'ATS Tips',
    'Career Development'
  ];

  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title || '',
        description: editingBlog.description || '',
        content: editingBlog.content || '',
        author: editingBlog.author || 'ATS Expert',
        category: editingBlog.category || 'Resume Optimization',
        tags: editingBlog.tags?.join(', ') || '',
        readTime: editingBlog.readTime || '5 min read'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        content: '',
        author: 'ATS Expert',
        category: 'Resume Optimization',
        tags: '',
        readTime: '5 min read'
      });
    }
    setIsPreview(false);
  }, [editingBlog, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.content) {
      alert('Please fill in all required fields');
      return;
    }

    const blogData = {
      title: formData.title,
      description: formData.description,
      content: formData.content,
      author: formData.author,
      category: formData.category,
      tags: formData.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag),
      readTime: formData.readTime,
      user: userId // ✅ attach user ID to backend payload
    };

    try {
      if (editingBlog?._id) {
        const res = await axios.put(`http://localhost:5000/api/blogs/update/${editingBlog._id}`, blogData);
        alert('Blog updated successfully!');
        if (onUpdateBlog) onUpdateBlog(res.data);
      } else {
        const res = await axios.post('http://localhost:5000/api/blogs/create', blogData);
        alert('Blog created successfully!');
        if (onSave) onSave(res.data);
      }

      setFormData({
        title: '',
        description: '',
        content: '',
        author: 'ATS Expert',
        category: 'Resume Optimization',
        tags: '',
        readTime: '5 min read'
      });

      setIsPreview(false);
      onClose();
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Error creating blog. Please try again.');
    }
  };

  const handleClose = () => {
    setIsPreview(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {isPreview ? 'Preview Blog Post' : editingBlog ? 'Edit Blog Post' : 'Write New Blog Post'}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Eye size={18} />
              {isPreview ? 'Edit' : 'Preview'}
            </button>
            <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {isPreview ? (
            <div className="prose max-w-none">
              <div className="mb-6">
                <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {formData.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{formData.title}</h1>
                <p className="text-xl text-gray-600 mb-4">{formData.description}</p>

                <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{formData.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formData.readTime}</span>
                  </div>
                </div>

                {formData.tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {formData.tags.split(',').map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="whitespace-pre-line text-gray-800 leading-relaxed">{formData.content}</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blog Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter an engaging blog title..."
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Write a brief description..."
                  required
                />
              </div>

              {/* Category, Author, ReadTime */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Read Time</label>
                  <input
                    type="text"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., 5 min read"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="ATS, Resume Tips, Job Search"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blog Content *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={15}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                  placeholder="Write your blog content here..."
                  required
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  <Save size={18} />
                  Publish Blog Post
                </motion.button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BlogWriteForm;
