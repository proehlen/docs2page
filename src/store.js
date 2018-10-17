import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import marked from 'marked';

Vue.use(Vuex);

let matchNameToTerm;
let matchDocToFilter;

export default new Vuex.Store({
  state: {
    docs: [],
    filter: '',
    readMe: '',
    packageFile: {},
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
    toggleMenuExpanded(state, rootName) {
      const index = state.docs.findIndex(doc => doc.name === rootName);
      Vue.set(state.docs[index], 'menuExpanded', !state.docs[index].menuExpanded);
    },
  },
  getters: {
    objectType: state => typeName => state.docs.find(doc => doc.name === typeName),
    filteredMembers: (state, getters) => (typeName) => {
      const objectType = getters.objectType(typeName);
      let staticMembers = [];
      if (objectType.members && objectType.members.static) {
        staticMembers = objectType.members
          .static
          .filter(member => matchNameToTerm(member.name, state.filter));
      }
      let instanceMembers = [];
      if (objectType.members && objectType.members.instance) {
        instanceMembers = objectType.members
          .instance
          .filter(member => matchNameToTerm(member.name, state.filter));
      }

      return staticMembers.concat(instanceMembers);

      // console.log(objectType);
      // return state.filter
      // ? state.docs.filter(doc => matchDocToFilter(doc, state))
      // : state.docs,
    },
    filteredObjectTypes: state => state.filter
      ? state.docs.filter(doc => matchDocToFilter(doc, state))
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

matchNameToTerm = (name, term) => {
  let result;
  if (term) {
    result = name && name.toUpperCase().includes(term.toUpperCase());
  } else {
    result = true;
  }
  return result;
};

matchDocToFilter = (doc, state) => {
  const searchTerm = state.filter;
  let rootMatch = false;
  let staticMatch = false;
  let instanceMatch = false;
  if (doc.name) {
    // See if root document (object type) matches
    rootMatch = matchNameToTerm(doc.name, searchTerm);

    // See if any members match
    if (doc.members) {
      // See if static members match
      if (doc.members.static && doc.members.static.length) {
        const matchIndex = doc.members.static
          .findIndex(member => matchNameToTerm(member.name, state.filter));
        staticMatch = matchIndex > -1;
      }

      // See if instance members match
      if (doc.members.instance && doc.members.instance.length) {
        const matchIndex = doc.members.instance
          .findIndex(member => matchNameToTerm(member.name, state.filter));
        instanceMatch = matchIndex > -1;
      }
    }
  }
  return rootMatch || staticMatch || instanceMatch;
};
