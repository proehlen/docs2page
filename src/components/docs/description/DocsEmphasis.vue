<template>
  <span class="has-text-weight-bold">
    <docs-node v-for="(child, index) in node.children" v-bind:key="index" :node="child"/>
  </span>
</template>

<script>
export default {
  name: 'docs-emphasis',
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
