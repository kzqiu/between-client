import { createRouter, createWebHistory } from 'vue-router';
import PingPong from '../components/Ping.vue';
import HomePage from '../components/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/ping',
    name: 'ping',
    component: PingPong,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
