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
        <a class="button"
          target="_new"
          v-if="objectType.context && objectType.context.github"
          :href="objectType.context.github.url">source</a>
      </div>
    </div>

    <!-- Class constructor signature -->
    <api-method-interface v-if="showConstructor"
      :prefix="`new ${objectType.name}`"
      :params="objectType.params"/>

    <!-- Object type description -->
    <api-description :node="objectType.description"/>

    <!-- Class members -->
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
import ApiMethodInterface from './ApiMethodInterface.vue';

export default {
  name: 'api-object-type',
  components: {
    ApiDescription,
    ApiMembers,
    ApiMethodInterface,
  },
  computed: {
    objectType() {
      return this.$store.getters.objectType(this.$route.params.objectTypeName);
    },
    showConstructor() {
      return (this.objectType.kind === 'class'
        && !(this.objectType.constructorComment
          && this.objectType.constructorComment.tags
          && this.objectType.constructorComment.tags.find(tag => tag.title === 'hideconstructor')));
    },
  },
};
</script>

