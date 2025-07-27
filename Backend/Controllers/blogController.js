import * as blogService from '../Services/blogService.js';

export const create = async (req, res) => {
  const { status, data } = await blogService.createBlog(req.body);
  res.status(status).json(data);
};

export const getAll = async (req, res) => {
  const { status, data } = await blogService.getAllBlogs();
  res.status(status).json(data);
};

export const getById = async (req, res) => {
  const { status, data } = await blogService.getBlogById(req.params.id);
  res.status(status).json(data);
};

export const update = async (req, res) => {
  const { status, data } = await blogService.updateBlog(req.params.id, req.body);
  res.status(status).json(data);
};

export const remove = async (req, res) => {
  const { status, data } = await blogService.deleteBlog(req.params.id);
  res.status(status).json(data);
};

export const getUserBlogs = async (req, res) => {
  const { userId } = req.params;
  const result = await getBlogsByUserId(userId);
  return res.status(result.status).json(result.data);
};

// ✅ Get blogs by user ID
export const getByUserId = async (req, res) => {
  const { status, data } = await blogService.getBlogsByUserId(req.params.userId);
  res.status(status).json(data);
};
