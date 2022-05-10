<template>
  <v-navigation-drawer v-model="drawer" id="main-drawer-si" :mini-variant="miniVariant" :clipped="clipped" fixed
    color="background" app class="diana-transition scrolled">
    <div class="global-nav__inner">
      <v-sheet color="primary" elevation="0" height="48" width="56" id="main-drawer-mobile-si" @click="drawer = !drawer"
        class="diana-transition shadow-smallest">
        <div id="global-nav-toggle-si" class="global-nav-toggle diana-transition">
          <i></i>
        </div>
      </v-sheet>
      <router-link to="/">
        <div class="global-nav__row" v-on:click="drawer = false">
          <div class="global-nav__content">
            <div class="global-nav__brand">
              <img width="36rem" height="36rem" src="@/assets/img/logo.svg" alt="Parcel logo" id="nav-logo-si"
                class="global-nav__logo" />
            </div>
          </div>
        </div>
      </router-link>
      <v-toolbar-title class="global-nav__title">Project Diana</v-toolbar-title>

    </div>
    <v-list class="global-nav__list">
      <v-list-item-group v-model="drawerSelectedItem">
        <v-list-item v-for="(item, i) in drawerItems" :key="i" :aria-label="item.aria" :to="item.to"
          class="global-nav__list-item diana-transition" @click="(miniVariant = false), (drawer = false)">
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {},
  middleware: ["auth"],
  components: {
  },
  data: () => ({
    drawerSelectedItem: 0,
    miniVariant: false,
    clipped: false,
    drawerItems: [
      {
        icon: "mdi-home-account",
        title: "Home",
        to: "/",
        aria: "Home",
      },
      {
        icon: "mdi-archive-arrow-down",
        title: "Cuenta Ahorro",
        to: "/savingAccount",
        aria: "savingAccount",
      },
      {
        icon: "mdi-bank",
        title: "Balance",
        to: "/balance",
        aria: "Balance",
      },
      {
        icon: "mdi-history",
        title: "History",
        to: "/history",
        aria: "History",
      },
      {
        icon: "mdi-cog",
        title: "Setting",
        to: "/setting",
        aria: "Setting",
      },

    ],
  }),

  computed: {
    drawer: {
      get() {
        return this.$store.getters["getDrawer"];
      },
      set(value) {
        this.$store.dispatch("axnMainDrawer", value);
      },
    },
    options() {
      return this.$store.state.jaeger.options;
    },
    activeIndex: {
      get() {
        return this.$store.state.jaeger.activeIndex;
      },
      set(val) {
        this.$store.dispatch("axnJaegerActiveIndex", val);
      },
    },
  },
  watch: {},
  // Hooks
  beforeCreate() { },
  created() { },
  beforeMount() { },
  mounted() {
    document.addEventListener("click", this.close);
  },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  },
  destroyed() { },
  methods: {
    ...mapActions([
      // "jaeger",
      // [
      //   "axnJaegerAddTab",
      //   "axnJaegerDeleteTab",
      //   "axnJaegerActiveIndex",
      //   "axnJaegerRemoveTab",
      // ],
    ]),
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.drawer = false;
      }
    },
  },
};
</script>
