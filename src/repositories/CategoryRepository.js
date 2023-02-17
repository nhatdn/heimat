import instance from "@/axios";

const resource = "categories";

export default {
  get() {
    return instance.get(`${resource}`);
  },

  getRate() {
    return instance.post(`${resource}/rate`, {});
  },

  create(categoryData) {
    return instance.post(`${resource}`, categoryData);
  },

  update(categoryData) {
    /// update is POST or PUT? big question
    return instance.put(`${resource}`, categoryData);
  },

  delete(data) {
    return instance.delete(`${resource}`, { data });
  },
};
