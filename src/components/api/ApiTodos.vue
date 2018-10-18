<template>
  <div class="block" v-if="tags && tags.length">
    <p
      v-for="(tag, index) in tags"
      v-if="tag.title === 'todo'"
      v-bind:key="index">
      <span class="tag">{{ tag.title }}</span>
      {{ tag.description}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'api-todos',
  props: {
    tags: {
      type: Array,
    },
  },
};
</script>

