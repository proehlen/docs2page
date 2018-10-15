import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Api from '@/views/Api.vue';

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
      component: Api,
      name: 'api',
    },
    {
      path: '/api/type/:typeName',
      component: Api,
      name: 'apiType',
    },
    {
      path: '/api/type/:typeName/member/:memberName',
      component: Api,
      name: 'apiMember',
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    let returnValue;
    if (to.hash) {
      returnValue = {
        selector: to.hash,
      };
    } else if (savedPosition) {
      returnValue = savedPosition;
    } else {
      returnValue = { x: 0, y: 0 };
    }
    return returnValue;
  },
});
