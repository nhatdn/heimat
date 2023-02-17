import instance from '../../axios';
const state = {
  currentBlog: {},
  blogsByCategoryId: [],
};
const getters = {
  getCurrentBlog: (state) => state.currentBlog,
  getBlogsByCategoryId: (state) => state.blogsByCategoryId,
};
const actions = {
  setCurrentBlog(blog, payload) {
    blog.commit('handleCurrentBlog', payload);
  },
  setBlogsByCategoryId({ commit }, id) {
    return (async () => {
      const response = await instance.get(`/blogs/by-category?category_id=${id}`);
      commit('BLOG_BY_CATEGORY_ID', response.data.result);
      return response.data.result;
    })();
  },
};
const mutations = {
  handleCurrentBlog(state, payload) {
    state.currentBlog = payload;
  },
  BLOG_BY_CATEGORY_ID(state, payload) {
    state.blogsByCategoryId = payload;
    console.log(state.blogsByCategoryId);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
