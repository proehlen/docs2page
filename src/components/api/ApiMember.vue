<template>
  <div v-if="member">
    <p class="title is-4">{{ member.name }}</p>
    <api-method-interface
      :prefix="member.name"
      v-if="member.kind === 'function'"
      :params="member.params" :returns="member.returns"/>
    <api-property-type
      v-else-if="member.returns && member.returns.length"
      :api-type="member.returns[0].type"/>
    <api-description :node="member.description" />
    <api-todos :tags="member.tags"/>
  </div>
</template>

<script>
import ApiDescription from './ApiDescription.vue';
import ApiMethodInterface from './ApiMethodInterface.vue';
import ApiPropertyType from './ApiPropertyType.vue';
import ApiTodos from './ApiTodos.vue';

export default {
  name: 'api-member',
  components: {
    ApiDescription,
    ApiMethodInterface,
    ApiPropertyType,
    ApiTodos,
  },
  computed: {
    member() {
      return this.$store.getters.objectTypeMember(
        this.$route.params.objectTypeName,
        this.$route.params.memberName,
      );
    },
  },
};
</script>
