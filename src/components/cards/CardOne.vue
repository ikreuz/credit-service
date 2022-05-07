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
                        @keydown="keyEvent($event)">
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
      console.log(this.clienteCount);
    },
    alta() {

      srvToasted("Test", this.toasted.CUSTOM, "mdi mdi-alert-box-outline");
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
