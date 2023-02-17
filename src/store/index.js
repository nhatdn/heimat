import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import blog from "./modules/blog";
import category from "./modules/category";
import search from "./modules/search";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    blog,
    category,
    search,
  },
});
