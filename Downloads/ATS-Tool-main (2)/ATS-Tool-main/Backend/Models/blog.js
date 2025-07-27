import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: 'ATS Expert',
  },
  category: {
    type: String,
    enum: [
      'Resume Optimization',
      'Job Search Strategy',
      'Industry Insights',
      'Success Stories',
      'ATS Tips',
      'Career Development',
    ],
    default: 'Resume Optimization',
  },
  tags: {
    type: [String],
    default: [],
    required: true,
  },
  readTime: {
    type: String,
    default: '5 min read',
  },
  date: {
    type: Date,
    default: Date.now,
  },

  // ✅ New: Link each blog to a specific user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
