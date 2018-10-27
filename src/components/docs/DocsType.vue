<template>
  <span v-if="apiType.type === 'VoidLiteral'">void</span>
  <span v-else-if="apiType.type === 'StringLiteralType'">"{{ apiType.value }}"</span>
  <span v-else-if="apiType.type === 'NameExpression'">
    <docs-name-expression :type-name="apiType.name"/>
  </span>
  <span v-else-if="apiType.type === 'RecordType'">{
    <span v-for="(field, index) in apiType.fields" v-bind:key="field.key">
      <span v-if="index > 0">,&nbsp;</span>
      <docs-type :apiType="field"/>
    </span>&nbsp;}
  </span>
  <span v-else-if="apiType.type === 'FieldType'">
    <span>{{ apiType.key }}: </span>
    <docs-type :apiType="apiType.value"/>
  </span>
  <span v-else-if="apiType.type === 'UnionType'">
    <span
      v-for="(element, index) in apiType.elements"
      v-bind:key="element.name">
      <span v-if="index > 0">&nbsp;|&nbsp;</span>
      <docs-type :apiType="element"/>
    </span>
  </span>
  <span v-else-if="apiType.type === 'TypeApplication'">
    <docs-type :apiType="apiType.expression"/>
    &lt;
    <span v-for="(application, index) in apiType.applications" v-bind:key="index">
      <span v-if="index > 0">,&nbsp;</span>
      <docs-type :apiType="application"/>
    </span>
    &gt;
  </span>
  <span v-else-if="apiType.type === 'NullableType'">
    ?<docs-type :apiType="apiType.expression"/>
  </span>
  <span v-else>{{ apiType.name || `Unrecognized ${apiType.type}` }}</span>
</template>

<script>
import DocsNameExpression from './type/DocsNameExpression.vue';

export default {
  name: 'docs-type',
  props: {
    apiType: {
      type: Object,
      required: true,
    },
  },
  components: {
    DocsNameExpression,
    // Mitigate component recursion using webpack dynamic import
    'docs-type': () => import('./DocsType.vue'),
  },
};
</script>

