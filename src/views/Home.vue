<template>
  <div v-html="readMe">
  </div>
</template>

<script>

export default {
  name: 'home',
  computed: {
    readMe() {
      return this.$store.state.readMe;
    },
  },
};
</script>
