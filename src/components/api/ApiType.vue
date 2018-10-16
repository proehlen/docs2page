<template>
  <span v-if="apiType.type === 'VoidLiteral'">void</span>
  <span v-else-if="apiType.type === 'StringLiteralType'">"{{ apiType.value }}"</span>
  <span v-else-if="apiType.type === 'NameExpression'">
    <api-named-type-link :type-name="apiType.name"/>
  </span>
  <span v-else-if="apiType.type === 'RecordType'">{
    <span v-for="(field, index) in apiType.fields" v-bind:key="field.key">
      <span v-if="index > 0">,&nbsp;</span>
      <api-type :apiType="field"/>
    </span>&nbsp;}
  </span>
  <span v-else-if="apiType.type === 'FieldType'">
    <span>{{ apiType.key }}: </span>
    <api-type :apiType="apiType.value"/>
  </span>
  <span v-else-if="apiType.type === 'UnionType'">
    <span
      v-for="(element, index) in apiType.elements"
      v-bind:key="element.name">
      <span v-if="index > 0">&nbsp;|&nbsp;</span>
      <api-type :apiType="element"/>
    </span>
  </span>
  <span v-else-if="apiType.type === 'TypeApplication'">
    <api-type :apiType="apiType.expression"/>
    of
    <span v-for="(application, index) in apiType.applications" v-bind:key="index">
      <span v-if="index > 0">,&nbsp;</span>
      <api-type :apiType="application"/>
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
    'api-type': () => import('./ApiType.vue'),
  },
};
</script>

