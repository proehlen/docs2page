<template>
  <span>{{ node.value }}</span>
</template>

<script>
export default {
  name: 'docs-text',
  props: {
    node: {
      required: true,
    },
  },
};
</script>

