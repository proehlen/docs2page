<template>
  <div>
    <div class="columns is-variable is-8">
      <div class="column is-narrow">
        <api-menu />
      </div>
      <div class="column">
        <section class="section">
          <api-type v-if="this.$route.params.typeName"/>
        </section>
        <section class="section">
          <api-member v-if="this.$route.params.memberName"/>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import ApiMenu from '@/components/ApiMenu.vue';
import ApiType from '@/components/ApiType.vue';
import ApiMember from '@/components/ApiMember.vue';

export default {
  name: 'api',
  components: {
    ApiType,
    ApiMember,
    ApiMenu,
  },
};
</script>

