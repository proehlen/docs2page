<template>
  <div v-if="objectType">
    <div class="columns is-gapless">
      <div class="column">
        <span class="tag is-white has-text-weight-normal tag-title-prefix">
          {{ objectType.kind }}
        </span>
        <span class="title">
          {{ objectType.name }}
        </span>
        <span v-if="objectType.augments.length">
          <span class="tag is-white has-text-weight-normal tag-title-prefix">extends</span>
          <span class="subtitle">
            <docs-name-expression :type-name="objectType.augments[0].name"/>
          </span>
        </span>
      </div>
      <div class="column is-narrow">
        <docs-github-source :doc="objectType"/>
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
    <docs-description :node="objectType.description"/>

    <!-- Todos -->
    <api-todos :tags="objectType.tags"/>

    <!-- Members (id is needed for hash tag scrolling) -->
    <div class="columns" id="members">
      <div v-if="objectType.members.static.length" class="column">
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
      <div v-if="objectType.members.instance.length" class="column">
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
import DocsDescription from '../docs/DocsDescription.vue';
import ApiMembers from './ApiMembers.vue';
import ApiMethodInterface from './ApiMethodInterface.vue';
import ApiPropertyType from './ApiPropertyType.vue';
import ApiTodos from './ApiTodos.vue';
import DocsGithubSource from '../docs/DocsGithubSource.vue';
import DocsNameExpression from '../docs/type/DocsNameExpression.vue';

export default {
  name: 'api-object-type',
  components: {
    ApiConstructor,
    DocsDescription,
    ApiMembers,
    ApiMethodInterface,
    ApiPropertyType,
    ApiTodos,
    DocsGithubSource,
    DocsNameExpression,
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

<style>
  span.tag-title-prefix {
    padding-left: 0px;
    padding-right: 0px;
  }
</style>
