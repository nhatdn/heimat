import instance from "@/axios";

const resource = "blogs";

export default {
  getAll() {
    return instance.get(`${resource}/all`);
  },

  get(blogId) {
    return instance.get(`${resource}/${blogId}`);
  },

  getByCategory(categoryId) {
    return instance.get(`${resource}/by-category`, categoryId);
  },

  getByUser(userId) {
    return instance.get(`${resource}`, userId);
  },

  create(blogData) {
    return instance.post(`${resource}`, blogData);
  },

  update(blogId, blogData) {
    return instance.put(`${resource}/${blogId}`, blogData);
  },

  delete(blogId) {
    return instance.delete(`${resource}/${blogId}`);
  },
  getByPagination(data) {
    return instance.post(`${resource}/pagination`, data);
  },
  getByMonth(data) {
    return instance.post(`${resource}/month`, data);
  },

  upvote(blogId) {
    return instance.post(`${resource}/upvote/${blogId}`, {});
  },

  downvote(blogId) {
    return instance.post(`${resource}/downvote/${blogId}`, {});
  },
};
