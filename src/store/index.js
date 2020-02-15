import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import localForage from "localforage";
import axios from "../services/axios-auth";
import router from "../router";

Vue.use(Vuex);

const vuexStorage = new VuexPersist({
  key: 'sourcelink',
  storage: localForage
});

export default new Vuex.Store({
  plugins: [vuexStorage.plugin],
  state: {
    token: null,
    userId: null,
    user: null
  },
  getters: {
    loggedIn: state => !!state.token
  },
  mutations: {
    login(state, userData) {
      state.token = userData.token
      state.userId = userData.userId
      state.expirationDate = userData.expirationDate
      state.user = userData.user
    },
    logout(state) {
      state.token = '';
      state.userId = '';
      state.expirationDate = '';
      state.user = '';
    }
  },
  actions: {
    login({commit}, authData) {
      axios.post('/accounts:signInWithPassword?key=AIzaSyCMXNUaVbW7lMZ1GM2ov6Iii3ayHSvuZ1I', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }).then(res => {
        const now = new Date();
        const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
        commit('login', {
          token: res.data.idToken,
          userId: res.data.localId,
          expirationDate: expirationDate,
          user: res.data.email
        });
        router.push('/dashboard');
      }).catch(error => console.log('login error: ', error));
    },
    logout({commit}) {
      commit('logout');
      router.push('/login');
    }
  },
  modules: {}
});
