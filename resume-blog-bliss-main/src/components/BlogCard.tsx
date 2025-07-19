
import { motion } from "framer-motion";
import { Clock, User, ArrowRight, Trash2 } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
}

interface BlogCardProps {
  post: BlogPost;
  onDelete?: (id: number) => void;
  showDelete?: boolean;
}

const BlogCard = ({ post, onDelete, showDelete = false }: BlogCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      "Resume Optimization": "bg-indigo-100 text-indigo-700",
      "Resume Writing": "bg-sky-100 text-sky-700",
      "Career Strategy": "bg-emerald-100 text-emerald-700",
      "Career Insights": "bg-purple-100 text-purple-700",
      "Resume Tips": "bg-orange-100 text-orange-700"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
            {post.category}
          </span>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {post.readTime}
            </div>
            {showDelete && onDelete && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(post.id);
                }}
                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                title="Delete blog"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
          {post.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full flex items-center justify-center mr-3">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{post.author}</p>
              <p className="text-xs text-gray-500">{post.date}</p>
            </div>
          </div>

          <motion.div
            whileHover={{ x: 5 }}
            className="text-indigo-600 group-hover:text-indigo-700"
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;
