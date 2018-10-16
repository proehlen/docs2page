<template>
  <div v-if="objectType">
    <!-- Class constructor signature -->
    <api-method-interface v-if="showConstructor"
      :prefix="`new ${objectType.name}`"
      :params="constructorType.params"/>
  </div>
</template>

<script>
import ApiMethodInterface from './ApiMethodInterface.vue';

export default {
  name: 'api-object-type',
  components: {
    ApiMethodInterface,
  },
  props: {
    objectType: {
      type: Object,
    },
  },
  computed: {
    constructorType() {
      // If current class has constructor params, use them.  Otherwise
      // recurse up the class hierachy to find the effective constructor
      // interface
      let candidateType = this.objectType;
      while (candidateType.params.length === 0 && candidateType.augments.length) {
        const augmentsName = candidateType.augments[0].name;
        candidateType = this.$store.getters.objectType(augmentsName);
      }
      return candidateType;
    },
    showConstructor() {
      return (this.objectType.kind === 'class'
        && !(this.constructorType.constructorComment
          && this.constructorType.constructorComment.tags
          && this.constructorType.constructorComment.tags.find(tag => tag.title === 'hideconstructor')));
    },
  },
};
</script>

