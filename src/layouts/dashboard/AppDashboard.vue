<template>
  <v-app class="parcel-page">
    <TheMainDrawer v-model="drawer" @click.stop="drawer = !drawer" />
    <v-sheet
      color="primary"
      elevation="0"
      height="48"
      width="56"
      id="h-mobile-menu-si"
      @click.stop="drawer = !drawer"
      class="parcel-transition shadow-smallest"
    >
      <div
        id="global-nav-toggle-2-si"
        class="global-nav-toggle parcel-transition"
      >
        <i></i>
      </div>
    </v-sheet>
    <v-app-bar
      app
      dense
      color="background"
      id="appbar-si"
      role="navigation"
      aria-roledescription="navigation"
      class="
        appbar--its-up
        posrelative
        w-full
        parcel-transition
        shadow-content-default
      "
    >
      <TheNavbar />
    </v-app-bar>
    <v-main id="c-si" class="devmpm-main c-portal-main">
      <v-card background-color="white" class="devmpm-main__container noshadow">
  
      </v-card>
      <TheSideDrawer class="c-cloud-drawer-mini parcel-transition" />
      <router-view> </router-view>

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
    // BaseMpmLogoVd: () => import("@/libs/BaseMpmLogoVd.vue"),
    // BaseMpmPolar: () => import("@/libs/BaseMpmPolar.vue"),
    // ----- Menu cuenta
    // TheMenuAccount: () => import("./TheMenuAccount.vue"),
    // TheMenuNotification: () => import("./TheMenuNotification.vue"),
    /* ----------------------------------- // ----------------------------------- */
    TheMainDrawer: () => import("./TheMainDrawer.vue"),
    TheSideDrawer: () => import("./TheSideDrawer.vue"),
    // TheTab: () => import("./layouts/TheTab.vue"),
    // TheCardCommandbar: () => import("@/components/cards/TheCardCommandbar"),
    // TableCloud: () => import("@/components/tables/TableCloud.vue"),
    // TheFooter: () => import("./layouts/TheFooter.vue"),
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
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {},

  // end Hooks
};
</script>

<style lang="scss" >
</style>
