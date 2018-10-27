<template>
  <div class="content">
    <p v-if="typeof node === 'string'">{{ node }}</p>
    <docs-node v-for="(child, index) in node.children" v-bind:key="index" :node="child"/>
  </div>
</template>

<script>

import DocsNode from './description/DocsNode.vue';

export default {
  name: 'docs-description',
  props: {
    node: {
      required: true,
    },
  },
  components: {
    'docs-node': DocsNode,
  },
};
</script>

<style scoped>
  p {
    margin-bottom: 0.75rem;
  }
</style>
