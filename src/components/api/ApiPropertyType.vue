<template>
  <pre class="api-property-type">
    <code>
      <api-type :api-type="apiType"/>
    </code>
  </pre>
</template>

<script>
import ApiType from './ApiType.vue';

export default {
  name: 'api-property-type',
  props: {
    apiType: {
      type: Object,
      required: true,
    },
  },
  components: {
    ApiType,
  },
};
</script>

<style>
  pre.api-property-type {
    width: 100%;
    margin-bottom: 1rem;
    white-space: normal;
    padding: 0.75rem;
  }
</style>
