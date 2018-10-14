<template>
  <div v-if="member">
    <h1 class="title">{{ member.name }}</h1>
    <api-interface v-if="member.kind === 'function'"
      :params="member.params" :returns="member.returns"/>
    <api-description :description="member.description" />
  </div>
</template>

<script>
import ApiDescription from '@/components/ApiDescription.vue';
import ApiInterface from '@/components/ApiInterface.vue';

export default {
  name: 'api-member',
  components: {
    ApiDescription,
    ApiInterface,
  },
  computed: {
    member() {
      return this.$store.getters.apiMember(
        this.$route.params.typeName,
        this.$route.params.memberName,
      );
    },
  },
};
</script>
