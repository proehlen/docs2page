<template>
  <div v-if="objectType">
    <div class="columns is-gapless">
      <div class="column">
        <span class="tag is-white has-text-weight-normal">{{ objectType.kind }}</span>
        <span class="title">
          {{ objectType.name }}
        </span>
        <span v-if="objectType.augments.length">
          <span class="tag is-white has-text-weight-normal">extends</span>
          <span class="subtitle">
            <api-named-type-link :type-name="objectType.augments[0].name"/>
          </span>
        </span>
      </div>
      <div class="column is-narrow">
        <a class="button"
          target="_new"
          v-if="objectType.context && objectType.context.github"
          :href="objectType.context.github.url">source</a>
      </div>
    </div>

    <!-- Class constructor signature -->
    <api-constructor :object-type="objectType"/>

    <!-- Function interface -->
    <api-method-interface
      v-if="objectType.kind === 'function'"
      :prefix="objectType.name"
      :params="objectType.params"
      :returns="objectType.returns"/>

    <!-- Typedef elements -->
    <api-property-type v-if="objectType.kind === 'typedef'"
      :apiType="objectType.type"/>

    <!-- Object type description -->
    <api-description :node="objectType.description"/>


    <!-- Class members -->
    <div id="api-members"
      v-if="objectType.kind === 'class'"
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
import ApiConstructor from './ApiConstructor.vue';
import ApiDescription from './ApiDescription.vue';
import ApiMembers from './ApiMembers.vue';
import ApiMethodInterface from './ApiMethodInterface.vue';
import ApiNamedTypeLink from './ApiNamedTypeLink.vue';
import ApiPropertyType from './ApiPropertyType.vue';

export default {
  name: 'api-object-type',
  components: {
    ApiConstructor,
    ApiDescription,
    ApiMembers,
    ApiMethodInterface,
    ApiNamedTypeLink,
    ApiPropertyType,
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

