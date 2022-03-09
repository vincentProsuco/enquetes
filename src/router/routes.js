const routes = [
  {
    path: '/login',
    meta: { requiresAuth: false },
    component: () => import('layouts/login.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'instellingen', component: () => import('pages/instellingen.vue') }
    ]
  },
  {
    path: '/klanten',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('pages/klanten.vue') },
    ]
  },
  {
    path: '/enquetes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/enquetes.vue') },
      { path: 'new', component: () => import('pages/nieuweEnquete.vue') },
      { path: 'edit/:id', component: () => import('pages/nieuweEnquete.vue') }
    ]
  },
  {
    path: '/results/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/results/results.vue') },
    ]
  },

  {
    path: '/enquete/:klant:id',
    component: () => import('layouts/enqueteView.vue'),
    // children: [
    //   { path: '', component: () => import('layouts/enqueteView.vue') },
    // ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
