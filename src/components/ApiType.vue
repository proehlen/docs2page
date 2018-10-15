<template>
  <div v-if="apiType">
    <div class="columns is-gapless">
      <div class="column">
        <h1 class="subtitle is-3">
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
    <api-description :node="apiType.description"/>

    <div v-if="apiType.kind === 'class'"
      class="columns">
      <div class="column is-half">
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">
              Static members
            </p>
          </div>
          <div class="card-content">
            <api-members :members="apiType.members.static"/>
          </div>
        </div>
      </div>
      <div class="column is-half">
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">
              Instance members
            </p>
          </div>
          <div class="card-content">
            <api-members :members="apiType.members.instance"/>
          </div>
        </div>
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

