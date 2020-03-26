/* eslint-disable import/no-cycle */
import Vue from 'vue';
import VueRouter from 'vue-router';
import mycontent from '../components/content.vue';
import DashboardPage from '../components/users/dashboard.vue';
import RegisterPage from '../components/users/register.vue';
import SigninPage from '../components/users/login.vue';
// import store from '../store/store';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', component: mycontent },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/login', name: 'Login', component: SigninPage },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage
    // beforeEnter(to, from, next) {
    //   if (store.state.idToken) {
    //     console.log(store.state.idToken);
    //     next();
    //   } else {
    //     next('/login');
    //   }
    // }
  },
  { path: '*', redirect: '/' }
];

export default new VueRouter({ mode: 'history', routes });
