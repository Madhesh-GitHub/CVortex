import Blog from '../Models/blog.js';

export const createBlog = async (data) => {
    try {
        const blog = await Blog.create(data);
        return { status: 201, data: blog };
    } catch (error) {
        return { status: 500, data: { error: 'Error creating blog' } };
    }
};

export const getAllBlogs = async () => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        return { status: 200, data: blogs };
    } catch {
        return { status: 500, data: { error: 'Error fetching blogs' } };
    }
};

export const getBlogById = async (id) => {
    try {
        const blog = await Blog.findById(id);
        if (!blog) return { status: 404, data: { error: 'Blog not found' } };
        return { status: 200, data: blog };
    } catch {
        return { status: 500, data: { error: 'Error fetching blog' } };
    }
};

export const updateBlog = async (id, data) => {
    try {
        const updated = await Blog.findByIdAndUpdate(id, data, { new: true });
        if (!updated) return { status: 404, data: { error: 'Blog not found' } };
        return { status: 200, data: updated };
    } catch {
        return { status: 500, data: { error: 'Error updating blog' } };
    }
};

export const deleteBlog = async (id) => {
    try {
        const deleted = await Blog.findByIdAndDelete(id);
        if (!deleted) return { status: 404, data: { error: 'Blog not found' } };
        return { status: 200, data: { message: 'Blog deleted' } };
    } catch {
        return { status: 500, data: { error: 'Error deleting blog' } };
    }
};
