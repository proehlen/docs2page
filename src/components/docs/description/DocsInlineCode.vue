<template>
  <code>{{ node.value }}</code>
</template>

<script>
export default {
  name: 'docs-inline-code',
  props: {
    node: {
      required: true,
    },
  },
};
</script>

