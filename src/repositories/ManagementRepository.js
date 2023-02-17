import instance from "@/axios";

const resource = "managements";

const extend = {
  createAdmin: "create-account-admin",
};

const user = {
  lock: "lock-user",
  unlock: "unlock-user",
  getList: "list-locked-users",
};
const blog = {
  lock: "lock-blog",
  unlock: "unlock-blog",
  getList: "list-locked-blogs",
};
const comment = {
  lock: "lock-comment",
  unlock: "unlock-comment",
  getList: "list-locked-comments",
};
const search = {
  all: "search",
  member: "",
  blog: "",
};

export default {
  createAdmin(data) {
    return instance.post(`${resource}/${extend.createAdmin}`, data);
  },
  lockUser(userId) {
    return instance.post(`${resource}/${user.lock}`, userId);
  },

  unlockUser(userId) {
    return instance.post(`${resource}/${user.unlock}`, userId);
  },

  getUserLockList() {
    return instance.post(`${resource}/${user.getList}`, {});
  },

  lockBlog(blogId) {
    return instance.post(`${resource}/${blog.lock}`, blogId);
  },

  unlockBlog(blogId) {
    return instance.post(`${resource}/${blog.unlock}`, blogId);
  },

  getBlogLockList() {
    return instance.post(`${resource}/${blog.getList}`, {});
  },

  lockComment(commentId) {
    return instance.post(`${resource}/${comment.lock}`, commentId);
  },

  unlockComment(commentId) {
    return instance.post(`${resource}/${comment.unlock}`, commentId);
  },

  getCommentLockList() {
    return instance.post(`${resource}/${comment.getList}`, {});
  },

  searchUserAndBlog(data) {
    return instance.post(`${resource}/${search.all}`, data);
  },
  getDashBoard(data) {
    return instance.post(`${resource}/statistical`, data);
  },
  
};
