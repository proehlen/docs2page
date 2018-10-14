<template>
  <div>
    <div class="columns">
      <div class="column">
        <h1 class="title">{{ topic.name }}</h1>
        <api-description :description="topic.description"/>
      </div>
      <div class="column is-narrow">
        <span class="tag is-info">{{ topic.kind }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ApiDescription from '@/components/ApiDescription.vue';

export default {
  name: 'api-topic',
  components: {
    ApiDescription,
  },
  computed: {
    topic() {
      return this.$store.state.selected;
    },
  },
  watch: {
    $route() {
      this.setSelectedTopic();
    },
  },
  async created() {
    this.setSelectedTopic();
  },
  methods: {
    setSelectedTopic() {
      this.$store.commit('setSelectedTopic', this.$route.params.topic);
    },
  },
};
</script>

