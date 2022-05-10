<template>
  <v-container grid-list-xl text-xs-center class="pt-10">
    <v-layout row wrap>
      <v-flex xs12 sm12 tag="div" v-resize="onResize">
        <!-- {{ windowSize }} -->
        <v-card id="" class="stripe stripe--article shadow-smallest">
          <v-card-text>Aperturar una cuenta</v-card-text>
          <v-layout row wrap pa-3 justify-center class="card-saving-account">
            <v-flex xs10 sm6 md4 v-for="card in cards" :key="card.title">
              <v-card class="card-saving-account__container z-3 noshadow">
                <v-col cols="12" class="wrapper-input-5 z-3" color="bunker darken-5">
                  <v-list-item v-if="card.id == 1">
                    <v-list-item-content>
                      <v-list-item-title>{{ card.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="card.id == 2">
                    <v-list-item-content>
                      <v-list-item-title>{{ card.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="card.id == 3">
                    <v-list-item-content>
                      <v-list-item-title>{{ card.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="card.id == 4">
                    <v-list-item-content>
                      <v-list-item-title>{{ card.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="card.id == 5">
                    <v-list-item-content>
                      <v-list-item-title>{{ card.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" class="wrapper-input-5 z-3" v-if="card.id == 1">
                  <div class="wrapper">
                    <div class="diana-input-data" v-if="card.id == 1">
                      <v-select v-model="clienteModel" :items="clienteEntries" item-text="Nombre" menu-props="auto"
                        item-value="Cliente_Id" color="primary" solo class="diana-input scrolled" @change="selectClient"
                        label="Select" :hint="`${clienteEntries.Cliente_Id}, ${clienteEntries.Nombre}`">
                      </v-select>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" class="wrapper-input-5 z-3" v-if="card.id == 2">
                  <div class="wrapper">
                    <div class="diana-input-data" v-if="card.id == 2">
                      <v-text-field v-model="clienteAhorro.Numero_Cuenta" class="diana-input" solo dense value=""
                        type="text" prepend-icon="mdi-account">
                      </v-text-field>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" class="wrapper-input-5 z-3" v-if="card.id == 3">
                  <div class="wrapper">
                    <div class="diana-input-data" v-if="card.id == 3">
                      <v-text-field v-model="saldo" class="diana-input" solo dense type="number"
                        :value="savingTarget.Total" prepend-icon="mdi-card-account-details-outline">
                      </v-text-field>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" class="wrapper-input-5 z-3" v-if="card.id == 4">
                  <div class="wrapper">
                    <div class="diana-input-data" v-if="card.id == 4">
                      <v-text-field v-model="conCredito" class="diana-input" solo dense type="text"
                        prepend-icon="mdi-card-account-details-outline">
                      </v-text-field>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" class="wrapper-input-5 z-3" v-if="card.id == 5">
                  <div class="wrapper">
                    <div class="diana-input-data" v-if="card.id == 5">
                      <v-text-field v-model="conAhorro" class="diana-input" solo dense type="text"
                        prepend-icon="mdi-card-account-details-outline">
                      </v-text-field>
                    </div>
                  </div>
                </v-col>
              </v-card>
            </v-flex>
          </v-layout>
          <v-card class="disflex noshadow">
            <v-btn color="primary" class="w-200 " @click="alta()">
              Aperturar cuenta
            </v-btn>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import srvToasted from "@/services/srv_toasted.js";

export default {
  name: "",
  props: {},
  components: {
  },
  data: () => ({
    cards: [
      { id: 1, title: "Cliente", content: "" },
      { id: 2, title: "Numero cuenta", content: "" },
      { id: 3, title: "Saldo actual", content: "" },
      { id: 4, title: "Tiene cuenta de credito", content: "" },
      { id: 5, title: "Tiene cuenta de ahorro", content: "" },
    ],
    statusHTTP: {
      OK: 200,
      ERROR: 400,
    },
     toasted: {
      CUSTOM: "custom",
      DEFAULT: "default",
      INFO: "info",
      ERROR: "error",
      SUCCESS: "success",
      WARNING: "warning",
    },
    saldo: 0.00,
    conCredito: "...",
    conAhorro: "...",
    clientTarget: {},
    creditTarget: {},
    savingTarget: {},
    txnSavingEntries: [],
    txnCreditEntries: [],
    txnEntries: [],
    selectClientId: 0,
    selectTxnId: 0,
    selectTxnItem: 0,
    selectTotales: 0,
    /** contact */
    clienteLimite: 60,
    clienteEntries: [],
    clienteCount: null,
    clienteModel: null,
    clienteSearch: null,
    isClientLoading: false,
    // isClienteEditing: false,
    windowSize: {
      x: 0,
      y: 0,
    },
    activateBit: true,
    /** */
    clienteAhorro: {
      Saldo_Actual: 0.00,
      Numero_Cuenta: ''
    }
  }),
  computed: {
  },
  watch: {
    windowSize() { },
  },
  /** Hooks */
  beforeCreate() { },
  created() { },
  beforeMount() { },
  mounted() {
    this.onResize();
    fetch(this.$store.getters['getEpCustomers'])
      .then(response => response.json())
      .then(data => {
        console.log('getEpCustomers ' + JSON.stringify(data))
        this.clienteEntries = data.Data
      });
    fetch(this.$store.getters['getEpTransactionSaving'])
      .then(response => response.json())
      .then(data => {
        console.log('getEpTransactionSaving ' + JSON.stringify(data))
        this.txnSavingEntries = data.Data
      });
    fetch(this.$store.getters['getEpTransactionCredit'])
      .then(response => response.json())
      .then(data => {
        console.log('getEpTransactionCredit ' + JSON.stringify(data))
        this.txnCreditEntries = data.Data
      });
    // fetch(this.$store.getters['getEpTransaction'])
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('getEpTransaction ' + JSON.stringify(data))
    //     this.txnEntries = data.Data
    //   });
  },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    keyEvent(event) {
      console.log('Key pressed:', event);
      console.log(this.contacto);
      this.clienteCount = uuidv4();
      console.log(this.clienteCount);
    },
    async alta() {
      fetch(this.$store.getters['postEpTranasctionSaving'], {
        method: 'POST',
        body: JSON.stringify({
          Saving_Id: 1,
          Tipo_Cuenta: 37,
          Apertura: (this.savingTarget.Apertura + 1),
          Numero_Cuenta: this.clienteAhorro.Numero_Cuenta,
          Documento_Id: 53, // apertura
          Cantidad: this.saldo,
          Total: 0,
        }),
        headers: { 'Content-type': "application/json; charset=UTF-8" }
      })
        .then(response => response.json())
        .then(data => {
          console.log('post ' + data)
          // if (data != null) this.actualizarCliente()
          // this.statusHTTP = 200;
          // this.txnEntries = data.Data
        });
      srvToasted("Apertura de nueva cuenta", this.toasted.SUCCESS, "mdi mdi-check");
      this.saldo = 0.00
      this.conAhorro = "...";
      this.conCredito = "..."
    },
    async actualizarCliente() {
      fetch(this.$store.getters['putEpCustomers'], {
        method: 'PUT',
        body: JSON.stringify({
          Numero_Cuenta: this.clienteAhorro.Numero_Cuenta,
          C_Ahorro: true,
        }),
        headers: { 'Content-type': "application/json; charset=UTF-8" }
      })
        .then(response => response.json())
        .then(data => {
          console.log('put ' + data)
          // this.statusHTTP = 200;
          // this.txnEntries = data.Data
        });
    },
    async findAccount() {
      fetch(this.$store.getters['getEpSavingAccount'], {
        method: 'GET',
        body: JSON.stringify({
          Transaction_Id: 1,
          Folio: 1,
          Cliente_Id: 1,
          Sucursal_Id: 1,
          Fh_Registro: moment(),
          Fh_Modificacion: moment(),
          Usr_Registra: 1,
          Usr_Modifica: 0,
        }),
        headers: { 'Content-type': "application/json; charset=UTF-8" }
      })
        .then(response => response.json())
        .then(data => {
          console.log('get ' + data)
          // this.txnEntries = data.Data
        });
    },
    selectClient(value) {
      if (value != null) {
        this.$store.dispatch("axnCustomerProfile", value);
      }
      for (var i = 0; i < this.clienteEntries.length; i++) {
        if (value == this.clienteEntries[i].Cliente_Id) {
          this.clienteAhorro = this.clienteEntries[i]
          this.savingTarget = this.txnSavingEntries[i]
          this.creditTarget = this.txnCreditEntries[i]
          console.log('----- clienteEntries: ' + JSON.stringify(this.clienteAhorro));
          console.log('----- txnSavingEntries: ' + JSON.stringify(this.savingTarget));
          console.log('----- txnCreditEntries: ' + JSON.stringify(this.creditTarget));
        }
      }
      if (this.savingTarget.Numero_Cuenta) {
        this.conAhorro = "Con ahorro";
      } else {
        this.conAhorro = "Sin ahorro";
      }
      if (this.creditTarget.Numero_Cuenta) {
        this.conCredito = "Con credito";
      } else {
        this.conCredito = "Sin credito";
      }
      this.saldo = this.savingTarget.Total
    },
  },
  /** end Hooks */
};
</script>
