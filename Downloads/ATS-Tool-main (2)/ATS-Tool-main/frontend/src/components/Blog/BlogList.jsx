import React, { useState } from 'react';

import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import BlogCard from "./BlogCard";
import BlogDetail from './BlogDetail';

const BlogList = ({ blogs, onDeleteBlog, onWriteBlog, onEditBlog }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const handleReadMore = (post) => {
    setSelectedPost(post);
  };
  const handleCloseDetails = () => {
    setSelectedPost(null);
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Latest Articles
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl">
                Stay ahead with our expert insights on resume optimization, ATS systems, and career development strategies.
              </p>
            </div>
            <motion.button
              onClick={onWriteBlog}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-lg mt-4 sm:mt-0"
            >
              <PlusCircle className="w-5 h-5" />
              Write Blog
            </motion.button>
          </div>
        </motion.div>

        {blogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-gray-500 mb-4">
              <PlusCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium mb-2">No blogs yet</h3>
              <p>Be the first to write a blog post!</p>
            </div>
            <motion.button
              onClick={onWriteBlog}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Write Your First Blog
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post, index) => (
              <motion.div
                key={post._id || post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <BlogCard
                  post={post}
                  onDelete={onDeleteBlog}
                  onEdit={onEditBlog}
                  showDelete={true}
                  isSample={!!post.isSample}
                  onReadMore={handleReadMore}
                />
              </motion.div>
            ))}

          </div>
        )}
      </div>
      {selectedPost && (
        <BlogDetail post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </section>
  );
};

export default BlogList;