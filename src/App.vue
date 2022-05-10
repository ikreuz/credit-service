<template>
  <div data-theme="default">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  metaInfo: {
    title: "Project Diana",
  },
  props: {},
  components: {},
  data: () => ({}),
  computed: {},
  watch: {},
  // Hooks
  beforeCreate() { this.$store.dispatch("axnApi"); },
  created() {

  },
  beforeMount() { },
  mounted() { },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
  methods: {},

  // end Hooks
};
</script>
