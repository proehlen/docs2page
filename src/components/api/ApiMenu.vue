<template>
  <nav class="box api-menu api-menu-vscroll">
      <!-- Search tool -->
      <p class="field has-addons">
        <span class="control has-icons-left is-expanded">
          <input class="input is-small" type="text" placeholder="Search API" v-model="filter">
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

    <table class="table is-narrow is-fullwidth is-hoverable api-menu-table">
      <tbody>
        <!-- Root types -->
        <api-menu-root-item v-for="(item, index) in docs" v-bind:key="index" :item="item"/>
      </tbody>
    </table>
  </nav>
</template>

<script>
import ApiMenuRootItem from './ApiMenuRootItem.vue';

export default {
  name: 'api-menu',
  components: {
    ApiMenuRootItem,
  },
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
    clearFilter() {
      this.$store.commit('setFilter', '');
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
  .api-menu-vscroll {
    height: calc( 100vh - 110px );
    overflow-x: hidden;
    overflow-y: auto;
    display: block;
  }
</style>
