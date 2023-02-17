import { getLocalToken } from "@/axios/storage";
import { UserRepository } from "@/repositories";
const state = {
  user: null,
};
const getters = {
  getUser: (state) => state?.user,
  isCurrentUser: (state) => (id) => state?.user?._id === id,
  isAuthenticated: (state) => !!state.user,
  isAdmin: (state) => state?.user?.role === "admin",
};
const actions = {
  setUser(user, payload) {
    user.commit("setUserInfo", payload);
  },
  async getInformation(user) {
    let token = getLocalToken();
    if (token) {
      const response = await UserRepository.get();
      user.commit("setUserInfo", response.data.user);
      return response.data.user;
    } else {
      return [];
    }
  },
};
const mutations = {
  setUserInfo(state, user) {
    state.user = user;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
