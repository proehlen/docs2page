import { library as faLibrary } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Add font awesome icons and vue component
faLibrary.add(faSearch);
faLibrary.add(faTimes);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
