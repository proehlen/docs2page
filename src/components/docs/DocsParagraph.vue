<template>
  <p>
    <docs-node v-for="(child, index) in node.children" v-bind:key="index" :node="child"/>
  </p>
</template>

<script>

export default {
  name: 'docs-paragraph',
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

