<template>
  <span v-if="apiType.type === 'VoidLiteral'">void</span>
  <span v-else-if="apiType.type === 'NameExpression'">
    <a v-if="externalUrl"
      :href="externalUrl"
      target="_new">{{ apiType.name }}</a>
    <router-link v-else-if="libraryType"
      :to="{ name: 'apiObjectType', params: { objectTypeName: apiType.name, }}">
      {{ apiType.name }}
    </router-link>
    <span v-else>{{ apiType.name }}</span>
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
const jsTypes = [
  'Array',
  'boolean',
  'DataView',
  'Date',
  'Error',
  'string',
  'number',
  'Uint8Array',
];
export default {
  name: 'api-type-link',
  props: {
    apiType: {
      type: Object,
      required: true,
    },
  },
  components: {
    // Mitigate component recursion using webpack dynamic import
    'api-type-link': () => import('./ApiTypeLink.vue'),
  },
  computed: {
    externalUrl() {
      let url;
      if (this.apiType.name === 'BigInt') {
        url = 'https://www.npmjs.com/package/big-integer';
      } else if (jsTypes.includes(this.apiType.name)) {
        const objectName = `${this.apiType.name.substr(0, 1).toUpperCase()}${this.apiType.name.substr(1)}`;
        url = `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/${objectName}`;
      }
      return url;
    },
    libraryType() {
      return this.$store.getters.objectType(this.apiType.name);
    },
  },
};
</script>

