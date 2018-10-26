<template>
  <a v-if="externalUrl"
    :href="externalUrl"
    target="_new">{{ typeName }}</a>
  <router-link v-else-if="libraryType"
    :to="{ name: 'apiObjectType', params: { objectTypeName: typeName, }}">
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
  name: 'docs-name-expression',
  props: {
    typeName: {
      type: String,
      required: true,
    },
  },
  computed: {
    externalUrl() {
      let url;
      if (this.typeName === 'BigInt') {
        url = 'https://www.npmjs.com/package/big-integer';
      } else if (this.typeName === 'Buffer') {
        url = 'https://nodejs.org/api/buffer.html';
      } else if (jsTypes.includes(this.typeName)) {
        const objectName = `${this.typeName.substr(0, 1).toUpperCase()}${this.typeName.substr(1)}`;
        url = `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/${objectName}`;
      }
      return url;
    },
    libraryType() {
      return this.$store.getters.objectType(this.typeName);
    },
  },
};
</script>

