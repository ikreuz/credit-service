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
                      <v-text-field v-model="clienteAhorro.Numero_Cuenta" id="" class="diana-input" ref="" solo dense
                        label="" required value="" type="text" prepend-icon="mdi-account">
                      </v-text-field>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" class="wrapper-input-5 z-3" v-if="card.id == 3">
                  <div class="wrapper">
                    <div class="diana-input-data" v-if="card.id == 3">
                      <v-text-field v-model="clienteAhorro.Saldo_Actual" id="" class="diana-input" ref="" solo dense
                        label="" required value="0.00" type="number" prepend-icon="mdi-card-account-details-outline">
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
    async alta() {
      fetch(this.$store.getters['postEpTranasction'], {
        method: 'POST',
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
          console.log('post ' + data)
          // this.txn = data.Data
        });
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

        console.log('asdf ' + this.txn.Cliente_Id);
      }
    },
  },
  /** end Hooks */
};
</script>
