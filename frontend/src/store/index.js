import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: localStorage,
});

export default new Vuex.Store({
  state: {
    user: null,
    token: '',
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    login({ commit }, { user, token }) {

      commit('setUser', user);
      commit('setToken', token);
      
    },
    logout({ commit }) {

      commit('setUser', null);
      commit('setToken', '');
      
    },
  },
  plugins: [vuexPersist.plugin],
});
