<template>
  <div>
    <navbar />
    <section class="section">
      <div class="container">
        <router-view/>
        <footer class="footer">
          <div class="content has-text-centered is-size-6">
            <p class="has-text-weight-light">
              This website was built with
              <a href="https://www.npmjs.com/package/docs2page" target="_new">
                <strong>
                  Docs2page
                </strong>
              </a>.
            </p>
          </div>
        </footer>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

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
  computed: {
    packageName() {
      return this.$store.state.packageFile.name;
    },
  },
  watch: {
    packageName() {
      document.title = this.packageName;
    },
  },
};
</script>

<style scoped>
  footer.footer {
    padding-top: 1em;
    padding-bottom: 1em;
  }
</style>


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
