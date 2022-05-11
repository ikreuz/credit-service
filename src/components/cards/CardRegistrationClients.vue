<template>
  <v-container grid-list-xl text-xs-center class="pt-10">
    <v-layout row wrap>
      <v-flex xs12 sm12 tag="div" v-resize="onResize">
        <!-- {{ windowSize }} -->
        <v-card id="" class="stripe stripe--article shadow-smallest">

          <v-card-text>Dar de alta a un cliente</v-card-text>

          <v-layout row wrap pa-3 justify-center class="card-clients">
            <v-container fluid class="flex justify-center">
              <v-row>
                <v-col cols="12" class="disflex">
                  <v-checkbox color="info" v-model="checkboxConCredito" class="noborder mx-4 my-0"
                    :label="`Con Credito`">
                  </v-checkbox>
                  <v-checkbox color="info" v-model="checkboxConAhorro" class="noborder mx-4 my-0" :label="`Con Ahorro`">
                  </v-checkbox>
                </v-col>
              </v-row>
            </v-container>
            <v-flex xs10 sm6 md4 v-for="card in cards" :key="card.title">
              <v-card class="card-clients__container z-3 noshadow">


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
                </v-col>
                <v-col cols="12" class="wrapper-input-5 z-3" v-if="card.id == 1">
                  <div class="wrapper">
                    <div class="diana-input-data">
                      <v-text-field v-model="contacto" id="" class="diana-input" ref="contacto" solo dense label=""
                        required value="contacto" type="text" prepend-icon="mdi-clipboard-account"
                        @keyup="keyEvent($event)">
                      </v-text-field>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" class="wrapper-input-5 z-3" v-if="card.id == 2">
                  <div class="wrapper">
                    <div class="diana-input-data">
                      <v-text-field v-model="clienteCount" id="" class="diana-input" ref="clienteCount" solo dense
                        label="" required value="clienteCount" type="text"
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
              Dar de alta
            </v-btn>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import srvToasted from "@/services/srv_toasted.js";
// import { serviceAxiosDelete, serviceAxiosPost } from "@/services/srv_axios";

export default {
  name: "",
  props: {},
  components: {

  },
  data: () => ({
    dialog: false,
    cards: [
      { id: 1, title: "Nombre", content: "" },
      { id: 2, title: "ID", content: "" },
    ], 
    checkboxConCredito: true,
    checkboxConAhorro: false,
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
    contacto: null,
    contactoRfc: null,
    contactoTel: null,
    contactoFechaCracion: "",
    contactoFechaPago: "",
    contactoFechaVencimiento: "",
    matchFromGuide: {},
    txnItems: [], balance: [],
    addCustomer: {
      "cliente_Id": 10,
      "user_Access_Id": 10,
      "sucursal_Id": 10,
      "nombre": "",
      "apellidos": "",
      "correo": "",
      "tel_1": "",
      "c_Credito": true,
      "c_Ahorro": false,
      "fh_Registro": "2022-05-07T07:20:14.880Z",
      "fh_Modificacion": "2022-05-07T07:20:14.880Z",
      "fh_Autorizacion": "2022-05-07T07:20:14.880Z",
      "usr_Registra_Id": 10,
      "usr_Modifica_Id": 10,
      "usr_Autoriza_Id": 10
    },
    error: null,
    toasted: {
      CUSTOM: "custom",
      DEFAULT: "default",
      INFO: "info",
      ERROR: "error",
      SUCCESS: "success",
      WARNING: "warning",
    },
  }),
  computed: {
    updateTable: {
      get() {
        return this.$store.state.updateTable;
      },
      set(value) {
        this.$store.dispatch("axnUpdateTable", value)
      }
    }
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

      // console.log(arr[0]);
      // console.log(arr[1]);
      // console.log(this.clienteCount);


    },
    async alta() {
      let arr = [];
      arr = this.contacto.split(" ");
      this.addCustomer.nombre = arr[0];
      this.addCustomer.apellidos = arr[1];

      fetch(this.$store.getters['postEpCustomers'], {
        method: 'POST',
        body: JSON.stringify({
          Sucursal_Id: 1,
          Nombre: this.addCustomer.nombre,
          Apellidos: this.addCustomer.apellidos,
          Numero_Cuenta: this.clienteCount,
          Correo: this.addCustomer.nombre.toLowerCase() + '@credit.com',
          Tel_1: 12341234,
          C_Credito: this.checkboxConCredito,
          C_Ahorro: this.checkboxConAhorro,
          Fh_Registro: moment(),
          Fh_Autoirzacion: moment(),
          Usr_Registra_Id: 1,
          Usr_Modifica_Id: 0,
          Usr_Autoriza_Id: 0
        }),
        headers: { 'Content-type': "application/json; charset=UTF-8" }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.txn = data.Data
        });

      this.updateTable != this.updateTable
      srvToasted("Alta de cliente", this.toasted.SUCCESS, "mdi mdi-check");
    },
    async save() {
      // serviceAxiosDelete('', id)
    }
  },
  /** end Hooks */
};
</script>
