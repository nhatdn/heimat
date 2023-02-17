import { ManagementRepository } from "@/repositories";

const state = {
  result: {
    users: [],
    blogs: [],
  },
};
const getters = {
  getResult: (state) => state.result,
};
const actions = {
  searchBlogsAndUsers({ commit }, data) {
    ManagementRepository.searchUserAndBlog(data).then((res) => {
      console.log(res.data);
      commit("setResult", res.data);
    });
  },
};
const mutations = {
  setResult(state, result) {
    state.result = result;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
