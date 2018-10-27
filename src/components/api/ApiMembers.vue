<template>
  <div class="tags">
    <span class="tag is-medium"
      :class="{ 'is-white': $route.params.memberName === member.name }"
      v-for="(member, index) in members"
      @click="setSelectedMember(member.name)"
      v-bind:key="index">
      <a v-if="$route.params.memberName !== member.name"
        @click="setSelectedMember(member.name)">{{ member.name }}</a>
      <span v-else>{{ member.name }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'api-members',
  props: {
    members: {
      type: Array,
      required: true,
    },
  },
  methods: {
    setSelectedMember(member) {
      this.$router.push({
        name: 'apiObjectTypeMember',
        params: {
          typeName: this.$route.params.typeName,
          memberName: member,
        },
        hash: '#members',
      });
    },
  },
};
</script>
