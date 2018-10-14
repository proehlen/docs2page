<template>
  <span>
    <router-link v-if="link.jsdoc" :to="{ name: 'apiType', params: {typeName: link.url }}">
      <span v-for="(rootChild, index) in link.children" v-bind:key="index">
        <span v-if="rootChild.type === 'text'">{{ rootChild.value }}</span>

        <!-- Don't know why links have children and what a non-text link child looks like -->
        <span v-else class="tag is-danger has-text-weight-bold">Error parsing docs</span>
      </span>

    </router-link>
    <!-- Don't (yet) support non internal links -->
    <span v-else class="tag is-danger has-text-weight-bold">Error parsing docs</span>
  </span>
</template>

<script>
export default {
  name: 'api-link',
  props: {
    link: {
      type: Object,
      required: true,
    },
  },
};
</script>

