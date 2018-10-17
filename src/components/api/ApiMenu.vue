<template>
  <nav class="panel">
    <p class="panel-heading">
      Api
    </p>
    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input is-small" type="text" placeholder="search" v-model="filter">
        <!-- <span class="icon is-small is-left">
          <i class="fas fa-search" aria-hidden="true"></i>
        </span> -->
      </p>
    </div>
    <router-link
      class="panel-block"
      v-for="item in docs" v-bind:key="item.name"
      :class="{ 'is-active': item.name === $route.params.typeName }"
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
};
</script>

