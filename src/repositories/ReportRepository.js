import instance from "@/axios";

const resource = "reports";

const user = {
  name: "user",
  getList: "user",
};
const blog = {
  name: "blog",
  getList: "list-blogs",
};
const comment = {
  name: "comment",
  getList: "list-comments",
};

export default {
  user(data) {
    return instance.post(`${resource}/${user.name}`, data);
  },

  getUserList() {
    return instance.post(`${resource}/${user.getList}`, {});
  },

  blog(data) {
    return instance.post(`${resource}/${blog.name}`, data);
  },

  getBlogList() {
    return instance.post(`${resource}/${blog.getList}`, {});
  },

  comment(data) {
    return instance.post(`${resource}/${comment.name}`, data);
  },

  getCommentList() {
    return instance.post(`${resource}/${comment.getList}`, {});
  },
};
