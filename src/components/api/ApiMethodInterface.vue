<template>
  <pre class="api-method-interface">
    <code>
      <span>{{ prefix }}</span>
      <span class="no-pre-space">(</span>
      <span v-for="(param, index) in params" v-bind:key="param.name" class="no-pre-space">
        <span v-if="index > 0">,&nbsp;</span>
        <span v-if="param.name">
          <span>{{ param.name }}</span>
          <span v-if="param.type.kind === 'OptionalType'">?</span>
          <span class="no-pre-space">:&nbsp;</span>
        </span>
        <docs-type class="no-pre-space" :api-type="param.type"/>
      </span>
      <span class="no-pre-space">)</span>
      <span v-if="returns && returns.length" class="no-pre-space">:&nbsp;</span>
      <span v-for="(returnType, index) in returns" v-bind:key="returnType.name">
        <span v-if="index > 0" class="no-pre-spac">
          &nbsp;|&nbsp;
        </span>
        <docs-type class="no-pre-space" :api-type="returnType.type"/>
      </span>
    </code>
  </pre>
</template>

<script>
import DocsType from '../docs/DocsType.vue';

export default {
  name: 'api-method-interface',
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
    DocsType,
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
