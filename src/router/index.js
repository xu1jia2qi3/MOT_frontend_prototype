/* eslint-disable import/no-cycle */
import Vue from 'vue';
import VueRouter from 'vue-router';
import mycontent from '../components/content.vue';
import DashboardPage from '../components/users/dashboard.vue';
import RegisterPage from '../components/users/register.vue';
import SigninPage from '../components/users/login.vue';
import Recover from '../components/users/recover.vue';
import Reset from '../components/users/reset.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', component: mycontent },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/login', name: 'Login', component: SigninPage },
  { path: '/recover', name: 'recover', component: Recover },
  { path: '/reset/:token', component: Reset },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage
  },
  { path: '*', redirect: '/' }
];

export default new VueRouter({ mode: 'history', routes });
