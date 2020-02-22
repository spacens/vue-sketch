import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import localForage from "localforage";
import axios from "../services/axios-auth";
import router from "../router";

Vue.use(Vuex);

const vuexStorage = new VuexPersist({
  key: "sourcelink",
  storage: localForage
});

export default new Vuex.Store({
  plugins: [vuexStorage.plugin],
  state: {
    token: null,
    username: null,
    email: null,
    loginError: '',
    signupError: ''
  },
  getters: {
    loggedIn: state => !!state.token
  },
  mutations: {
    login(state, userData) {
      state.token = userData.token;
      state.username = userData.username;
      state.email = userData.email;
      state.loginError = '';
    },
    loginError(state, message) {
      state.loginError = message;
    },
    signup(state, userData) {
      state.token = userData.token;
      state.username = userData.username;
      state.email = userData.email;
      state.signupError = '';
    },
    signupError(state, message) {
      state.signupError = message;
    },
    logout(state) {
      state.token = "";
      state.username = "";
      state.email = "";
      state.expirationDate = "";
    }
  },
  actions: {
    login({ commit }, authData) {
      axios.post("/rest-auth/login/", {
        email: authData.email,
        password: authData.password
      })
      .then(res => {
        console.log('login: ', res)
        commit("login", {
          token: res.data.token,
          email: res.data.user.email,
          username: res.data.user.username,
        });
        router.push("/dashboard");
      })
      .catch(error => {
        console.log("login error: ", error);
        commit("loginError", JSON.stringify(error.response.data));
      });
    },
    signup({ commit }, userData) {
      axios.post("/rest-auth/registration/",{
        username: userData.username,
        email: userData.email,
        password1: userData.password1,
        password2: userData.password2,
      })
      .then(res => {
        commit("signup", {
          token: res.data.token,
          username: res.data.user.username,
          email: res.data.user.email,
        });
        router.push("/dashboard");
      })
      .catch(error => {
        console.log("signup error: ", error);
        commit("signupError", JSON.stringify(error.response.data));
      });
    },
    async logout({ commit }) {
      commit("logout");
      await axios.post("/rest-auth/logout/");
      router.push('/login');

    }
  },
  modules: {}
});
