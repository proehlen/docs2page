<template>
  <docs-ordered-list v-if="node.ordered" :node="node"/>
  <docs-unordered-list v-else :node="node"/>
</template>

<script>
import DocsOrderedList from './DocsOrderedList.vue';
import DocsUnorderedList from './DocsUnorderedList.vue';

export default {
  name: 'docs-list',
  props: {
    node: {
      required: true,
    },
  },
  components: {
    'docs-ordered-list': DocsOrderedList,
    'docs-unordered-list': DocsUnorderedList,
  },
};
</script>

