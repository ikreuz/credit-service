import Vue from "vue";
import VueRouter from "vue-router";
//
// import multiguard from "vue-router-multiguard";
// import { guardian_1 } from "../guardian/guardians";
// import auth from "../middleware/auth";
// import isLoggedIn from "../middleware/is_logged";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Parcel",
    redirect: "/home",
    component: () =>
      import(
        /* webpackChunkName: "Parcel" */ "@/layouts/dashboard/AppDashboard.vue"
      ),
    // beforeEnter: multiguard([isLoggedIn, guardian_1]),
    // meta: { requireAuth: true, middleware: auth },
    children: [
      {
        path: "/home",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
        props: true,
        // meta: { requireAuth: true, middleware: auth },
      },
      {
        path: "/creditAccount",
        name: "Cuenta credito",
        component: () =>
          import(/* webpackChunkName: "CreditAccount" */ "../views/CreditAccount.vue"),
        props: true,
        // meta: { requireAuth: true, middleware: auth },
      },
      {
        path: "/savingAccount",
        name: "Cuenta ahorro",
        component: () =>
          import(/* webpackChunkName: "savingAccount" */ "../views/SavingAccount.vue"),
        props: true,
        // meta: { requireAuth: true, middleware: auth },
      },
      {
        path: "/history",
        name: "Historial",
        component: () =>
          import(/* webpackChunkName: "Historial" */ "../views/History.vue"),
        props: true,
        // meta: { requireAuth: true, middleware: auth },
      },
      {
        path: "/balance",
        name: "Balance",
        component: () =>
          import(
            /* webpackChunkName: "Balance" */ "../views/Balance.vue"
          ),
        props: true,
        // meta: { requireAuth: true, middleware: auth },
      },
      {
        path: "/setting",
        name: "Setting",
        component: () =>
          import(
            /* webpackChunkName: "Setting" */ "../views/setting/index.vue"
          ),
        props: true,
        // meta: { requireAuth: true, middleware: auth },
      },
    ],
  },
  {
    path: "/portal",
    name: "",
    redirect: "Login",
    component: () =>
      import(/* webpackChunkName: "" */ "@/layouts/portal/AppLogin.vue"),
    // meta: { requireAuth: false },
    children: [
      {
        path: "/login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
        props: false,
        meta: { requireAuth: false },
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    name: "PageNotFound",
    component: () =>
      import(
        /* webpackChunkName: "PageNotFound" */ "../views/PageNotFound.vue"
      ),
    // meta: {
    //   requireAuth: false,
    // },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.onError((e) => {
  console.log("parcel@: " + e.message);
  router.push({ name: "Login" });
});

export default router;
