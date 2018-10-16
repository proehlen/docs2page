<template>
  <pre class="api-method-interface">
    <code>{{ prefix }}(
      <span v-for="(param, index) in params" v-bind:key="param.name">
        <span v-if="index > 0">,&nbsp;</span>
        <span v-if="param.name">{{ param.name }}: </span>
        <api-type :api-type="param.type"/>
      </span>
    )<span v-if="returns && returns.length">:&nbsp;</span>
      <span v-for="(returnType, index) in returns" v-bind:key="returnType.name">
        <span v-if="index > 0">|&nbsp;</span>
        <api-type :api-type="returnType.type"/>
      </span>
    </code>
  </pre>
</template>

<script>
import ApiType from './ApiType.vue';

export default {
  name: 'api-interface',
  props: {
    prefix: {
      type: String,
      required: false,
    },
    params: {
      type: Array,
    },
    returns: {
      type: Array,
    },
  },
  components: {
    ApiType,
  },
};
</script>

<style>
  pre.api-method-interface {
    width: 100%;
    margin-bottom: 1rem;
    white-space: normal;
    padding: 0.75rem;
  }
</style>
