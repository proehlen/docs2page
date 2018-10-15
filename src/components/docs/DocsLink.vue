<template>
  <router-link v-if="node.jsdoc" :to="{ name: 'apiType', params: {typeName: node.url }}">
    <docs-node v-for="(child, index) in node.children" v-bind:key="index" :node="child"/>
  </router-link>

  <!-- Don't (yet) support non internal links -->
  <span v-else class="tag is-danger has-text-weight-bold">Error parsing link</span>
</template>

<script>

export default {
  name: 'docs-link',
  props: {
    node: {
      required: true,
    },
  },
  components: {
    // Mitigate component recursion using webpack dynamic import
    'docs-node': () => import('./DocsNode.vue'),
  },
};
</script>
