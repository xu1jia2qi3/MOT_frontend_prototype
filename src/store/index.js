import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    uid: null,
    email: null,
    error: null,
    verify: null
  },
  mutations: {
    setUid (state, payload) {
      state.uid = payload
    },
    setEmail (state, payload) {
      state.email = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setVerify (state, payload) {
      state.verify = payload
    }
  },
  actions: {
    userSignUp ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          router.push('/login')
          firebaseUser.sendEmailVerification().catch(function (error) {
            commit('setError', error.message)
          })
        })
        .catch(error => {
          commit('setError', error.message)
        })
    },
    userSignIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          if (!firebaseUser.emailVerified) {
            commit('setVerify', false)
            commit('setError', 'Please verify your email address')
            return
          } else {
            commit('setVerify', true)
          }
          commit('setUid', firebaseUser.uid)
          commit('setEmail', firebaseUser.email)
          commit('setError', null)
          router.push('/dashboard')
        })
        .catch(error => {
          commit('setError', error.message)
        })
    },
    autoSignIn ({commit}, payload) {
      commit('setUid', payload.uid)
      commit('setEmail', payload.email)
    },
    userSignOut ({commit}) {
      firebase.auth().signOut()
      commit('setUid', null)
      commit('setEmail', null)
      router.push('/login')
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.uid !== null && state.uid !== undefined
    }
  }
})
