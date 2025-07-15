"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, User, ArrowRight, Mail, Clock, Tag, ChevronRight, Star } from "lucide-react"

const BlogPage = () => {
  const [selectedTag, setSelectedTag] = useState("All")
  const [selectedPost, setSelectedPost] = useState(null)
  const [email, setEmail] = useState("")

  // Mock blog data
  const blogPosts = [
    {
      id: 1,
      title: "10 ATS-Friendly Resume Tips That Actually Work in 2024",
      excerpt:
        "Discover the latest strategies to make your resume pass through Applicant Tracking Systems and land more interviews.",
      content: `
        <h2>Understanding ATS Systems</h2>
        <p>Applicant Tracking Systems (ATS) are software applications that help employers manage the recruitment process. Understanding how they work is crucial for job seekers in today's competitive market.</p>
        
        <h3>Key ATS Optimization Strategies</h3>
        <ul>
          <li>Use standard section headings like "Work Experience" and "Education"</li>
          <li>Include relevant keywords from the job description</li>
          <li>Avoid complex formatting and graphics</li>
          <li>Use a clean, simple layout</li>
        </ul>
        
        <p>By following these guidelines, you'll significantly improve your chances of getting past the initial ATS screening and into the hands of human recruiters.</p>
      `,
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      tags: ["ATS", "Resume", "Career Tips"],
      featured: true,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "The Psychology Behind Recruiter Decision Making",
      excerpt:
        "Learn what recruiters really look for when scanning resumes and how to make yours stand out in the first 6 seconds.",
      content: `
        <h2>The 6-Second Rule</h2>
        <p>Research shows that recruiters spend an average of just 6 seconds reviewing a resume before deciding whether to continue reading or move on to the next candidate.</p>
        
        <h3>What Catches a Recruiter's Eye</h3>
        <ul>
          <li>Clear, professional formatting</li>
          <li>Relevant job titles and company names</li>
          <li>Quantifiable achievements</li>
          <li>Skills that match the job requirements</li>
        </ul>
      `,
      author: "Michael Chen",
      date: "2024-01-12",
      readTime: "7 min read",
      tags: ["Recruiting", "Career Tips", "Psychology"],
      featured: false,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Remote Work Resume: How to Showcase Virtual Experience",
      excerpt: "Master the art of presenting remote work experience on your resume to appeal to modern employers.",
      content: `
        <h2>Highlighting Remote Work Skills</h2>
        <p>Remote work has become the new normal, and employers are looking for candidates who can thrive in virtual environments.</p>
        
        <h3>Key Remote Work Skills to Highlight</h3>
        <ul>
          <li>Self-motivation and time management</li>
          <li>Digital communication proficiency</li>
          <li>Virtual collaboration tools experience</li>
          <li>Results-driven work approach</li>
        </ul>
      `,
      author: "Emily Rodriguez",
      date: "2024-01-10",
      readTime: "4 min read",
      tags: ["Remote Work", "Resume", "Modern Workplace"],
      featured: true,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      title: "Industry-Specific Resume Keywords That Get Results",
      excerpt:
        "Discover the most effective keywords for your industry and learn how to naturally incorporate them into your resume.",
      content: `
        <h2>The Power of Industry Keywords</h2>
        <p>Using the right keywords can make the difference between your resume being seen by a human recruiter or getting lost in the digital void.</p>
        
        <h3>Research Strategies</h3>
        <ul>
          <li>Analyze job descriptions in your field</li>
          <li>Study competitor profiles on LinkedIn</li>
          <li>Use industry-specific terminology</li>
          <li>Include both hard and soft skills</li>
        </ul>
      `,
      author: "David Park",
      date: "2024-01-08",
      readTime: "6 min read",
      tags: ["Keywords", "ATS", "Industry Trends"],
      featured: false,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 5,
      title: "Cover Letter Mistakes That Kill Your Chances",
      excerpt: "Avoid these common cover letter pitfalls that immediately turn off hiring managers and recruiters.",
      content: `
        <h2>Common Cover Letter Mistakes</h2>
        <p>A poorly written cover letter can instantly disqualify you from consideration, regardless of how strong your resume might be.</p>
        
        <h3>Top Mistakes to Avoid</h3>
        <ul>
          <li>Generic, one-size-fits-all letters</li>
          <li>Repeating information from your resume</li>
          <li>Focusing on what you want instead of what you offer</li>
          <li>Poor grammar and spelling errors</li>
        </ul>
      `,
      author: "Lisa Thompson",
      date: "2024-01-05",
      readTime: "5 min read",
      tags: ["Cover Letter", "Career Tips", "Job Search"],
      featured: false,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 6,
      title: "Salary Negotiation: How Your Resume Sets the Stage",
      excerpt: "Learn how to position your resume to support higher salary negotiations and demonstrate your value.",
      content: `
        <h2>Building Your Value Proposition</h2>
        <p>Your resume is the foundation for all future salary negotiations. It needs to clearly demonstrate your worth and impact.</p>
        
        <h3>Quantifying Your Impact</h3>
        <ul>
          <li>Use specific numbers and percentages</li>
          <li>Highlight cost savings and revenue generation</li>
          <li>Show progression and growth</li>
          <li>Include awards and recognition</li>
        </ul>
      `,
      author: "Robert Kim",
      date: "2024-01-03",
      readTime: "8 min read",
      tags: ["Salary", "Negotiation", "Career Growth"],
      featured: true,
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const allTags = ["All", ...Array.from(new Set(blogPosts.flatMap((post) => post.tags)))]
  const featuredPosts = blogPosts.filter((post) => post.featured).slice(0, 3)

  const filteredPosts = selectedTag === "All" ? blogPosts : blogPosts.filter((post) => post.tags.includes(selectedTag))

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  // Scroll animation hook
  const useScrollAnimation = () => {
    const controls = useAnimation()
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-100px" })

    useEffect(() => {
      if (inView) {
        controls.start("visible")
      }
    }, [controls, inView])

    return [ref, controls]
  }

  if (selectedPost) {
    return <SingleBlogView post={selectedPost} onBack={() => setSelectedPost(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-16 pb-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Level Up Your <span className="text-indigo-600">Resume Game</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest ATS resume tips, industry trends, and recruiter insights to accelerate your
            career growth.
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Grid */}
          <div className="lg:col-span-2">
            {/* Tags Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedTag === tag
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200"
                    }`}
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} onClick={() => setSelectedPost(post)} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Featured Posts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                Featured Posts
              </h3>
              <div className="space-y-4">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    onClick={() => setSelectedPost(post)}
                    className="cursor-pointer group"
                  >
                    <h4 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors text-sm mb-1">
                      {post.title}
                    </h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Mail className="h-5 w-5 text-emerald-600 mr-2" />
                Subscribe to Newsletter
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Get the latest resume tips and career insights delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md font-medium hover:bg-emerald-700 transition-colors"
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>

            {/* Popular Tags */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Tag className="h-5 w-5 text-sky-600 mr-2" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(1).map((tag) => (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedTag(tag)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Blog Card Component
const BlogCard = ({ post, index, onClick }) => {
  const [ref, controls] = useScrollAnimation()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: index * 0.1 },
        },
      }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer group"
    >
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {post.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">Featured</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {post.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(post.date).toLocaleDateString()}
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {post.readTime}
          </div>
        </div>

        <motion.div whileHover={{ x: 5 }} className="mt-4 flex items-center text-indigo-600 font-medium text-sm">
          Read More
          <ArrowRight className="h-4 w-4 ml-1" />
        </motion.div>
      </div>
    </motion.div>
  )
}

// Single Blog View Component
const SingleBlogView = ({ post, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Article Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-16 pb-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors mb-8"
          >
            <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
            Back to Blog
          </motion.button>
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {post.readTime}
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-8">
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} className="text-gray-700 leading-relaxed" />
          </div>
        </div>
      </motion.article>
    </div>
  )
}

// Hook for scroll animations
const useScrollAnimation = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return [ref, controls]
}

export default BlogPage
