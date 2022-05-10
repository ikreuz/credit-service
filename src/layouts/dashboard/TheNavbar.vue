<template>
  <v-toolbar dense class="nopadding global-nav noshadow">
    <nav class="global-nav__menu" role="navigation" id="global-nav-si">
      <div class="global-nav__inner">
        <router-link to="/">
          <div class="global-nav__row" data-link="nav-diana">
            <div class="global-nav__content">
              <div class="global-nav__brand">
                <img width="36rem" height="36rem" src="@/assets/img/logo.svg" alt="Diana logo" id="nav-logo-si"
                  class="global-nav__logo" />
              </div>
            </div>
          </div>
        </router-link>

        <v-toolbar-title class="global-nav__title">Project Diana</v-toolbar-title>

        <ul class="global-nav__container menu" id="menu-si">
          <li class="global-nav__link-wrapper login-container d-flex menu-notif">
            <TheMenuNotification />
          </li>
          <li class="global-nav__link-wrapper login-container d-flex menu-account">
            <TheMenuAccount />
          </li>
        </ul>
      </div>
    </nav>
  </v-toolbar>
</template>

<script>
// import { mapActions } from "vuex";
import ParcelUtils from "@/assets/js/parcel_utils.js";
export default {
  components: {
    TheMenuAccount: () => import("./TheMenuAccount.vue"),
    TheMenuNotification: () => import("./TheMenuNotification.vue"),
  },
  data: () => ({
    parcelCls: new ParcelUtils(),
    awake: 0,
    posNavbarCovid: 584,
    posNavbarNosotros: 2184,
    posNavbarPasos: 3044,
    posNavbarServicios: 4144,
    posNavbarPreguntas: 4744,
    posPortalReady: 5644,
    isMobile: false,
  }),
  computed: {
    dialogSignin: {
      get() {
        // console.log(this.$store.state.dialogSignin);
        return this.$store.state.dialogSignin;
      },
      set(value) {
        this.$store.commit("SET_DIALOG_SIGNIN", value);
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
    this.onResize();

    window.addEventListener("resize", this.onResize, { passive: true });

    // console.log("mobile " + this.$vuetify.breakpoint.mobile);
  },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() {
    if (typeof window === "undefined") return;

    window.removeEventListener("resize", this.onResize, { passive: true });
  },
  destroyed() { },
  methods: {
    // ...mapActions([
    //   "jaeger",
    //   [
    //     "axnJaegerAddTab",
    //     "axnJaegerDeleteTab",
    //     "axnJaegerActiveIndex",
    //     "axnJaegerRemoveTab",
    //   ],
    // ]),
    navClickHandler(ev) {
      // console.log(ev.target);
      this.navRemoveAttActivated(ev);
    },
    signin() {
      this.$router.push({ path: "/signin" });
    },
    onResize() {
      this.isMobile = window.innerWidth < 600;
    },
  },
  // end Hooks
};
</script>

