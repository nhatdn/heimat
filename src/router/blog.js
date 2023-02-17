export default [
  {
    path: "/category/all",
    meta: {
      title: "All Category",
      requiresAuth: false,
      ableToWrite: true,
      layout: true,
    },
    props: true,
    name: "AllCategory",
    component: () => import("../views/category/AllCategory"),
  },
  {
    path: "/category/:categoryId",
    meta: {
      title: "Category",
      requiresAuth: false,
      ableToWrite: true,
      layout: true,
    },
    props: true,
    name: "Category",
    component: () => import("../views/category"),
  },
  {
    path: "/blog/create-blog",
    meta: {
      title: "Create Blog",
      requiresAuth: true,
      layout: true,
    },
    name: "CreateBlog",
    component: () => import("../views/blog/CreateBlog"),
  },
  {
    path: "/blog/edit-blog/:blogId",
    meta: {
      title: "Edit Blog",
      requiresAuth: true,
      layout: true,
    },
    name: "EditBlog",
    component: () => import("../views/blog/EditBlog"),
  },
  {
    path: "/blog/:blogId",
    meta: {
      title: "View Blog",
      requiresAuth: false,
      ableToWrite: true,
      layout: true,
    },
    name: "ViewBlog",
    component: () => import("../views/blog/ViewBlog"),
  },
];
