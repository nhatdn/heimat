import instance from "@/axios";
const resource = "comments";
export default {
  get() {
    return instance.post(`${resource}`, {});
  },

  update(commentId, commentData) {
    return instance.put(`${resource}/${commentId}`, commentData);
  },

  create(commentData) {
    return instance.post(`${resource}`, commentData);
  },

  delete(data) {
    return instance.delete(`${resource}/`, { data });
  },

  upvote(commentId) {
    return instance.post(`${resource}/upvote`, commentId);
  },

  downvote(commentId) {
    return instance.post(`${resource}/downvote`, commentId);
  },
  allComments() {
    return instance.get(`${resource}/all`);
  },
};
