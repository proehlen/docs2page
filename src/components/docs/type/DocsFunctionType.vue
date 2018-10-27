<template>
  <span>
    <span>function (</span>
    &nbsp;
    <span v-for="(param, index) in apiType.params" v-bind:key="param.name" class="no-pre-space">
      <span v-if="index > 0">,&nbsp;</span>
      <docs-type class="no-pre-space" :api-type="param"/>
    </span>
    <span class="no-pre-space">
      )
    </span>
    <span v-if="apiType.result" class="no-pre-space">
      :&nbsp;
      <docs-type class="no-pre-space" :api-type="apiType.result"/>
    </span>
  </span>
</template>

<script>

export default {
  name: 'docs-function-type',
  props: {
    apiType: {
      type: Object,
    },
  },
  components: {
    // Mitigate component recursion using webpack dynamic import
    'docs-type': () => import('../DocsType.vue'),
  },
};
</script>
