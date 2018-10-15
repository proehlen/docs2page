<template>
  <ul>
    <docs-node v-for="(child, index) in node.children" v-bind:key="index" :node="child"/>
  </ul>
</template>

<script>

export default {
  name: 'docs-unordered-list',
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

