import Vue from "vue";
import Vuex from "vuex";
//
import jsCookie from "js-cookie";
import jsCrypt from "crypto-js";
import createPersistedState from "vuex-persistedstate";
import ep from "./endpoints";

const auth = { accessToken: "tokenWithAjax" };

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      getItem: (key) => jsCookie.get(key),
      setItem: (key, value) =>
        jsCookie.set(key, value, { expires: 3, secure: true }),
      removeItem: (key) => jsCookie.remove(key),
    }),
  ],
  state: {
    drawer: false,
    sideDrawer: true,
    auth: null,
    user: null,
    authenticated: false,
    cookie: false,
    profile: {},
    customerProfile: {},
    guardianEmployees: [],
    guardianCustomers: [],
    guardianRoles: [],
    //
    dialogClient: false,
    updateTable: false,
    txnEntries: [],
    txnCreditEntries: [],
    txnSavingEntries: []
  },
  mutations: {
    SET_MAIN_DRAWER(state, payload) {
      state.drawer = payload;
    },
    SET_SIDE_DRAWER(state, payload) {
      state.sideDrawer = payload;
    },
    SET_AUTH(state, payload) {
      state.auth = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_AUTHENTICATED(state, payload) {
      state.authenticated = payload;
    },
    SET_COOKIE(state, payload) {
      state.cookie = payload;
    },
    SET_PROFILE(state, payload) {
      state.profile = payload;
    },
    SET_GUARDIAN_EMPLOYEES(state, payload) {
      state.guardianEmployees = payload;
    },
    SET_GUARDIAN_CUSTOMERS(state, payload) {
      state.guardianCustomers = payload;
    },
    SET_GUARDIAN_ROLES(state, payload) {
      state.guardianRoles = payload;
    },
    // 
    SET_DIALOG_CLIENT(state, payload) {
      state.dialogClient = payload;
    },
    SET_CUSTOMER_PROFILE(state, payload) {
      state.customerProfile = payload
    },
    SET_UPDATE_TABLE(state, payload) {
      state.updateTable = payload
    },
    SET_TXN_ENTRIES(state, payload) {
      state.txnEntries = payload
    },
    SET_TXN_CREDIT_ENTRIES(state, payload) {
      state.txnCreditEntries = payload
    },
    SET_TXN_SAVING_ENTRIES(state, payload) {
      state.txnSavingEntries = payload
    }
  },
  actions: {
    axnMainDrawer({ commit }, payload) {
      commit("SET_MAIN_DRAWER", payload);
    },
    axnSideDrawer({ commit }, payload) {
      commit("SET_SIDE_DRAWER", payload);
    },
    axnAuth({ commit }, payload) {
      console.log(payload);
      commit("SET_AUTH", payload);
    },
    axnUser({ commit }, payload) {
      console.log(payload);
      commit("SET_USER", payload);
    },
    axnAuthenticated({ commit }, payload) {
      if (payload) {
        let ciphertext = jsCrypt.AES.encrypt(
          JSON.stringify(auth),
          "1234"
        ).toString();
        localStorage.setItem("logged_in", ciphertext);
        jsCookie.set("logged_in", ciphertext);
        // let bytes = jsCrypt.AES.decrypt(ciphertext, "1234")
        // let decryptedData = JSON.parse(bytes.toString(jsCrypt.enc.Utf8))
        // console.log('parcel@: decryptedData '+JSON.stringify(decryptedData));
        commit("SET_AUTHENTICATED", payload);
      }
    },
    axnCookie({ commit }, payload) {
      commit("SET_COOKIE", payload);
    },
    axnProfile({ commit }, payload) {
      console.log(payload);
      commit("SET_PROFILE", payload);
    },
    axnLogin({ commit }, payload) {
      console.log(payload);
      commit("SET_USER", payload);
    },
    axnGuardianEmployees({ commit }, payload) {
      commit("SET_GUARDIAN_EMPLOYEES", payload);
    },
    axnGuardianRoles({ commit }, payload) {
      commit("SET_GUARDIAN_ROLES", payload);
    },
    axnGuardianCustomers({ commit }, payload) {
      commit("SET_GUARDIAN_CUSTOMERS", payload);
    },
    //
    axnDialogClient({ commit }, payload) {
      commit('SET_DIALOG_CLIENT', payload)
    },
    axnCustomerProfile({ commit }, payload) {
      commit('SET_CUSTOMER_PROFILE', payload)
    },
    axnUpdateTable({ commit }, payload) {
      commit('SET_UPDATE_TABLE', payload)
    },
    axnTxnEntries({ commit }, payload) {
      commit('SET_TXN_ENTRIES', payload)
    },
    axnTxnCreditEntries({ commit }, payload) {
      commit('SET_TXN_CREDIT_ENTRIES', payload)
    },
    axnTxnSavingEntries({ commit }, payload) {
      commit('SET_TXN_SAVING_ENTRIES', payload)
    }
  },
  getters: {
    getDrawer(state) {
      return state.drawer;
    },
    getAuth(state) {
      return state.auth;
    },
    getUser(state) {
      return state.user;
    },
    getAuthenticate(state) {
      return state.authenticated;
    },
    getCookie(state) {
      return state.cookie;
    },
    getProfile(state) {
      return state.profile;
    },
    //
    getDialogClient(state) {
      return state.dialogClient
    },
    getTxnEntries(state) {
      return state.txnEntries
    },
    getTxnCreditEntries(state) {
      return state.txnCreditEntries
    },
    getTxnSavingEntries(state) {
      return state.txnSavingEntries
    }
  },
  modules: { ep: ep },
});
