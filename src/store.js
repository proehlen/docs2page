import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    docs: [],
    selected: {},
  },
  mutations: {
    setSelectedTopic(state, name) {
      Vue.set(state, 'selected', {});
      const selected = state.docs
        .find(topic => topic.name === name);
      Vue.set(state, 'selected', selected);
    },
    setDocs(state, docs) {
      Vue.set(state, 'docs', docs
        .sort((a, b) => {
          let result;
          if (a.name < b.name) {
            result = -1;
          } else {
            result = 1;
          }
          return result;
        }));
    },
  },
  actions: {
    async loadDocs({ commit }) {
      return axios.get('/docs.json')
        .then((response) => {
          commit('setDocs', response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
