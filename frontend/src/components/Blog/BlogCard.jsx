import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Tag, Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';


const BlogCard = ({ post, onDelete,onEdit, showDelete = false, isSample = false }) => {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full">
            {post.category}
          </span>
        {showDelete && (
  <div className="flex items-center gap-2">
{onEdit && !isSample && (
  <button
    onClick={() => onEdit(post)}
    className="text-blue-500 hover:text-blue-700 transition-colors p-1 rounded-full hover:bg-blue-50"
    title="Edit post"
  >
    <Pencil className="w-4 h-4" />
  </button>
)}


    {onDelete && (
      <button
        onClick={() => {
          if (window.confirm('Are you sure you want to delete this blog post?')) {
            onDelete(post._id || post.id);
          }
        }}
        className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50"
        title="Delete post"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    )}
  </div>
)}

        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-indigo-600 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {post.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          onClick={() => {
            // You can implement individual blog post view here
            alert(`Reading: ${post.title}`);
          }}
        >
          Read More
        </motion.button>
      </div>
    </motion.article>
  );
};

export default BlogCard;