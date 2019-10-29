// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueFire from 'vuefire'
import firebase from 'firebase'
import { store } from './store'
import('vuetify/dist/vuetify.min.css')

Vue.use(Vuetify)
Vue.use(VueFire)
Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyD2iY3tDoikzpFrWK2H8bY1iKTAWXylP5k',
  authDomain: 'gradex-itss.firebaseapp.com',
  databaseURL: 'https://gradex-itss.firebaseio.com',
  projectId: 'gradex-itss',
  storageBucket: 'gradex-itss.appspot.com',
  messagingSenderId: '840715675275'
})

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   template: '<App/>',
//   components: { App },
//   created () {
//     firebase.auth().onAuthStateChanged((firebaseUser) => {
//       if (firebaseUser) {
//         store.dispatch('autoSignIn', firebaseUser)
//       }
//     })
//   }
// })

const unsubscribe = firebase.auth()
  .onAuthStateChanged((firebaseUser) => {
    new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: { App },
      created () {
        if (firebaseUser) {
          store.dispatch('autoSignIn', firebaseUser)
        }
      }
    })
    unsubscribe()
  })
