<template>
  <v-navigation-drawer id="side-drawer-si" :mini-variant="miniVariant" mini-variant-width="56" permanent color="white" class="diana-transition">
    <v-list nav dense class="side-drawer__list" router>
      <v-btn id="side-btn-si" icon elevation="0" class="
          diana-btn
          diana-border-top-radius diana-border-bottom-radius
          diana-btn--w-40
          mb-2
        " color="bunker darken-5"  @click.stop="miniVariant = !miniVariant">
        <v-icon v-if="miniVariant">mdi mdi-arrow-expand-right</v-icon>
        <v-icon v-else>mdi mdi-arrow-expand-left</v-icon>
      </v-btn>
      <v-divider class="pb-2"></v-divider>
      <v-list-item link class="side-drawer__list-item scrolled" v-for="menu in menuScope" :to="menu.route"
        :index="menu.route" :key="menu.route" :aria-label="menu.aria">
        <v-list-item-icon class="side-drawer__list-item-icon">
          <v-icon class="sd-icon">{{ menu.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="side-drawer__list-item-title">
          {{ menu.name }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider class=""></v-divider>
    <v-list nav dense class="side-drawer__list" :default-active="$route.path" router>
      <v-list-item link class="side-drawer__list-item" v-for="menu in menuScopeSettings" :to="menu.route"
        :index="menu.route" :key="menu.route" :aria-label="menu.aria" @click="close">
        <v-list-item-icon class="side-drawer__list-item-icon">
          <v-icon class="sd-icon">{{ menu.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="side-drawer__list-item-title">
          {{ menu.name }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>


<script>
import { mapActions } from "vuex";
import ParcelUtils from "@/assets/js/parcel_utils.js";
export default {
  name: "",
  middleware: "",
  props: {},
  components: {},
  data: () => ({
    parcelCls: new ParcelUtils(),
    drawer: true,
    mini: true,
    clipped: false,
    menuScope: [
      {
        route: "/",
        name: "Home",
        icon: "mdi-home-account",
        aria: "home",
      },
      {
        route: "/savingAccount",
        name: "Cuenta Ahorro",
        icon: "mdi-archive-arrow-down",
        aria: "savingAccount",
      },
      {
        route: "/balance",
        name: "Balance",
        icon: "mdi-bank",
        aria: "Balance",
      },
      {
        route: "/history",
        name: "History",
        icon: "mdi-history",
        aria: "History",
      },
    ],
    menuScopeSettings: [
      {
        route: "/setting",
        name: "Configuración",
        icon: "mdi-cog",
        aria: "Configuración",
      },
    ],
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
    document.addEventListener("click", this.close);
  },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  },
  destroyed() { },
  methods: {
    ...mapActions([]),
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
