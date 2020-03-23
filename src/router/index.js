import Vue from 'vue';
import VueRouter from 'vue-router';
import mycontent from '../components/content.vue';
import DashboardPage from '../components/users/dashboard.vue';
import RegisterPage from '../components/users/register.vue';
import SigninPage from '../components/users/login.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', component: mycontent },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/login', name: 'Login', component: SigninPage },
  { path: '/dashboard', name: 'Dashboard', component: DashboardPage },
  { path: '*', redirect: '/' }
];

export default new VueRouter({ mode: 'history', routes });
