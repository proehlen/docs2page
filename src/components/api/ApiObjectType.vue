<template>
  <div v-if="objectType">
    <div class="columns is-gapless">
      <div class="column">
        <h1 class="subtitle is-3">
          {{ objectType.name }}
          <span class="tag is-light has-text-weight-normal">{{ objectType.kind }}</span>
        </h1>
      </div>
      <div class="column is-narrow">
        <button class="button">
          <a v-if="objectType.context && objectType.context.github"
            :href="objectType.context.github.url">source</a>
        </button>
      </div>
    </div>
    <api-description :node="objectType.description"/>

    <div v-if="objectType.kind === 'class'"
      class="columns">
      <div class="column is-half">
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">
              Static members
            </p>
          </div>
          <div class="card-content">
            <api-members :members="objectType.members.static"/>
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
            <api-members :members="objectType.members.instance"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiDescription from './ApiDescription.vue';
import ApiMembers from './ApiMembers.vue';

export default {
  name: 'api-object-type',
  components: {
    ApiDescription,
    ApiMembers,
  },
  computed: {
    objectType() {
      return this.$store.getters.objectType(this.$route.params.objectTypeName);
    },
  },
};
</script>

