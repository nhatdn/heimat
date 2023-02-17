export default [
  {
    path: '/admin',
    meta: {
      title: 'Admin',
      requiresAuth: true,
      AdminOnly: true,
    },
    name: 'Admin',
    component: () => import('@/views/admin'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/admin/components/Dashboard'),
        meta: {
          title: 'Dashboard',
          requiresAuth: true,
          AdminOnly: true,
        },
      },
      {
        path: 'members',
        name: 'Members',
        component: () => import('../views/admin/components/Members'),
        meta: {
          title: 'Members',
          requiresAuth: true,
          AdminOnly: true,
        },
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('../views/admin/components/Categories'),
        meta: {
          title: 'Categories',
          requiresAuth: true,
          AdminOnly: true,
        },
      },
      {
        path: 'blogs',
        name: 'Blogs',
        component: () => import('../views/admin/components/Blogs'),
        meta: {
          title: 'Blogs',
          requiresAuth: true,
          AdminOnly: true,
        },
      },
      {
        path: 'comments',
        name: 'Comments',
        component: () => import('../views/admin/components/Comments'),
        meta: {
          title: 'Comments',
          requiresAuth: true,
          AdminOnly: true,
        },
      },
      {
        path: 'reports',
        name: 'Reports',
        component: () => import('../views/admin/components/Reports'),
        meta: {
          title: 'Reports',
          requiresAuth: true,
          AdminOnly: true,
        },
      },
    ],
  },
];
