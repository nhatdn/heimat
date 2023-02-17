export default [
  {
    path: "/login",
    meta: {
      title: "Login",
      requiresAuth: false,
      layout: false,
    },
    name: "Login",
    component: () => import("../views/auth/Login"),
  },
  {
    path: "/register",
    meta: {
      title: "Register",
      requiresAuth: false,
      layout: false,
    },
    name: "Register",
    component: () => import("../views/auth/Register"),
  },
  {
    path: "/forgot-password",
    meta: {
      title: "Forgot Password",
      requiresAuth: false,
      layout: false,
    },
    name: "Forgot",
    component: () => import("../views/auth/Forgot"),
    beforeEnter(to, from, next) {
      if (from.name === "Login") next();
      else next({ name: "Home" });
    },
  },
  {
    path: "/verify",
    meta: {
      title: "Verify Account",
      requiresAuth: false,
      layout: false,
    },
    name: "Verify",
    component: () => import("../views/auth/Verify"),
    beforeEnter(to, from, next) {
      if (from.name === "Forgot" || from.name === "Register") next();
      else next({ name: "Home" });
    },
  },
  {
    path: "/reset-password",
    meta: {
      title: "Reset Password",
      requiresAuth: false,
      layout: false,
    },
    name: "Reset",
    component: () => import("../views/auth/Reset"),
    beforeEnter(to, from, next) {
      if (from.name === "Verify") next();
      else next({ name: "Home" });
    },
  },
];
