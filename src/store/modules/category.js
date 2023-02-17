import { CategoryRepository } from "@/repositories";
const state = {
  categories: null, //"Inspire", "Motherhood", "Confession", "Animal", "News"
};
const getters = {
  getCategoryList: (state) => state.categories,
  getCategory: (state) => (id) => state.categories?.find((item) => item._id == id),
};

const actions = {
  getData({ commit }) {
    return (async () => {
      const response = await CategoryRepository.get();
      console.log(response.data);
      commit("SET_CATEGORIES", response.data.categories);
      return response.data.categories;
    })();
  },
};
const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
