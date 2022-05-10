import axios from "axios";
// Customer
const netCustomersPost = 'http://localhost:5000/api/Customers/insert'
const netCustomersPut = 'http://localhost:5000/api/Customers/update'
// const netCustomersDelete = 'http://localhost:5000/api/Customers/delete/'
// const netCustomersGet = 'http://localhost:5000/api/Customers/get/';
const netCustumersGetAll = 'http://localhost:5000/api/Customers/getall'
// Roles
// const netRolesPost = 'http://localhost:5000/api/Roles/insert'
// const netRolesPut = 'http://localhost:5000/api/Roles/update'
// const netRolesDelete = 'http://localhost:5000/api/Roles/delete/'
// const netRolesGet = 'http://localhost:5000/api/Roles/get/';
const netRolesGetAll = 'http://localhost:5000/api/Roles/getall'
// Tower => Master ID, Auth
// const netTowerPost = 'http://localhost:5000/api/Tower/insert'
// const netTowerPut = 'http://localhost:5000/api/Tower/update'
// const netTowerDelete = 'http://localhost:5000/api/Tower/delete/'
// const netTowerGet = 'http://localhost:5000/api/Tower/get/';
const netTowerGetAll = 'http://localhost:5000/api/Tower/getall'
// Transaction
// const netTransactionPost = 'http://localhost:5000/api/Transaction/insert'
// const netTransactionPut = 'http://localhost:5000/api/Transaction/update'
// const netTransactionDelete = 'http://localhost:5000/api/Transaction/delete/'
// const netTransactionGet = 'http://localhost:5000/api/Transaction/get/';
// const netTransactionGetAll = 'http://localhost:5000/api/Transaction/getall'
// Transaction Credit
// const netTransactionCreditPost = 'http://localhost:5000/api/TransactionCredit/insert'
// const netTransactionCreditPut = 'http://localhost:5000/api/TransactionCredit/update'
// const netTransactionCreditDelete = 'http://localhost:5000/api/TransactionCredit/delete/'
// const netTransactionCreditGet = 'http://localhost:5000/api/TransactionCredit/get/';
const netTransactionCreditGetAll = 'http://localhost:5000/api/TransactionCredit/getall'
// Transaction Saving
const netTransactionSavingPost = 'http://localhost:5000/api/TransactionSaving/insert'
// const netTransactionSavingPut = 'http://localhost:5000/api/TransactionSaving/update'
// const netTransactionSavingDelete = 'http://localhost:5000/api/TransactionSaving/delete/'
// const netTransactionSavingGet = 'http://localhost:5000/api/TransactionSaving/get/';
const netTransactionSavingGetAll = 'http://localhost:5000/api/TransactionSaving/getall'
// Users
// const netUsersPost = 'http://localhost:5000/api/Users/insert'
// const netUsersPut = 'http://localhost:5000/api/Users/update'
// const netUsersDelete = 'http://localhost:5000/api/Users/delete/'
// const netUsersGet = 'http://localhost:5000/api/Users/get/';
const netUsersGetAll = 'http://localhost:5000/api/Users/getall'
// Credit Account
// const netCreditAccountGet = 'http://localhost:5000/api/CreditAccount/get/';
// Saving Account
// const netSavingAccountGet = 'http://localhost:5000/api/SavingAccount/get/';
//
export default {
  state: {
    apiTowerGetAll: [],
    apiCustomersGetAll: [],
    apiRolesGetAll: [],
    apiUsersGetAll: [],
    apiTransactionGetAll: [],
    apiTransactionCreditGetAll: [],
    apiTransactionSavingGetAll: [],

  },
  getters: {
    getEpApiTowerGetAll(state) {
      return state.apiTowerGetAll;
    },
    getEpApiCustomersGetAll(state) {
      return state.apiCustomersGetAll;
    },
    getEpApiRolesGetAll(state) {
      return state.apiRolesGetAll;
    },
    getEpApiUsersGetAll(state) {
      return state.apiUsersGetAll;
    },
    getEpApiTransactionGetAll(state) {
      return state.apiTransactionGetAll;
    },
    getEpApiTransactionCreditGetAll(state) {
      return state.apiTransactionCreditGetAll;
    },
    getEpApiUsersTrasnsactionSavingAll(state) {
      return state.apiTransactionSavingGetAll;
    },
    postEpCustomers() {
      return netCustomersPost;
    },
    putEpCustomers(){
      return netCustomersPut;
    },
    postEpTranasctionSaving() {
      return netTransactionSavingPost;
    },
    getEpCustomers() {
      return netCustumersGetAll;
    },
    getEpTransactionCredit() {
      return netTransactionCreditGetAll;
    },
    getEpTransactionSaving() {
      return netTransactionSavingGetAll;
    },
    // getEpTransaction() {
    //   return netTransactionGetAll;
    // },
    // getEpCreditAccount() {
    //   return netCreditAccountGet;
    // },
    // getEpSavingAccount() {
    //   return netSavingAccountGet;
    // }
  },
  mutations: {
    SET_API_TOWER_GET_ALL(state, payload) {
      state.apiTowerGetAll = payload;
    },
    SET_API_CUSTOMERS_GET_ALL(state, payload) {
      // console.log("set:: "+typeof(payload));
      // console.log("set:: "+payload.Data);
      state.apiCustomersGetAll = payload;
    },
    SET_API_ROLES_GET_ALL(state, payload) {
      state.apiRolesGetAll = payload;
    },
    SET_API_USERS_GET_ALL(state, payload) {
      state.apiUsersGetAll = payload;
    },
    SET_API_TRANSACTION_GET_ALL(state, payload) {
      state.apiTransactionGetAll = payload;
    },
    SET_API_TRANSACTION_CREDIT_GET_ALL(state, payload) {
      state.apiTransactionCreditGetAll = payload;
    },
    SET_API_TRANSACTION_SAVING_GET_ALL(state, payload) {
      state.apiTransactionSavingGetAll = payload;
    },
  },
  actions: {
    // ALL GET ALL
    async axnApi({ dispatch }) {
      try {
        await axios
          .all([
            axios.get(netTowerGetAll),
            axios.get(netRolesGetAll),
            axios.get(netUsersGetAll),
            axios.get(netCustumersGetAll),
            // axios.get(netTransactionGetAll),
            axios.get(netTransactionCreditGetAll),
            axios.get(netTransactionSavingGetAll),
          ])
          .then(
            axios.spread(function (
              part1, part2, part3, part4, part6, part7) {
              dispatch("axnTowerGetAll", part1.data);
              dispatch("axnRolesGetAll", part2.data);
              dispatch("axnUsersGetAll", part3.data);
              dispatch("axnCustomersGetAll", part4.data);
              // dispatch("axnTransactionGetAll", part5.data);
              dispatch("axnTransactionCreditGetAll", part6.data);
              dispatch("axnTransactionSavingGetAll", part7.data);
            })
          );
      } catch (error) {
        console.log(error);
      }
    },
    async axnTowerGetAll({ commit }, payload) {
      commit("SET_API_TOWER_GET_ALL", payload);
    },
    async axnRolesGetAll({ commit }, payload) {
      commit("SET_API_ROLES_GET_ALL", payload);
    },
    async axnUsersGetAll({ commit }, payload) {
      commit("SET_API_USERS_GET_ALL", payload);
    },
    async axnCustomersGetAll({ commit }, payload) {
      commit("SET_API_CUSTOMERS_GET_ALL", JSON.stringify(payload));
    },
    // async axnTransactionGetAll({ commit }, payload) {
    //   commit('SET_API_TRANSACTION_GET_ALL', payload)
    // },
    async axnTransactionCreditGetAll({ commit }, payload) {
      commit('SET_API_TRANSACTION_CREDIT_GET_ALL', payload)
    },
    async axnTransactionSavingGetAll({ commit }, payload) {
      commit('SET_API_TRANSACTION_SAVING_GET_ALL', payload)
    }
  },
};
