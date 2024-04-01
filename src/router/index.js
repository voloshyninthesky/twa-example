import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // Add more routes here as needed
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
