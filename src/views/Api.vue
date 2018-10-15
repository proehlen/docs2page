<template>
  <div>
    <div class="columns">
      <div class="column is-narrow">
        <api-menu />
      </div>
      <div class="column">
        <section class="section">
          <api-object-type v-if="this.$route.params.objectTypeName"/>
        </section>
        <section class="section">
          <api-member v-if="this.$route.params.memberName"/>
        </section>
      </div>
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

