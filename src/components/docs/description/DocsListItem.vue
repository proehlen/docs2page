<template>
  <li>
    <docs-node v-for="(child, index) in node.children" v-bind:key="index" :node="child"/>
  </li>
</template>

<script>

export default {
  name: 'docs-list-item',
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

