import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'StudentsList',
    component: () => import('@/views/StudentsList.vue'),
  },
  {
    path: '/student-edit/:id?',
    name: 'StudentEdit',
    component: () => import('@/views/StudentEdit.vue'),
    props: true,
  },
  {
    path: '/groups',
    name: 'GroupsList',
    component: () => import('@/views/GroupsList.vue'),
  },
  {
    path: '/group-edit/:id?',
    name: 'GroupEdit',
    component: () => import('@/views/GroupEdit.vue'),
    props: true,
  },
  {
    path: '/posts',
    name: 'PostsList',
    component: () => import('@/views/PostsList.vue'),
  },
  {
    path: '/post-edit/:id?',
    name: 'PostEdit',
    component: () => import('@/views/PostEdit.vue'),
    props: true,
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/StudentsList.vue'),
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
