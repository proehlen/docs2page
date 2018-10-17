<template>
  <div>
    <tr
      @click="navToObjecType(item)"
      :class="{ 'is-active': item.name === $route.params.objectTypeName }">
      <td class="expand-button-cell" @click.stop="toggleExpanded(item)">
        <div class="button is-small is-white">
          <span class="icon is-small">
            <span v-if="hasMembers(item)">
              <font-awesome-icon v-if="item.menuExpanded" icon="chevron-down" />
              <font-awesome-icon v-else icon="chevron-right" />
            </span>
          </span>
        </div>
      </td>
      <td colspan=2>
        {{ item.name }}
      </td>
    </tr>

    <!-- Static Members -->
    <tr
      v-if="item.menuExpanded"
      v-for="member in item.members.static"
      v-bind:key="member.namespace"
      @click.stop="navToMember(item, member)"
      :class="{ 'is-active': member.name === $route.params.memberName }">
      <td />
      <td />
      <td>
        {{ member.name }}
      </td>
    </tr>

    <!-- Instance Members -->
    <tr
      v-if="item.menuExpanded"
      v-for="member in item.members.instance"
      v-bind:key="member.namespace"
      @click.stop="navToMember(item, member)"
      :class="{ 'is-active': member.name === $route.params.memberName }">
      <td />
      <td />
      <td>
        {{ member.name }}
      </td>
    </tr>
  </div>
</template>

<script>
export default {
  name: 'api-menu-root-item',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
  },
  methods: {
    navToObjecType(item) {
      this.$router.push({
        name: 'apiObjectType',
        params: {
          objectTypeName: item.name,
        },
      });
    },
    navToMember(item, member) {
      this.$router.push({
        name: 'apiObjectTypeMember',
        params: {
          objectTypeName: item.name,
          memberName: member.name,
        },
      });
    },
    toggleExpanded(item) {
      this.$store.commit('toggleMenuExpanded', item.name);
    },
    hasMembers(item) {
      let result = false;
      if (item.members) {
        if (item.members.static && item.members.static.length) {
          result = true;
        } else if (item.members.instance && item.members.instance.length) {
          result = true;
        }
      }
      return result;
    },
  },
};
</script>

<style>
  td.expand-button-cell {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
</style>
