<template>
  <div class="columns">
    <div class="column is-narrow">
      <api-menu class="api-menu"/>
    </div>
    <div class="column">
      <section class="section">
        <api-object-type v-if="this.$route.name === 'apiRoot'"/>
        <api-member v-else-if="this.$route.name === 'apiRootMember'"/>
      </section>
    </div>
  </div>
</template>

<script>
import ApiMenu from '../components/api/ApiMenu.vue';
import ApiObjectType from '../components/api/ApiObjectType.vue';
import ApiMember from '../components/api/ApiMember.vue';

export default {
  name: 'api',
  components: {
    ApiObjectType,
    ApiMember,
    ApiMenu,
  },
};
</script>
