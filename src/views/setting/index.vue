<template>
  <v-row class="mt-12 mx-4">
    <v-col>
      <v-card-title class="justify-center">Configuracion</v-card-title>
      <CardSetting />
    </v-col>
  </v-row>
</template>

<script>
import srvToasted from "@/services/srv_toasted.js";

export default {
  name: "Setting",
  metaInfo: {
    title: "Configuracion",
  },
  props: {},
  components: {CardSetting: () => import("@/components/cards/CardSetting.vue")},
  data: () => ({
    toasted: {
      CUSTOM: "custom",
      DEFAULT: "default",
      INFO: "info",
      ERROR: "error",
      SUCCESS: "success",
      WARNING: "warning",
    },
  }),
  computed: {
    miniVariant: {
      get() {
        return this.$store.state.sideDrawer;
      },
      set(value) {
        this.$store.dispatch("axnSideDrawer", value);
      },
    },
  },
  watch: {},
  // Hooks
  beforeCreate() { },
  created() { },
  beforeMount() { },
  mounted() {
    try {
      document.addEventListener("click", this.close);
      srvToasted("Configuracion", this.toasted.SUCCESS, "mdi mdi-check");
    } catch (error) {
      console.log('dianaprj@: ' + error);
    }
  },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
  methods: {
    close(e) {
      if (!this.$el.contains(e.target)) {
        // this.drawer = !this.drawer;
        this.miniVariant = true;
      }
    },
  },

  // end Hooks
};
</script>
