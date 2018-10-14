<template>
  <div v-if="apiType">
    <div class="columns is-gapless">
      <div class="column">
        <h1 class="title">
          {{ apiType.name }}
          <span class="tag is-light has-text-weight-normal">{{ apiType.kind }}</span>
        </h1>
      </div>
      <div class="column is-narrow">
        <button class="button">
          <a v-if="apiType.context && apiType.context.github"
            :href="apiType.context.github.url">source</a>
        </button>
      </div>
    </div>
    <api-description :description="apiType.description"/>

    <div v-if="apiType.kind === 'class'"
      class="columns is-gapless">
      <div class="column is-half">
        <h2 class="subtitle">Static members</h2>
        <api-members :members="apiType.members.static"/>
      </div>
      <div class="column is-half">
        <h2 class="subtitle">Instance members</h2>
        <api-members :members="apiType.members.instance"/>
      </div>
    </div>
  </div>
</template>

<script>
import ApiDescription from '@/components/ApiDescription.vue';
import ApiMembers from '@/components/ApiMembers.vue';

export default {
  name: 'api-type',
  components: {
    ApiDescription,
    ApiMembers,
  },
  computed: {
    apiType() {
      return this.$store.getters.apiType(this.$route.params.typeName);
    },
  },
};
</script>

