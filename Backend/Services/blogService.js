import Blog from "../Models/blog.js";


export const createBlog = async (blogData) => {
  try {
    if (!blogData.user) {
      return { status: 400, data: { message: "User (userId) is required" } };
    }

    const newBlog = new Blog(blogData);
    await newBlog.save();
    return { status: 201, data: newBlog };
  } catch (error) {
    return { status: 500, data: { message: "Failed to create blog", error: error.message } };
  }
};



export const getAllBlogs = async () => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return { status: 200, data: blogs };
  } catch (error) {
    return { status: 500, data: { message: "Failed to fetch blogs", error: error.message } };
  }
};

export const getBlogById = async (id) => {
  try {
    const blog = await Blog.findById(id);
    if (!blog) return { status: 404, data: { message: "Blog not found" } };
    return { status: 200, data: blog };
  } catch (error) {
    return { status: 500, data: { message: "Failed to fetch blog", error: error.message } };
  }
};

export const updateBlog = async (id, blogData) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blogData, { new: true });
    if (!updatedBlog) return { status: 404, data: { message: "Blog not found" } };
    return { status: 200, data: updatedBlog };
  } catch (error) {
    return { status: 500, data: { message: "Failed to update blog", error: error.message } };
  }
};

export const deleteBlog = async (id) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) return { status: 404, data: { message: "Blog not found" } };
    return { status: 200, data: { message: "Blog deleted successfully" } };
  } catch (error) {
    return { status: 500, data: { message: "Failed to delete blog", error: error.message } };
  }
};

// ✅ Get blogs by user ID
export const getBlogsByUserId = async (userId) => {
  try {
    const blogs = await Blog.find({ user: userId }).sort({ createdAt: -1 });
    return { status: 200, data: blogs };
  } catch (error) {
    return { status: 500, data: { message: "Failed to fetch user's blogs", error: error.message } };
  }
};
