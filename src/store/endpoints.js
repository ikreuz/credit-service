import axios from "axios";
const local = 'http://localhost:5000/api'
// const azure = 'http://creditandsaving.azurewebsites.net/api'
const service = local;
// Customer
const netCustomersPost = service + '/Customers/insert'
const netCustomersPut = service + '/Customers/update'
// const netCustomersDelete = service+'/Customers/delete/'
// const netCustomersGet = service+'/Customers/get/';
const netCustumersGetAll = service + '/Customers/getall'
// Roles
// const netRolesPost = service+'/Roles/insert'
// const netRolesPut = service+'/Roles/update'
// const netRolesDelete = service+'/Roles/delete/'
// const netRolesGet = service+'/Roles/get/';
const netRolesGetAll = service + '/Roles/getall'
// Tower => Master ID, Auth
// const netTowerPost = service+'/Tower/insert'
// const netTowerPut = service+'/Tower/update'
// const netTowerDelete = service+'/Tower/delete/'
// const netTowerGet = service+'/Tower/get/';
const netTowerGetAll = service + '/Tower/getall'
// Transaction
// const netTransactionPost = service+'/Transaction/insert'
// const netTransactionPut = service+'/Transaction/update'
// const netTransactionDelete = service+'/Transaction/delete/'
// const netTransactionGet = service+'/Transaction/get/';
// const netTransactionGetAll = service+'/Transaction/getall'
// Transaction Credit
// const netTransactionCreditPost = service+'/TransactionCredit/insert'
// const netTransactionCreditPut = service+'/TransactionCredit/update'
// const netTransactionCreditDelete = service+'/TransactionCredit/delete/'
// const netTransactionCreditGet = service+'/TransactionCredit/get/';
// const netTransactionCreditGetAllCmp = service + '/TransactionCredit/getall'
const netTransactionCreditGetAllCmp = service + '/TransactionCredit/getallCmp'
// Transaction Saving
const netTransactionSavingPost = service + '/TransactionSaving/insert'
// const netTransactionSavingPut = service+'/TransactionSaving/update'
// const netTransactionSavingDelete = service+'/TransactionSaving/delete/'
// const netTransactionSavingGet = service+'/TransactionSaving/get/';
const netTransactionSavingGetAllCmp = service + '/TransactionSaving/getallCmp'
// Users
// const netUsersPost = service+'/Users/insert'
// const netUsersPut = service+'/Users/update'
// const netUsersDelete = service+'/Users/delete/'
// const netUsersGet = service+'/Users/get/';
const netUsersGetAll = service + '/Users/getall'
// Credit Account
// const netCreditAccountGet = service+'/CreditAccount/get/';
// Saving Account
// const netSavingAccountGet = service+'/SavingAccount/get/';
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
    putEpCustomers() {
      return netCustomersPut;
    },
    postEpTranasctionSaving() {
      return netTransactionSavingPost;
    },
    getEpCustomers() {
      return netCustumersGetAll;
    },
    getEpTransactionCreditCmp() {
      return netTransactionCreditGetAllCmp;
    },
    getEpTransactionSavingCmp() {
      return netTransactionSavingGetAllCmp;
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
            axios.get(netTransactionCreditGetAllCmp),
            axios.get(netTransactionSavingGetAllCmp),
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
