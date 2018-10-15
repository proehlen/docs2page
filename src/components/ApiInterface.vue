<template>
  <div class="notification is-paddingless">
    <code class="tag is-medium">(
      <span v-for="(param, index) in params" v-bind:key="param.name">
        <span v-if="index > 0">,&nbsp;</span>{{ param.name }}:&nbsp;
        <api-type-link :type-name="param.type.name"/>
      </span>
    ) =&gt;&nbsp;
      <span v-if="returns && returns.length"
        v-for="(retVal, index) in returns"
        v-bind:key="index">
        <span v-if="index > 0">, </span>
        <api-type-link v-if="retVal.type.name" :type-name="retVal.type.name"/>
        <span v-else>void</span>
      </span>
      <span v-else>void</span>
    </code>
  </div>
</template>

<script>
import ApiTypeLink from '@/components/ApiTypeLink.vue';

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
