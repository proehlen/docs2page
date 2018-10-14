<template>
  <div>
    <div class="columns is-variable is-8">
      <div class="column is-narrow box">
        <api-menu />
      </div>
      <div class="column">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import ApiMenu from '@/components/ApiMenu.vue';

export default {
  name: 'api',
  components: {
    ApiMenu,
  },
};
</script>

