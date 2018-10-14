<template>
  <div class="content">
    <p v-if="typeof description === 'string'">{{ description }}</p>
    <span v-else v-for="(rootChild, index) in description.children" v-bind:key="index">
      <p v-if="rootChild.type === 'paragraph'">
        <span v-for="(level1Child, index) in rootChild.children" v-bind:key="index">
          <span v-if="level1Child.type === 'text'">{{ level1Child.value }}</span>
          <api-emphasis v-else-if="level1Child.type === 'emphasis'"
            :emphasis="level1Child"/>
          <api-link v-else-if="level1Child.type === 'link'" :link="level1Child"/>
          <span v-else class="tag is-danger">Error parsing docs</span>
        </span>
       </p>
      <p v-else>
        <span class="tag is-danger">Error parsing docs</span>
      </p>
    </span>
  </div>
</template>

<script>
import ApiEmphasis from '@/components/ApiEmphasis.vue';
import ApiLink from '@/components/ApiLink.vue';

export default {
  name: 'api-description',
  components: {
    ApiEmphasis,
    ApiLink,
  },
  props: {
    description: {
      required: true,
    },
  },
};
</script>

<style scoped>
  p {
    margin-bottom: 0.75rem;
  }
</style>
