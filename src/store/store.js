/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueRouter from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      email: '',
      cameras: []
    },
    idToken: null,
    // serverUrl: 'http://35.237.228.50:5000',
    serverUrl: 'http://127.0.0.1:5000',
    emailerror: '',
    register: '',
    wrongpassword: '',
    nouser: '',
    CamerasSwitch: false
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuth(state) {
      return state.idToken !== null;
    },
    getCamerasSwitch(state) {
      return state.CamerasSwitch;
    }
  },
  mutations: {
    authUser(state, UserData) {
      state.idToken = UserData.token;
    },
    User_dashboard(state, UserData) {
      state.user = {
        email: UserData.email,
        cameras: UserData.cameras
      };
    },
    clearAuthData(state) {
      state.idToken = null;
      state.user = null;
    }
  },
  actions: {
    deleteList({ commit }, userData) {
      axios
        .post(`${this.state.serverUrl}/users/delete`, {
          access_token: this.state.idToken,
          Data: userData.list
        })
        .then(response => {
          // console.log(response);
          commit('User_dashboard', {
            email: response.data.user,
            cameras: response.data.cameras
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateList({ commit }, userData) {
      axios
        .post(`${this.state.serverUrl}/users/favorite`, {
          access_token: this.state.idToken,
          Data: userData
        })
        .then(response => {
          // console.log(response);
          commit('User_dashboard', {
            email: response.data.user,
            cameras: response.data.cameras
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    setLogoutTimer({ commit, dispatch }, expirationTime) {
      setTimeout(() => {
        dispatch('logout');
      }, expirationTime * 1000);
    },
    register({ commit, dispatch }, authData) {
      axios
        .post(`${this.state.serverUrl}/users/register`, {
          email: authData.email,
          password: authData.password,
          confirmPassword: authData.confirmPassword
        })
        .then(response => {
          if ('emailerror' in response.data) {
            this.state.emailerror = response.data.emailerror.email;
            setTimeout(() => {
              this.state.emailerror = '';
            }, 3000);
          } else {
            this.state.register = response.data.result.email;
            setTimeout(() => {
              this.state.register = '';
            }, 3000);
          }
          // console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    tryAutoLogin({ commit }) {
      const token = localStorage.getItem('usertoken');
      if (!token) {
        return;
      }
      const expirationDate = localStorage.getItem('expirationDate');
      const now = new Date();
      if (now >= expirationDate) {
        // console.log('expire');
        return;
      }
      // console.log('not expire');


      commit('authUser', {
        token
      });
    },
    login({ commit, dispatch }, authData) {
      axios
        .post(`${this.state.serverUrl}/users/login`, {
          email: authData.email,
          password: authData.password
        })
        .then(res => {
          // console.log(res);
          if ('wrongpassword' in res.data) {
            this.state.wrongpassword = 'Wrong Password!';
            setTimeout(() => {
              this.state.wrongpassword = '';
            }, 2000);
          } else if ('nouser' in res.data) {
            this.state.nouser = 'User Does Not Exit!';
            setTimeout(() => {
              this.state.nouser = '';
            }, 2000);
          } else {
            commit('authUser', {
              token: res.data.token
            });
            dispatch('setLogoutTimer', 1800);
            const now = new Date();
            const expirationDate = now.getTime() + 1800 * 1000;
            localStorage.setItem('usertoken', res.data.token);
            localStorage.setItem('expirationDate', expirationDate);
            // eslint-disable-next-line no-undef
            VueRouter.push({ name: 'Dashboard' });
          }
        })
        .catch(err => {
          console.log(`error! + ${err}`);
        });
    },
    logout({ commit }) {
      commit('clearAuthData');
      localStorage.removeItem('expirationDate');
      localStorage.removeItem('usertoken');
      VueRouter.replace('/');
    },
    dashboard({ commit }) {
      axios
        .post(`${this.state.serverUrl}/users/dashboard`, {
          access_token: this.state.idToken
        })
        .then(response => {
          // console.log(response);
          commit('User_dashboard', {
            email: response.data.user,
            cameras: response.data.cameras
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
});
