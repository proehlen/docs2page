<template>
  <a v-if="externalUrl" :href="externalUrl" target="_new">{{ typeName }}</a>
  <router-link v-else-if="libraryType"
    :to="{ name: 'apiType', params: { typeName, }}">
    {{ typeName }}
  </router-link>
  <span v-else>{{ typeName }}</span>
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
    typeName: String,
  },
  computed: {
    externalUrl() {
      let url;
      if (this.typeName === 'BigInt') {
        url = 'https://www.npmjs.com/package/big-integer';
      } else if (jsTypes.includes(this.typeName)) {
        const typeName = `${this.typeName.substr(0, 1).toUpperCase()}${this.typeName.substr(1)}`;
        url = `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/${typeName}`;
      }
      return url;
    },
    libraryType() {
      return this.$store.getters.apiType(this.typeName);
    },
  },
};
</script>

