<template>
  <nav class="panel">
    <p class="panel-heading">
      Api
    </p>
    <div class="panel-block">
      <div class="field has-addons">
        <div class="control has-icons-left">
          <input class="input is-small" type="text" placeholder="search" v-model="filter">
          <span class="icon is-small is-left">
            <font-awesome-icon icon="search" />
          </span>
        </div>
        <div class="control">
          <a class="button is-small is-white" @click="clearFilter" :disabled="!filter">
            <span class="icon">
              <font-awesome-icon icon="times" />
            </span>
          </a>
        </div>
      </div>
    </div>
    <router-link
      class="panel-block"
      v-for="item in docs" v-bind:key="item.name"
      :class="{ 'is-active': item.name === $route.params.objectTypeName }"
      :to="{ name: 'apiObjectType', params: { objectTypeName: item.name }}"
      nav="">
      {{ item.name }}
    </router-link>
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
    clearFilter() {
      this.$store.commit('setFilter', '');
    },
  },
};
</script>

