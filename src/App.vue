<template>
  <div>
    <navbar />
    <section class="section">
      <div class="container">
        <router-view/>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'app',
  components: {
    Navbar,
  },
  created() {
    this.$store.dispatch('loadDocs');
    this.$store.dispatch('loadReadMe');
    this.$store.dispatch('loadPackageFile');
  },
};
</script>

<style lang="scss">
  @charset "utf-8";
  @import "../node_modules/bulma/bulma.sass";
</style>

<style>
  section {
    padding-top: 1.25rem !important;
    padding-bottom: 1.25rem !important;
  }
</style>
