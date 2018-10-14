<template>
  <span>
    <span v-for="(rootChild, index) in emphasis.children" v-bind:key="index">
      <span v-if="rootChild.type === 'text'"
        class="has-text-weight-bold">{{ rootChild.value }}</span>

      <!-- Don't know why emphasis has children and what a non-text emphasis child looks like -->
      <span v-else class="tag is-danger has-text-weight-bold">Error parsing docs</span>
    </span>
  </span>
</template>

<script>
export default {
  name: 'api-emphasis',
  props: {
    emphasis: {
      type: Object,
      required: true,
    },
  },
};
</script>

