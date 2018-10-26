<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="logo.svg">
          <span class="tag version is-white">v{{ version }}</span>
        </router-link>

        <a role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          @click="burgerActive = !burgerActive"
          :class="{ 'is-active': burgerActive }"
          data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu"
        @click="burgerActive = false"
        :class="{ 'is-active': burgerActive }">
        <div class="navbar-start">
          <router-link class="navbar-item" :class="{ 'is-active': $route.name === 'home' }" to="/">Home</router-link>
          <router-link class="navbar-item" :class="{ 'is-active': $route.name.includes('api') }" to="/api">API</router-link>
        </div>

        <div class="navbar-end">
          <a class="navbar-item is-white" target="_new" :href="repoUrl">
            <img src="GitHub.png">
          </a>
      </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      burgerActive: false,
    };
  },
  computed: {
    repoUrl() {
      return this.$store.state.packageFile.repository.url;
    },
    version() {
      return this.$store.state.packageFile.version;
    },
  },
};
</script>

<style>
  span.tag.version {
    margin-top: 12px;
  }
</style>
