import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ApiTopic from './views/ApiTopic.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/api',
      name: 'api',
      // route level code-splitting
      component: () => import(/* webpackChunkName: "api" */ './views/Api.vue'),
      children: [{
        path: ':topic',
        component: ApiTopic,
      }],
    },
  ],
});
