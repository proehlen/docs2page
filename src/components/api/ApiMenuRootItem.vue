<template>
  <div>
    <tr
      @click="navToObjecType(item)"
      :class="{ 'is-selected': objectTypeIsSelected }">
      <td class="expand-button-cell" @click.stop="toggleExpanded(item)">
        <div class="button is-small is-white" :class="{ 'is-inverted': objectTypeIsSelected }">
          <span class="icon is-small">
            <span v-if="hasMembers(item)">
              <font-awesome-icon v-if="item.menuExpanded" icon="chevron-down" />
              <font-awesome-icon v-else icon="chevron-right" />
            </span>
          </span>
        </div>
      </td>
      <td colspan=2 class="last-table-column">
        {{ item.name }}
      </td>
    </tr>

    <!-- Filtered members -->
    <tr
      v-if="item.menuExpanded"
      v-for="member in members"
      v-bind:key="member.namespace"
      :class="{ 'is-selected': isMemberSelected(member) }"
      @click.stop="navToMember(item, member)">
      <td/>
      <td/>
      <td class="last-table-column">
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
    members() {
      return this.$store.getters.filteredMembers(this.item.name);
    },
    objectTypeIsSelected() {
      return this.$route.name === 'apiObjectType'
        && this.$route.params.objectTypeName === this.item.name;
    },
  },
  methods: {
    isMemberSelected(member) {
      return this.$route.name === 'apiObjectTypeMember'
        && this.$route.params.objectTypeName === this.item.name
        && this.$route.params.memberName === member.name;
    },
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
        hash: '#members',
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

  td.expand-button-cell > div.button {
    background-color: transparent !important;
  }
</style>

<style scoped>
  .table td {
    border-width: 0px;
  }
</style>


<style scoped>
  td.last-table-column {
    width: 100%;
  }
</style>

