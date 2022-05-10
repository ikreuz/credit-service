<template>
  <v-container grid-list-xl text-xs-center class="pt-10">
    <v-layout row wrap ref="form">
      <v-flex xs12 sm12 tag="div" v-resize="onResize">
        <!-- {{ windowSize }} -->
        <v-card class="stripe stripe--article shadow-smallest">
          <v-layout row wrap pa-3 justify-center class="card-operation">
            <v-flex xs10 sm6 md4>
              <v-card class="card-operations__container z-3 noshadow">
                <v-col cols="12" class="wrapper-input-5 z-3" color="bunker darken-5">
                  <v-list-item color="bunker darken-5">
                    <v-list-item-content>
                      <v-list-item-title>Cliente</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" class="wrapper-input-5 z-3">
                  <div class="wrapper">
                    <div class="diana-input-data">
                      <v-select v-model="clienteModel" :items="clienteEntries" item-text="Nombre" menu-props="auto"
                        item-value="Cliente_Id" color="primary" solo class="diana-input scrolled" @change="selectClient"
                        label="Select">
                      </v-select>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" class="wrapper-input-5 z-3">
                  <div class="wrapper">
                    <div class="diana-input-data">
                      <v-text-field v-model="clienteAhorro.Numero_Cuenta" class="diana-input" solo dense value=""
                        type="text" prepend-icon="mdi-account">
                      </v-text-field>
                    </div>
                  </div>
                </v-col>
              </v-card>
            </v-flex>
            <v-flex xs10 sm6 md4>
              <v-card class="card-operation__container z-3 noshadow">
                <v-col cols="12" class="wrapper-input-5 z-3">
                  <v-list-item color="bunker darken-5">
                    <v-list-item-content>
                      <v-list-item-title>Operacion</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" class="wrapper-input-5 z-3">
                  <div class="wrapper">
                    <div class="diana-input-data" data-input-type="switch">
                      <v-card-actions class="nopadding nobordercolor">
                        <v-switch v-model="toDepositWithdraw" :disabled="isDepositWithdraw"
                          class="mt-0 nobordercolor nopadding noborder" color="info" hide-details
                          label="Deposito/Retiro">
                        </v-switch>
                      </v-card-actions>
                    </div>
                  </div>
                </v-col>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row wrap pa-3 justify-center class="card-operation">
            <v-flex xs10 sm6 md4 v-for="card in cards" :key="card.title">
              <v-card class="card-operations__container z-3 noshadow">
                <v-col cols="12" class="wrapper-input-5 z-3" color="bunker darken-5">
                  <v-list-item v-if="card.id == 1">
                    <v-list-item-content>
                      <v-list-item-title :class="toDepositWithdraw ? 'text--ember' : 'text--diana'">{{ card.title }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="card.id == 2">
                    <v-list-item-content>
                      <v-list-item-title :class="!toDepositWithdraw ? 'text--ember' : 'text--diana'">{{ card.title }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" class="wrapper-input-5 z-3" v-if="card.id == 1">
                  <div class="wrapper">
                    <div class="diana-input-data">
                      <v-text-field v-model="cantidadDeposito" id="" class="diana-input di-deposito" solo dense required
                        focus :disabled="toDepositWithdraw" :loading="isDepositWithdraw" value="cantidad" type="number"
                        prepend-icon="mdi-clipboard-account" @keydown="keyEvent($event)">
                      </v-text-field>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" class="wrapper-input-5 z-3" v-if="card.id == 2">
                  <div class="wrapper">
                    <div class="diana-input-data">
                      <v-text-field v-model="cantidadRetiro" id="" class="diana-input di-retiro" solo dense focus
                        :disabled="!toDepositWithdraw" :loading="isDepositWithdraw" required value="cantidad"
                        type="number" prepend-icon="mdi-card-account-details-outline">
                      </v-text-field>
                    </div>
                  </div>
                </v-col>

              </v-card>
            </v-flex>
          </v-layout>
          <v-card class="disflex noshadow">
            <v-btn color="primary" class="w-200 " @click="alta()">
              <div v-if="toDepositWithdraw">
                Retirar
              </div>
              <div v-else>
                Depositar
              </div>
            </v-btn>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import srvToasted from "@/services/srv_toasted.js";

export default {
  name: "",
  props: {},
  components: {
  },
  data: () => ({
    cards: [
      { id: 1, title: "Deposito", content: "" },
      { id: 2, title: "Retiro", content: "" },
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
    txnResponse: {},
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
    clienteAhorro: {
      Saldo_Actual: 0.00,
      Numero_Cuenta: ''
    },
    activateBit: true,
    /** */
    contacto: null,
    contactoRfc: null,
    contactoTel: null,
    contactoFechaCracion: "",
    contactoFechaPago: "",
    contactoFechaVencimiento: "",
    matchFromGuide: {},
    balance: {},
    toDepositWithdraw: false,
    isDepositWithdraw: false,
    inputDisabled: 0,
    cantidadDeposito: 0.00,
    cantidadRetiro: 0.00,
    cantidad: 0.00,
    operacion: 0
  }),
  computed: {
  },
  watch: {
    windowSize() { },
    toDepositWithdraw(value) {
      console.log('---- toDepositWithdraw: ' + value);
    },
    isDepositWithdraw(value) {
      console.log("---- isDepositWithdraw: " + value);
      if (value) {
        setTimeout(() => (this.isDepositWithdraw = false), 3000);
      }
    },
  },
  /** Hooks */
  beforeCreate() { },
  created() { },
  beforeMount() { },
  async mounted() {
    this.onResize();
    try {
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
    } catch (error) {
      console.log('dianaprj@: ' + error);
    }
  },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    keyEvent() {
      // console.log('Key pressed:', event);
      // console.log(this.contacto);
      this.clienteCount = uuidv4();
      // console.log(this.clienteCount);
    },
    alta() {
      /**
       * documento: 52 cierre, 53 apertura, 54 deposito, 55 retiro
       * status: 47 borrador, 48 por cobrar, 49 cobrado, 50 cancelada
       * tipo de cuenta: 36 credito, 37 ahorro
       * *****************************************************************
       * saving_id, tipo_cuenta, apertura, numero_cuenta, documento_id, cantidad, total
       *  x           37          x           x             54           x          x
       * 
       */
      if (this.toDepositWithdraw) {
        this.operacion = (this.savingTarget.Total) -= (this.cantidadRetiro)
        fetch(this.$store.getters['postEpTranasctionSaving'], {
          method: 'POST',
          body: JSON.stringify({
            Saving_Id: 1,
            Tipo_Cuenta: 37,
            Apertura: this.savingTarget.Apertura,
            Numero_Cuenta: this.savingTarget.Numero_Cuenta,
            Documento_Id: this.toDepositWithdraw ? 55 : 54,
            Cantidad: parseFloat(this.cantidadRetiro),
            Total: this.operacion
          }),
          headers: { 'Content-type': "application/json; charset=UTF-8" }
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            this.txnResponse = data.Data
          });

      } else {
        fetch(this.$store.getters['postEpTranasctionSaving'], {
          method: 'POST',
          body: JSON.stringify({
            Saving_Id: 1,
            Tipo_Cuenta: 37,
            Apertura: this.savingTarget.Apertura,
            Numero_Cuenta: this.savingTarget.Numero_Cuenta,
            Documento_Id: this.toDepositWithdraw ? 55 : 54,
            Cantidad: parseFloat(this.cantidadDeposito),
            Total: parseFloat(this.cantidadDeposito) + parseFloat(this.savingTarget.Total)
          }),
          headers: { 'Content-type': "application/json; charset=UTF-8" }
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            this.txnResponse = data.Data
          });

      }


      this.contacto = '';
      this.clienteCount = '';
      srvToasted("Operacion " + (this.toDepositWithdraw ? "Retiro" : "Deposito"), this.toasted.CUSTOM, "mdi mdi-card-bulleted");
    },
    reloadTheClientData() {
      this.$refs.form.reset();
      // this.matchClient = this.$store.state.matchClient;
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
