import { User, Calendar, Clock, Tag } from 'lucide-react';
import { useEffect } from 'react';

const BlogDetail = ({ post, onClose }) => {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start bg-black bg-opacity-40 overflow-y-auto">
      <div className="bg-white mt-10 max-w-3xl w-full p-6 rounded-lg relative shadow-xl mx-4 sm:mx-0">
        <button
          className="absolute top-3 right-3 text-red-600 font-semibold"
          onClick={onClose}
        >
          Close
        </button>
        
        <h2 className="text-3xl font-bold mb-3 text-gray-900">{post.title}</h2>

        <p className="text-gray-700 mb-4 text-lg">{post.description}</p>

        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mb-4">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
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

        <div className="prose max-w-none text-gray-800 leading-relaxed">
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
