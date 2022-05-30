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
    path: '/lessons',
    name: 'LessonsList',
    component: () => import('@/views/LessonsList.vue'),
  },
  {
    path: '/lesson-edit/:id?',
    name: 'LessonEdit',
    component: () => import('@/views/LessonEdit.vue'),
    props: true,
  },
  {
    path: '/couples',
    name: 'CouplesList',
    component: () => import('@/views/CouplesList.vue'),
  },
  {
    path: '/couple-edit/:id?',
    name: 'CoupleEdit',
    component: () => import('@/views/CoupleEdit.vue'),
    props: true,
  },
  {
    path: '/degrees',
    name: 'DegreesList',
    component: () => import('@/views/DegreesList.vue'),
  },
  {
    path: '/degree-edit/:id?',
    name: 'DegreeEdit',
    component: () => import('@/views/DegreeEdit.vue'),
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
    path: '/teachers',
    name: 'TeachersList',
    component: () => import('@/views/TeachersList.vue'),
  },
  {
    path: '/teacher-edit/:id?',
    name: 'TeacherEdit',
    component: () => import('@/views/TeacherEdit.vue'),
    props: true,
  },
  {
    path: '/capacities',
    name: 'CapacitiesList',
    component: () => import('@/views/CapacitiesList.vue'),
  },
  {
    path: '/capacity-edit/:id?',
    name: 'CapacityEdit',
    component: () => import('@/views/CapacityEdit.vue'),
    props: true,
  },
  {
    path: '/console',
    name: 'QueryConsole',
    component: () => import('@/views/QueryConsole.vue'),
  },
  {
    path: '/procedure-test',
    name: 'ProcedureTest',
    component: () => import('@/views/ProcedureTest.vue'),
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
