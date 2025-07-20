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
