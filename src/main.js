import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';
import SweetAlertIcons from 'vue-sweetalert-icons';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import myfooter from './components/footer.vue';
import mynav from './components/sidenav.vue';
import mycontent from './components/content.vue';
import myheader from './components/header.vue';
import store from './store/store';


Vue.use(Vuelidate);

Vue.config.productionTip = false;
Vue.component('myfooter', myfooter);
Vue.component('mynav', mynav);
Vue.component('mycontent', mycontent);
Vue.component('myheader', myheader);
Vue.component('apexchart', VueApexCharts);
Vue.component('sweetalert-icon', SweetAlertIcons);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app');
