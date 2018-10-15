<template>
  <ol>
    <docs-node v-for="(child, index) in node.children" v-bind:key="index" :node="child"/>
  </ol>
</template>

<script>

export default {
  name: 'docs-ordered-list',
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

