<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm12 tag="div" id="card-section-c" v-resize="onResize">
        <!-- {{ windowSize }} -->
        <v-card id="layout-invoice-c-si" class="stripe stripe--article">
          <v-card-text>Cuenta de ahorro</v-card-text>

          <v-layout row wrap pa-3 justify-center class="card-invoice">
            <v-flex v-for="card in cards" :key="card.title">
              <v-card class="card-invoice__container z-3 noshadow">
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
                </v-col>
                <v-col cols="12" class="wrapper-input-5 z-3" v-if="card.id == 1">
                  <div class="wrapper">
                    <div class="mpm-input-data" v-if="card.id == 1">
                      <v-select v-model="clienteModel" :items="clienteEntries" item-text="Nombre"
                        item-value="Cliente_Id" color="walkure" solo class="mpm-input skrull" @change="selectClient"
                        label="Select" :hint="`${clienteEntries.Cliente_Id}, ${clienteEntries.Nombre}`">
                      </v-select>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" class="wrapper-input-5 z-3" v-if="card.id == 2">
                  <div class="wrapper">
                    <div class="mpm-input-data" v-if="card.id == 2">
                      <v-text-field v-model="clienteAhorro.Numero_Cuenta" id="" class="mpm-input" ref="" solo dense
                        label="" required value="" type="text" prepend-icon="mdi-account">
                      </v-text-field>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" class="wrapper-input-5 z-3" v-if="card.id == 3">
                  <div class="wrapper">
                    <div class="mpm-input-data" v-if="card.id == 3">
                      <v-text-field v-model="clienteCount" id="" class="mpm-input" ref="" solo dense label="" required
                        value="" type="text" prepend-icon="mdi-card-account-details-outline">
                      </v-text-field>
                    </div>
                  </div>
                </v-col>
              </v-card>
            </v-flex>
          </v-layout>
          <v-btn color="primary" class="w-full " click="alta">Dar de alta</v-btn>
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
      { id: 1, title: "Cliente", content: "" },
      { id: 2, title: "Numero cuenta", content: "" },
      { id: 3, title: "Saldo actual", content: "" },

    ],
    txnItems: [],
    txn: [],
    selectTxn: 0,
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
    clienteAhorro: {}
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
        console.log(data)
        this.clienteEntries = data.Data
      });
    fetch(this.$store.getters['getEpTransactionSaving'])
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.txnItems = data.Data
      });
    fetch(this.$store.getters['getEpTransaction'])
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.txn = data.Data
      });
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
    alta() {
      srvToasted("Test", this.toasted.CUSTOM, "mdi mdi-alert-box-outline");
    },
    selectClient(value) {
      if (value != null) {
        console.log("__[::] selectClient: " + typeof (this.clienteEntries));
        this.$store.dispatch("axnCustomerProfile", value);
      }
      for (var i = 0; i < this.clienteEntries.length; i++) {
        if (value == this.clienteEntries[i].Cliente_Id) {
          this.clienteAhorro = this.clienteEntries[i]
        }
        if (this.txn.Cliente_Id == this.clienteEntries[i].Cliente_Id) {
          this.txn.Txn_id = this.clienteEntries[i]
        }

      }
    },
  },
  /** end Hooks */
};
</script>

<style lang="scss" scoped>
#layout-invoice-c-si {
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1) !important;
}
</style>
