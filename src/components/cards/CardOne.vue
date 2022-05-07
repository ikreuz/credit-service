<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm12 tag="div" id="card-section-c" v-resize="onResize">
        <!-- {{ windowSize }} -->
        <v-card id="layout-invoice-c-si" class="stripe stripe--article">
          <v-card-text>Dar de alta a un cliente</v-card-text>
          <v-layout row wrap pa-3 justify-center class="card-invoice">
            <v-flex v-for="card in cards" :key="card.title">
              <v-card xs4 sm4 md4 class="card-invoice__container z-3 noshadow">
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
                    <div class="mpm-input-data">
                      <v-text-field v-model="contacto" id="" class="mpm-input" ref="contacto" solo dense label=""
                        required value="contacto" type="text" prepend-icon="mdi-clipboard-account"
                        @keyup="keyEvent($event)">
                      </v-text-field>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" class="wrapper-input-5 z-3" v-if="card.id == 2">
                  <div class="wrapper">
                    <div class="mpm-input-data">
                      <v-text-field v-model="clienteCount" id="" class="mpm-input" ref="clienteCount" solo dense
                        label="" required value="clienteCount" type="text"
                        prepend-icon="mdi-card-account-details-outline">
                      </v-text-field>
                    </div>
                  </div>
                </v-col>
              </v-card>
            </v-flex>
          </v-layout>
          <v-btn color="primary" class="w-full " @click="alta">Dar de alta</v-btn>
          <!-- <v-dialog v-model="dialog" max-width="290">
            <v-card>
              <v-card-title class="text-h5">
                Nuevo cliente
              </v-card-title>

              <v-card-text>
                Agregar el siguiente cliente al sistema
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" text @click="dialog = false">
                  Cancelar
                </v-btn>

                <v-btn color="green darken-1" text @click="dialog = false" click.stop="save">
                  Continuar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog> -->
        </v-card>
      </v-flex>
    </v-layout>
    <!-- <DialogClient /> -->

  </v-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
// import srvToasted from "@/services/srv_toasted.js";
import {srvAxiosInsert} from "@/services/srv_axios";

export default {
  name: "",
  props: {},
  components: {
    // DialogClient: () => import('@/components/dialog/DialogClient.vue')

  },
  data: () => ({
    dialog: false,
    cards: [
      { id: 1, title: "Nombre", content: "" },
      { id: 2, title: "ID", content: "" },

    ],
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
      "c_Credito": false,
      "c_Ahorro": false,
      "fh_Registro": "2022-05-07T07:20:14.880Z",
      "fh_Modificacion": "2022-05-07T07:20:14.880Z",
      "fh_Autorizacion": "2022-05-07T07:20:14.880Z",
      "usr_Registra_Id": 10,
      "usr_Modifica_Id": 10,
      "usr_Autoriza_Id": 10
    }
  }),
  computed: {
    // dialogClient: {
    //   get() {
    //     return this.$store.getters["getDialogClient"];
    //   },
    //   set(params) {
    //     this.$store.dispatch("axnDialogClient", params);
    //   },
    // },
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
    this.matchFromGuide = this.$store.state.matchUser;
    this.matchFromInvoice = this.$store.state.profile;
    this.contacto = this.matchFromInvoice.cliente;
    this.contactoTel = this.matchFromInvoice.cliente_tel;
    this.contactoRfc = this.matchFromInvoice.cliente_rfc;
    this.contactoFechaCracion = this.matchFromInvoice.creacion;
    this.contactoFechaVencimiento = this.matchFromInvoice.vencimiento;
    this.contactoFechaPago = this.matchFromInvoice.pago;
    console.log(
      "__[view] matchFromGuide: " + JSON.stringify(this.matchFromGuide)
    );
    console.log(
      "__[view] matchFromInvoice: " + JSON.stringify(this.matchFromInvoice)
    );
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
      let arr = [];
      arr = this.contacto.split(" ");
      console.log(arr[0]);
      console.log(arr[1]);
      console.log(this.clienteCount);
      this.addCustomer.nombre = arr[0];
      this.addCustomer.apellidos = arr[1];

    },
    async alta() {
      let json = {
        "cliente_Id": 0,
        "user_Access_Id": 0,
        "sucursal_Id": 1,
        "nombre": this.addCustomer.nombre,
        "apellidos": this.addCustomer.apellidos,
        "correo": "string",
        "tel_1": "string",
        "c_Credito": false,
        "c_Ahorro": false,
        "fh_Registro": "2022-05-07T10:18:38.373Z",
        "fh_Modificacion": "2022-05-07T10:18:38.373Z",
        "fh_Autorizacion": "2022-05-07T10:18:38.373Z",
        "usr_Registra_Id": 0,
        "usr_Modifica_Id": 0,
        "usr_Autoriza_Id": 0
      }
      this.balance = await srvAxiosInsert("http://localhost:5000/api/Customers/insert", json);
      this.txnItems = this.balance.Data
      console.log(this.txnItems);
    },
    async save() {

    }
  },
  /** end Hooks */
};
</script>

<style lang="scss" scoped>
#layout-invoice-c-si {
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1) !important;
}
</style>
