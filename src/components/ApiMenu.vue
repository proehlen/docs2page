<template>
  <aside class="menu">
    <ul class="menu-list">
      <li v-for="item in docs" v-bind:key="item.name">
        <router-link
          :class="{ 'is-active': item.name === $route.params.typeName }"
          :to="{ name: 'apiType', params: { typeName: item.name }}"
          nav=""
          @click.native="scrollToTop">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'api-menu',
  computed: {
    docs() {
      return this.$store.state.docs;
    },
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

