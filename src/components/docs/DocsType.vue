<template>
  <span v-if="apiType.type === 'VoidLiteral'">
    void
  </span>
  <span v-else-if="apiType.type === 'AllLiteral'">
    any
  </span>
  <span v-else-if="apiType.type === 'StringLiteralType'">
    "{{ apiType.value }}"
  </span>
  <span v-else-if="apiType.type === 'ParameterType'">
    <span v-if="apiType.name">
      <span>{{ apiType.name }}</span>
      <span class="no-pre-space">:&nbsp;</span>
    </span>
    <docs-type class="no-pre-space" :api-type="apiType.expression"/>
  </span>
  <span v-else-if="apiType.type === 'NameExpression'">
    <docs-name-expression :type-name="apiType.name"/>
  </span>
  <span v-else-if="apiType.type === 'OptionalType'">
    <docs-type :apiType="apiType.expression"/>
  </span>
  <span v-else-if="apiType.type === 'RecordType'">
    <span class="no-pre-space">
      {
    </span>
    <span v-for="(field, index) in apiType.fields" v-bind:key="field.key">
      <span v-if="index > 0" class="no-pre-space">
        ,&nbsp;
      </span>
      <docs-type class="no-pre-space" :apiType="field"/>
    </span>
    <span class="no-pre-space">
      }
    </span>
  </span>
  <span v-else-if="apiType.type === 'FieldType'">
    <span>
      {{ apiType.key }}
    </span>
    <span v-if="apiType.value.type === 'OptionalType'" class="no-pre-space">
      ?
    </span>
    <span class="no-pre-space">
      :
    </span>
    <docs-type :apiType="apiType.value"/>
  </span>
  <span v-else-if="apiType.type === 'UnionType'">
    <span
      v-for="(element, index) in apiType.elements"
      v-bind:key="element.name">
      <span v-if="index > 0" class="no-pre-space">
        &nbsp;|
      </span>
      <docs-type :apiType="element"/>
    </span>
  </span>
  <span v-else-if="apiType.type === 'TypeApplication'">
    <docs-type :apiType="apiType.expression"/>
    <span class="no-pre-space">&lt;</span>
    <span v-for="(application, index) in apiType.applications"
      v-bind:key="index" class="no-pre-space">
      <span v-if="index > 0">,&nbsp;</span>
      <docs-type :apiType="application"/>
    </span>
    <span class="no-pre-space">
      &gt;
    </span>
  </span>
  <span v-else-if="apiType.type === 'NullableType'">
    ?<docs-type :apiType="apiType.expression"/>
  </span>
  <docs-function-type v-else-if="apiType.type === 'FunctionType'" :apiType="apiType"/>
  <span v-else>{{ apiType.name || `Unrecognized ${apiType.type}` }}</span>
</template>

<script>
import DocsFunctionType from './type/DocsFunctionType.vue';
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
    DocsFunctionType,
    DocsNameExpression,
    // Mitigate component recursion using webpack dynamic import
    'docs-type': () => import('./DocsType.vue'),
  },
};
</script>

