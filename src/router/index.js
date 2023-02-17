import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/home/Home.vue";
import admin from "./admin";
import auth from "./auth";
import blog from "./blog";
import store from "@/store";
import { UserRepository } from "@/repositories";
import { getLocalToken } from "@/axios/storage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      requiresAuth: false,
      layout: true,
      ableToWrite: true,
    },
  },
  {
    path: "/about",
    meta: {
      title: "About Heimat",
      requiresAuth: false,
      layout: false,
      ableToWrite: true,
    },
    name: "About",
    component: () => import("../views/info/About"),
  },
  {
    path: "/terms-of-use",
    name: "TermsOfUse",
    component: () => import("../views/error/error401"),
    meta: {
      title: "Terms Of Use",
      requiresAuth: false,
      ableToWrite: true,
    },
  },
  ...auth,
  ...admin,
  ...blog,
  {
    path: "/members",
    meta: {
      title: "AllMembers",
      requiresAuth: false,
      layout: true,
      ableToWrite: true,
    },
    props: true,
    name: "AllMembers",
    component: () => import("../views/members"),
  },
  {
    path: "/profile/:userUsername/:userId",
    meta: {
      title: "Profile",
      requiresAuth: false,
      layout: true,
      ableToWrite: true,
    },
    name: "Profile",
    component: () => import("../views/profile"),
  },
  {
    path: "/setting",
    meta: {
      title: "Setting",
      requiresAuth: true,
      layout: true,
    },
    name: "Setting",
    component: () => import("../views/setting"),
    children: [
      {
        path: "",
        meta: {
          title: "User Information",
          requiresAuth: true,
          layout: true,
        },
        name: "UserInformation",
        component: () => import("../views/setting/components/UserInformation"),
      },
      {
        path: "change-password",
        meta: {
          title: "Change Password",
          requiresAuth: true,
          layout: true,
        },
        name: "ChangePassword",
        component: () => import("../views/setting/components/ChangePassword"),
      },
    ],
  },
  {
    path: "/search",
    name: "Search",
    meta: {
      title: "Search",
      requiresAuth: false,
      layout: true,
      ableToWrite: true,
    },
    component: () => import("../views/search/SearchingResult"),
  },
  {
    path: "/error401",
    meta: {
      title: "Unauthorized",
      requiresAuth: false,
      layout: true,
    },
    name: "Unauthorized",
    component: () => import("../views/error/error401"),
  },
  {
    path: "*",
    meta: {
      title: "Error",
      requiresAuth: false,
      layout: true,
    },
    name: "Error",
    component: () => import("../views/error"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0, behavior: "smooth" };
  },
});

async function getInformation() {
  try {
    const response = await UserRepository.get();
    if (response.status === 200) {
      store.dispatch("user/setUser", response.data.user);
    }
  } catch (err) {
    console.log("Error when getting user information" + err);
  }
}

function nameGuard(to) {
  document.title = `${to.meta.title} | Heimat`;
}
async function routeGuard(to, from, next) {
  if (getLocalToken()) {
    if (!store.user) await getInformation();
    console.log("user" + store.user);
  }
  let isAuth = store.getters["user/isAuthenticated"];
  let isAdmin = store.getters["user/isAdmin"];
  if (isAuth) {
    if (to.name === "Login" || to.name === "Register") {
      return next({ name: "Home" });
    } else next();
    if (to.matched.some((res) => res.meta.AdminOnly)) {
      if (isAdmin) {
        return next();
      }
      return next({ name: "Home" });
    }
  } else {
    if (to.matched.some((value) => value.meta.requiresAuth)) {
      next({ name: "Login" });
    } else next();
  }
}

router.beforeEach(async (to, from, next) => {
  nameGuard(to);
  await routeGuard(to, from, next);
});

export default router;
