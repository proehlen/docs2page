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
          data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
          <router-link class="navbar-item" to="/api">API</router-link>
        </div>

        <div class="navbar-end">
          <a class="navbar-item is-white" href="https://github.com/proehlen/cashlib">
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
  computed: {
    version() {
      return this.$store.state.packageFile.version;
    },
  },
};
</script>

<style>
  span.tag.version {
    margin-top: -12px;
  }
</style>
