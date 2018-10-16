<template>
  <span v-if="apiType.type === 'VoidLiteral'">void</span>
  <span v-else-if="apiType.type === 'NameExpression'">
    <api-named-type-link :type-name="apiType.name"/>
  </span>
  <span v-else-if="apiType.type === 'UnionType'">
    <span
      v-for="(element, index) in apiType.elements"
      v-bind:key="element.name">
      <span v-if="index > 0">&nbsp;|&nbsp;</span>
      <api-type-link :apiType="element"/>
    </span>
  </span>
  <span v-else>{{ apiType.name || `Unrecognized ${apiType.type}` }}</span>
</template>

<script>
import ApiNamedTypeLink from './ApiNamedTypeLink.vue';

export default {
  name: 'api-type-link',
  props: {
    apiType: {
      type: Object,
      required: true,
    },
  },
  components: {
    ApiNamedTypeLink,
    // Mitigate component recursion using webpack dynamic import
    'api-type-link': () => import('./ApiTypeLink.vue'),
  },
};
</script>

