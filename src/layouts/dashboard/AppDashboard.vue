<template>
  <v-app class="diana-page">
    
    <v-sheet color="primary" elevation="0" height="48" width="56" id="h-mobile-menu-si" @click.stop="drawer = !drawer"
      class="diana-transition shadow-smallest">
      <div id="global-nav-toggle-2-si" class="global-nav-toggle diana-transition">
        <i></i>
      </div>
    </v-sheet>
    <v-app-bar app dense color="background" id="appbar-si" role="navigation" aria-roledescription="navigation" class="
        appbar--its-up
        w-full
        diana-transition
        shadow-content-default
      ">
      <TheNavbar />
    </v-app-bar>
    <v-main id="c-si" class="c-portal-main">
    
      <v-card background-color="white" class="noshadow">

      </v-card>
      <TheSideDrawer class="c-cloud-drawer-mini diana-transition" />
      <router-view> </router-view>
  <TheMainDrawer v-model="drawer" @click.stop="drawer = !drawer" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Dashboard",
  metaInfo: {
    title: "",
  },
  middleware: "auth",
  props: {},
  components: {
    /* ----------------------- componenetes para el header ---------------------- */
    TheNavbar: () => import("./TheNavbar.vue"),
    /* ----------------------------------- // ----------------------------------- */
    TheMainDrawer: () => import("./TheMainDrawer.vue"),
    TheSideDrawer: () => import("./TheSideDrawer.vue")
  },
  data: () => ({}),
  computed: {
    drawer: {
      get() {
        return this.$store.getters["getDrawer"];
      },
      set(params) {
        this.$store.dispatch("axnMainDrawer", params);
      },
    },
  },
  watch: {},
  // Hooks
  beforeCreate() { },
  created() { },
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
