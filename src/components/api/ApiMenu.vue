<template>
  <nav class="box outer-box">
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

    <div class="api-menu-vscroll">
      <table class="table is-narrow is-fullwidth is-hoverable api-menu-table">
        <tbody>
          <!-- Root types -->
          <api-menu-root-item v-for="(item, index) in docs" v-bind:key="index" :item="item"/>
        </tbody>
      </table>
    </div>
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
  .api-menu-vscroll {
    height: calc( 100vh - 180px );
    overflow-x: hidden;
    overflow-y: auto;
    display: block;
    padding-right: 40px;
    margin-right: -20px;
  }
</style>

