<template>
  <router-link v-if="node.url.substr(0,4) !=='http'"
    :to="{ name: 'apiObjectType', params: {objectTypeName: node.url }}">
    <docs-node v-for="(child, index) in node.children" v-bind:key="index" :node="child"/>
  </router-link>
  <a v-else
    :href="node.url"
    target="_new">
    <docs-node v-for="(child, index) in node.children" v-bind:key="index" :node="child"/>
  </a>
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
