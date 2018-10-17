<template>
  <nav class="box">
      <p class="subtitle is-5">
          Api
      </p>

      <!-- Search tool -->
      <p class="field has-addons">
        <span class="control has-icons-left">
          <input class="input is-small" type="text" placeholder="search" v-model="filter">
          <span class="icon is-small is-left">
            <font-awesome-icon icon="search" />
          </span>
        </span>
        <span class="control">
          <a class="button is-small is-white" @click="clearFilter" :disabled="!filter">
            <span class="icon">
              <font-awesome-icon icon="times" />
            </span>
          </a>
        </span>
      </p>

    <table class="table is-narrow is-fullwidth is-hoverable">
      <tbody>
      <!-- Root types -->
      <div v-for="(item, index) in docs" v-bind:key="index">
        <tr
          @click="navToObjecType(item)"
          :class="{ 'is-active': item.name === $route.params.objectTypeName }">
          <td @click.stop="toggleExpanded(item)">
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
      </tbody>
    </table>
  </nav>
</template>

<script>
export default {
  name: 'api-menu',
  computed: {
    docs() {
      return this.$store.getters.filteredObjectTypes;
    },
    filter: {
      get() {
        return this.$store.state.filter;
      },
      set(filter) {
        this.$store.commit('setFilter', filter);
      },
    },
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
    clearFilter() {
      this.$store.commit('setFilter', '');
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

