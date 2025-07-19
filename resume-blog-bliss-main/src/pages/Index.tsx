
import { useState } from "react";
import { motion } from "framer-motion";
import BlogHero from "../components/BlogHero";
import BlogList from "../components/BlogList";
import BlogForm from "../components/BlogForm";

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

const initialBlogs: BlogPost[] = [
  {
    id: 1,
    title: "10 ATS Keywords That Will Get Your Resume Noticed in 2024",
    description: "Discover the most effective ATS keywords and learn how to naturally integrate them into your resume to pass automated screening systems.",
    author: "Sarah Chen",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    tags: ["ATS", "Keywords", "Resume Tips"],
    category: "Resume Optimization"
  },
  {
    id: 2,
    title: "The Complete Guide to Writing ATS-Friendly Resume Headlines",
    description: "Master the art of crafting compelling resume headlines that both ATS systems and hiring managers will love.",
    author: "Michael Rodriguez",
    date: "Dec 12, 2024",
    readTime: "7 min read",
    tags: ["Headlines", "ATS", "Writing"],
    category: "Resume Writing"
  },
  {
    id: 3,
    title: "Common Resume Formatting Mistakes That Kill Your ATS Score",
    description: "Avoid these critical formatting errors that prevent your resume from being properly parsed by applicant tracking systems.",
    author: "Emily Johnson",
    date: "Dec 10, 2024",
    readTime: "6 min read",
    tags: ["Formatting", "ATS", "Common Mistakes"],
    category: "Resume Optimization"
  },
  {
    id: 4,
    title: "How to Optimize Your Resume for Different Industries",
    description: "Learn industry-specific strategies for tailoring your resume to match the expectations of different sectors and roles.",
    author: "David Park",
    date: "Dec 8, 2024",
    readTime: "8 min read",
    tags: ["Industry", "Customization", "Strategy"],
    category: "Career Strategy"
  },
  {
    id: 5,
    title: "The Psychology Behind Recruiter Resume Screening",
    description: "Understand what recruiters really look for and how to structure your resume to capture their attention in seconds.",
    author: "Lisa Thompson",
    date: "Dec 5, 2024",
    readTime: "6 min read",
    tags: ["Psychology", "Recruiters", "Screening"],
    category: "Career Insights"
  },
  {
    id: 6,
    title: "Remote Work Resume: Highlighting Your Virtual Collaboration Skills",
    description: "Showcase your remote work experience and virtual collaboration abilities to stand out in the modern job market.",
    author: "Alex Kumar",
    date: "Dec 3, 2024",
    readTime: "5 min read",
    tags: ["Remote Work", "Skills", "Modern Resume"],
    category: "Resume Tips"
  }
];

const Index = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [showBlogForm, setShowBlogForm] = useState(false);

  const handleAddBlog = (newBlog: Omit<BlogPost, 'id' | 'date'>) => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const blog: BlogPost = {
      ...newBlog,
      id: Math.max(...blogs.map(b => b.id), 0) + 1,
      date: currentDate
    };

    setBlogs(prev => [blog, ...prev]);
    setShowBlogForm(false);
  };

  const handleDeleteBlog = (id: number) => {
    setBlogs(prev => prev.filter(blog => blog.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHero />
      <BlogList 
        blogs={blogs}
        onDeleteBlog={handleDeleteBlog}
        onWriteBlog={() => setShowBlogForm(true)}
      />
      
      {showBlogForm && (
        <BlogForm
          onSave={handleAddBlog}
          onClose={() => setShowBlogForm(false)}
        />
      )}
    </div>
  );
};

export default Index;
