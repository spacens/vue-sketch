import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import localForage from "localforage";
import axios, { setToken } from "../services/axios-auth";
import router from "../router";

Vue.use(Vuex);

const vuexStorage = new VuexPersist({
  key: "sourcelink",
  storage: localForage
});

export default new Vuex.Store({
  plugins: [vuexStorage.plugin],
  state: {
    token: "",
    user: {},
    loginError: "",
    signupError: "",
    updateError: ""
  },
  getters: {
    loggedIn: state => !!state.token
  },
  mutations: {
    login(state, userData) {
      state.token = userData.token;
      state.user = userData.user;
      state.loginError = "";
    },
    loginError(state, message) {
      state.loginError = message;
    },
    signup(state, userData) {
      state.token = userData.token;
      state.user = userData.user;
      state.signupError = "";
    },
    updateUser(state, userData) {
      state.user = {
        ...state.user,
        ...userData
      };
    },
    updateError(state, message) {
      state.updateError = message;
    },
    signupError(state, message) {
      state.signupError = message;
    },
    logout(state) {
      state.token = "";
      state.user = null;
      state.expirationDate = "";
    }
  },
  actions: {
    login({ commit }, authData) {
      axios
        .post("/rest-auth/login/", {
          email: authData.email,
          password: authData.password
        })
        .then(res => {
          setToken(res.data.token);
          commit("login", {
            token: res.data.token,
            user: res.data.user
          });
          router.push("/dashboard");
        })
        .catch(error => {
          console.log("login error: ", error);
          commit("loginError", JSON.stringify(error.response.data));
        });
    },
    signup({ commit }, userData) {
      axios
        .post("/rest-auth/registration/", {
          name: userData.name,
          email: userData.email,
          password1: userData.password1,
          password2: userData.password2
        })
        .then(res => {
          setToken(res.data.token);
          commit("signup", {
            token: res.data.token,
            user: res.data.user
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
      router.push("/login");
    },
    async updateProfile({ commit }, payload) {
      try {
        await axios.put("/rest-auth/user/", payload.profile);
        commit("updateUser", payload.profile);
        payload.callback();
      } catch (error) {
        console.log("update error: ", error);
        commit("updateError", JSON.stringify(error));
      }
    }
  },
  modules: {}
});
