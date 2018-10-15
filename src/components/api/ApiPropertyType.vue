<template>
  <div class="notification is-paddingless">
    <code class="tag is-medium">
      <api-type-link :api-type="apiType"/>
    </code>
  </div>
</template>

<script>
import ApiTypeLink from './ApiTypeLink.vue';

export default {
  name: 'api-property-type',
  props: {
    apiType: {
      type: Object,
      required: true,
    },
  },
  components: {
    ApiTypeLink,
  },
};
</script>
