<template>
  <a class="button"
    target="_new"
    v-if="doc.context && doc.context.github"
    :href="doc.context.github.url">source</a>
</template>

<script>
export default {
  name: 'docs-github-source',
  props: {
    doc: {
      type: Object,
      required: true,
    },
  },
};
</script>

