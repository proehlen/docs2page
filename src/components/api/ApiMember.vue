<template>
  <div v-if="member">
    <div class="columns is-gapless">
      <div class="column">
        <span class="title">
          {{ member.name }}
        </span>
        <span>
          <span class="tag is-white has-text-weight-normal tag-title-prefix">
            {{ member.scope }}&nbsp;
          </span>
          <span class="tag is-white has-text-weight-normal tag-title-prefix">member of</span>
          <span class="subtitle">
            <docs-name-expression :type-name="member.memberof"/>
          </span>
        </span>
      </div>
      <div class="column is-narrow">
        <docs-github-source :doc="member"/>
      </div>
    </div>


    <api-method-interface
      :prefix="member.name"
      v-if="member.kind === 'function'"
      :params="member.params" :returns="member.returns"/>
    <api-property-type
      v-else-if="member.returns && member.returns.length"
      :api-type="member.returns[0].type"/>
    <docs-description :node="member.description" />
    <api-todos :tags="member.tags"/>
  </div>
</template>

<script>
import DocsDescription from '../docs/DocsDescription.vue';
import DocsNameExpression from '../docs/type/DocsNameExpression.vue';
import ApiMethodInterface from './ApiMethodInterface.vue';
import ApiPropertyType from './ApiPropertyType.vue';
import ApiTodos from './ApiTodos.vue';
import DocsGithubSource from '../docs/DocsGithubSource.vue';

export default {
  name: 'api-member',
  components: {
    ApiMethodInterface,
    ApiPropertyType,
    ApiTodos,
    DocsDescription,
    DocsGithubSource,
    DocsNameExpression,
  },
  computed: {
    member() {
      return this.$store.getters.objectTypeMember(
        this.$route.params.objectTypeName,
        this.$route.params.memberName,
      );
    },
  },
};
</script>
