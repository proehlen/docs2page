import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import convertMarkdown from './convertMarkdown';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    docs: [],
    readMe: '',
    packageFile: {},
  },
  getters: {
    apiType: state => typeName => state.docs.find(doc => doc.name === typeName),
    apiMember: state => (typeName, memberName) => {
      const apiType = state.docs.find(doc => doc.name === typeName);
      let apiMember;
      if (apiType) {
        // Look for static member
        apiMember = apiType.members.static.find(member => member.name === memberName);
        if (!apiMember) {
          // Look for instance member
          apiMember = apiType.members.instance.find(member => member.name === memberName);
        }
      }
      return apiMember;
    },
  },
  mutations: {
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
    setPackageFile(state, packageFile) {
      Vue.set(state, 'packageFile', packageFile);
    },
    setReadMe(state, readMe) {
      Vue.set(state, 'readMe', readMe);
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
    async loadPackageFile({ commit }) {
      return axios.get('/package.json')
        .then((response) => {
          commit('setPackageFile', response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async loadReadMe({ commit }) {
      return axios.get('/README.md')
        .then((response) => {
          const readMe = convertMarkdown(response.data);
          commit('setReadMe', readMe);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
