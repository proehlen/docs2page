import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import marked from 'marked';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    docs: [],
    filter: '',
    readMe: '',
    packageFile: {},
  },
  getters: {
    objectType: state => typeName => state.docs.find(doc => doc.name === typeName),
    filteredObjectTypes: state => state.filter
      ? state.docs.filter(doc => doc.name && doc.name.toUpperCase().includes(state.filter.toUpperCase()))
      : state.docs,
    objectTypeMember: state => (typeName, memberName) => {
      const apiType = state.docs.find(doc => doc.name === typeName);
      let apiObjectTypeMember;
      if (apiType) {
        // Look for static member
        apiObjectTypeMember = apiType.members.static.find(member => member.name === memberName);
        if (!apiObjectTypeMember) {
          // Look for instance member
          apiObjectTypeMember = apiType.members.instance.find(member => member.name === memberName);
        }
      }
      return apiObjectTypeMember;
    },
  },
  mutations: {
    setFilter(state, filter) {
      Vue.set(state, 'filter', filter);
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
    setPackageFile(state, packageFile) {
      Vue.set(state, 'packageFile', packageFile);
    },
    setReadMe(state, readMe) {
      Vue.set(state, 'readMe', readMe);
    },
  },
  actions: {
    async loadDocs({ commit }) {
      return axios.get('docs.json')
        .then((response) => {
          commit('setDocs', response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async loadPackageFile({ commit }) {
      return axios.get('package.json')
        .then((response) => {
          commit('setPackageFile', response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async loadReadMe({ commit }) {
      return axios.get('README.md')
        .then((response) => {
          const readMe = marked(response.data);
          commit('setReadMe', readMe);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
