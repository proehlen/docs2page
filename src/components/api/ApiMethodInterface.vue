<template>
  <div class="notification is-paddingless">
    <code class="tag is-medium">(
      <span v-for="(param, index) in params" v-bind:key="param.name">
        <span v-if="index > 0">,&nbsp;</span>
        <api-type-link :api-type="param.type"/>
      </span>
    ):&nbsp;
      <span v-for="(returnType, index) in returns" v-bind:key="returnType.name">
        <span v-if="index > 0">|&nbsp;</span>
        <api-type-link :api-type="returnType.type"/>
      </span>
    </code>
  </div>
</template>

<script>
import ApiTypeLink from './ApiTypeLink.vue';

export default {
  name: 'api-interface',
  props: {
    params: {
      type: Array,
    },
    returns: {
      type: Array,
    },
  },
  components: {
    ApiTypeLink,
  },
};
</script>
