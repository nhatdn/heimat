import instance from "@/axios";

const resource = "auth";

export default {
  login(userData) {
    return instance.post(`${resource}/login`, userData);
  },

  register(userData) {
    return instance.post(`${resource}/register`, userData);
  },

  verify(data) {
    return instance.post(`${resource}/verification`, data);
  },

  logout() {
    return instance.post(`${resource}/logout`, {});
  },

  changePassword(data) {
    return instance.post(`${resource}/change-password`, data);
  },
};
