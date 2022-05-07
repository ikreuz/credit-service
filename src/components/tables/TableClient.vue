<template>
  <v-container grid-list-xl text-xs-center>
    <v-card id="layout-client-si mt-10">
      <v-layout row wrap>
        <v-flex xs12 sm12 tag="div" id="card-section-x" v-resize="onResize">
          <!-- {{ windowSize }} -->
          <v-data-table
            :headers="headers"
            :items="clientItems"
            class="mpm-data-table pa-3"
            loading="!loading"
            loading-text="Buscando... Por favor espere"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Clientes</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px"> </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px"> </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <div class="relative d-flex justify-end">
                <v-menu
                  offset-x
                  elevation="0"
                  left
                  nudge-top="2"
                  nudge-right="-5"
                  max-width="300"
                  transition="slide-x-transition"
                  :close-on-content-click="false"
                  class="menu-action-control"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      tile
                      x-small
                      elevation="0"
                      class="
                        actions-control actions-control__client
                        mpm-border-bottom
                        mpm-border-top
                        mpm-border-right
                        mpm-border-left
                      "
                      data-a-id="actions-control"
                    >
                      <v-icon color="ember">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list
                    nav
                    flat
                    dense
                    router
                    class="menu-action-control-list overflow-hidden noshadow"
                  >
                    <v-list-item-group class="menu-action-control-list-group">
                      <v-list-item
                        link
                        @click.prevent="viewItem(item)"
                        class="menu-action-control-list-item"
                      >
                        <v-btn small text color="walkure" width="30">
                          <v-list-item-icon
                            class="menu-action-control-list-item-icon"
                          >
                            <v-icon small class="action-icon">mdi-eye</v-icon>
                          </v-list-item-icon>
                        </v-btn>
                      </v-list-item>

                      <v-list-item
                        link
                        class="menu-action-control-list-item"
                        @click.stop="editItem(item)"
                        @click.prevent="actDetailUser(item)"
                      >
                        <v-btn small text color="walkure" width="30">
                          <v-list-item-icon
                            class="menu-action-control-list-item-icon"
                          >
                            <v-icon small class="action-icon"
                              >mdi-pencil</v-icon
                            >
                          </v-list-item-icon>
                        </v-btn>
                      </v-list-item>

                      <v-list-item
                        link
                        class="menu-action-control-list-item"
                        @click.stop="lockItem(item)"
                      >
                        <v-btn small text color="walkure" width="30">
                          <v-list-item-icon
                            class="menu-action-control-list-item-icon"
                          >
                            <v-icon small class="action-icon"
                              >mdi-lock-open-variant</v-icon
                            >
                          </v-list-item-icon>
                        </v-btn>
                      </v-list-item>

                      <v-list-item
                        link
                        class="menu-action-control-list-item"
                        @click.stop="cashItem(item)"
                      >
                        <v-btn small text color="walkure" width="30">
                          <v-list-item-icon
                            class="menu-action-control-list-item-icon"
                          >
                            <v-icon smallclass="action-icon"
                              >mdi-currency-usd</v-icon
                            >
                          </v-list-item-icon>
                        </v-btn>
                      </v-list-item>

                      <v-list-item
                        link
                        class="menu-action-control-list-item"
                        @click.stop="deleteItem(item)"
                      >
                        <v-btn small text color="walkure" width="30">
                          <v-list-item-icon
                            class="menu-action-control-list-item-icon"
                          >
                            <v-icon small class="action-icon"
                              >mdi-trash-can</v-icon
                            >
                          </v-list-item-icon>
                        </v-btn>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-menu>
              </div>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
// import jsCookie from "js-cookie";

export default {
  components: {},
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Id", align: "center", value: "id" },
      { text: "Cliente", align: "center", value: "cliente" },
      { text: "RFC", align: "center", value: "rfc" },
      { text: "Nombre Comercial", align: "center", value: "nombre_comercial" },
      { text: "Razon Social", align: "center", value: "razon_social" },
      { text: "Email", align: "center", value: "email" },
      { text: "C. Convenio", align: "center", value: "c_convenio" },
      { text: "T. Cliente", align: "center", value: "tipo" },
      { text: "Acciones", align: "center", value: "actions", sortable: false },
    ],
    loading: false,
    // guidesItems: [],
    // guidesTotal: 0,
    clientItems: [],
    staffTotal: 0,
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    windowSize: {
      x: 0,
      y: 0,
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  // Hooks
  beforeCreate() {},
  created() {
    this.initialize();
  },
  beforeMount() {},
  mounted() {
    this.onResize();
    console.log(
      "__[: tableInit/mounted :this.clientItems " +
        JSON.stringify(this.clientItems)
    );
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    handleStories(ev) {
      // this.$router.push({ path: "/reception" });
      switch (ev.currentTarget.getAttribute("data-a-id")) {
        case "card-reception":
          console.log("__[: :: ", ev.currentTarget.getAttribute("data-a-id"));
          // this.$router.push({ path: "/reception" });
          break;
        case "card-paying":
          console.log("__[: :: ", ev.currentTarget.getAttribute("data-a-id"));
          // this.$router.push({ path: "/paying" });
          break;
        case "card-catalog":
          console.log("__[: :: ", ev.currentTarget.getAttribute("data-a-id"));
          // this.$router.push({ path: "/catalog" });
          break;
        case "card-cloud":
          console.log("__[: :: ", ev.currentTarget.getAttribute("data-a-id"));
          // this.$router.push({ path: "/cloud" });
          break;
        case "card-record":
          console.log("__[: :: ", ev.currentTarget.getAttribute("data-a-id"));
          // this.$router.push({ path: "/record" });
          break;
        case "card-cash":
          console.log("__[: :: ", ev.currentTarget.getAttribute("data-a-id"));
          // this.$router.push({ path: "/cash" });
          break;

        default:
          break;
      }
    },
    async initialize() {
      this.clientItems = this.$store.state.ep.apiClientes.entries;
      /**
       * Codigo que requiere de una api datos, y para acceder se necesita autorizacion Bearer TOKEN
       * toma de una cookie el token, lo asigna a la configuracion de $axios, mediante el metodo $get
       * solicita con un encabezado a la api, esta responde y son asignados los datos retornados a
       * instancias locales para su utilizacionF
       */
      //   /** obtiene de la cookie el mpm_secure siendo el token que retorna la api JWTLogin */
      //   /** es asignada a una  constante */
      // const accessToken = jsCookie.get("mpm_secure");
      //   /** llamado de $axios del paquete VueAxios, similar a axios solo que enfocado a vue */
      //   /** la siguiente sintaxis hace uso del encabezado de autorizacion antes de llamar a una api con jwt */
      //   /** configuracion antes de llamar */
      //   this.$axios.interceptors.request.use(
      //     (config) => {
      //       config.headers.Authorization = `Bearer ${accessToken}`;
      //       return config;
      //     },
      //     (error) => {
      //       return Promise.reject(error);
      //     }
      //   );
      //   /** se establece el tipo de metod y contenido */
      //   this.$axios.setHeader("Content-Type", "application/json", ["get"]);
      //   /** se llama con el metodo get, teniendo como parametro el endpoint jalandolo de la tienda/store directamente */
      //   this.$axios
      //     .$get(this.$store.getters["endpoint/getEpCoreGuide"], {
      //       headers: {
      //         Authorization: `token ${accessToken}`,
      //       },
      //     })
      //     /** cacha la respuesta y asigna a constantes y a su vez a instancias locales*/
      //     /** en funcion del resultado el cual se espera items y total son asignados los items son utilizados en la dataTable */
      //     .then((res) => {
      //       const { Total, Items } = res;
      //       this.guidesItems = Items;
      //       this.guidesTotal = Total;
      //       this.loading = true;
      //       console.log(
      //         "__[ setionInit/initialize :guidesTotal " + JSON.stringify(this.guidesTotal)
      //       );
      //     })
      //     /** cacha los errores, se implementa la notificacion $toast tipo error */
      //     .catch((err) => {
      //       this.$toast.error("Error: API Core Guide " + err, {
      //         position: "top-right",
      //         timeout: 3000,
      //         closeOnClick: true,
      //         pauseOnFocusLoss: true,
      //         pauseOnHover: true,
      //         draggable: true,
      //         draggablePercent: 0.6,
      //         showCloseButtonOnHover: false,
      //         hideProgressBar: false,
      //         closeButton: "button",
      //         icon: {
      //           iconClass: "mdi mdi-backspace-reverse-outline", // Optional
      //           iconChildren: "", // Optional
      //           iconTag: "span", // Optional
      //         },
      //         rtl: false,
      //       });
      //     })
      //     /** */
      //     .finally(() => {});
    },
    editItem() {
      //   this.editedIndex = this.clientItems.indexOf(item);
      //   this.editedItem = Object.assign({}, item);
      //   this.dialog = true;
    },
    actDetailUser() {},

    deleteItem() {
      //   this.editedIndex = this.clientItems.indexOf(item);
      //   this.editedItem = Object.assign({}, item);
      //   this.dialogDelete = true;
    },

    deleteItemConfirm() {
      //   this.clientItems.splice(this.editedIndex, 1);
      //   this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        // Object.assign(this.desserts[this.editedIndex], this.editedItem);
        Object.assign(this.clientItems[this.editedIndex], this.editedItem);
      } else {
        this.clientItems.push(this.editedItem);
      }
      this.close();
    },
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
  },

  // end Hooks
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common/variables.scss";
#layout-client-si {
  box-shadow: var(--shadow-content-default) !important;
}
.actions-control {
  height: 30px !important;
  min-height: 30px !important;
  width: 30px !important;
  min-width: 30px !important;
  padding: 0 4px !important;
  border-radius: 4px;
  background-color: #ffff !important;
  margin: 2px 0;
  transition-duration: 200ms;
  transition: all 0.2s;
  z-index: 9;

  [class*="mdi"],
  [class^="mdi"] {
    font-size: 16px !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  &__client-hidden {
    top: 0;
    right: 0;
    height: 38px !important;
    min-height: 38px !important;
    width: 0;
    min-height: 0;
    position: absolute;
    color: #ffff;
    font-size: 13px;
    text-transform: capitalize;
    padding: 0 9px !important;
    margin: 2px 0;
    transform: translateX(-135px);
    z-index: 10;
    opacity: 0;
    visibility: hidden;

    [class*="mdi"],
    [class^="mdi"] {
      font-size: 16px !important;
      padding: 0 !important;
      margin: 0 !important;
    }
  }
}
.actions-control__client {
  &:hover {
    &:hover {
      [class*="mdi"],
      [class^="mdi"] {
        color: $colors__ui_primary !important;
      }
    }
  }
}

/** */

.menu-action-control .action-icon {
  font-size: 16px !important;
}

.menu-action-control-list {
  padding: 0 !important;
  margin: 0 !important;
  height: 30px;
  border-bottom: 1px solid #dfe6e6 !important;
  transition-duration: 200ms !important;
  transition: all 0.2s !important;
}
.menu-action-control .v-list-item--active .menu-action-control-list-item-icon {
  color: $colors__ui_primary !important;
}

.menu-action-control .v-list-item--active .menu-action-control-list-item-title {
  color: $colors__ui_primary !important;
}

.menu-action-control-list-group {
  height: 30px !important;
  min-height: 30px !important;
  display: flex;
}

.menu-action-control-list-item {
  padding: 0 !important;
  margin: 0 !important;
  height: 30px !important;
  min-height: 30px !important;
  padding: 0 4px !important;
  border-radius: 0 !important;
  background-color: #ffff !important;
  margin: 2px 0;
  transition-duration: 200ms;
  transition: all 0.2s;
  z-index: 201;
}
.menu-action-control-list-item::hover {
  color: $colors__ui_primary !important;
}
.menu-action-control::focus .action-icon,
.menu-action-control::hover .action-icon {
  color: $colors__ui_primary !important;
  [class*="mdi"],
  [class^="mdi"] {
    font-size: 18px !important;
    color: $colors__ui_primary !important;
  }
}

.menu-action-control-list-item-icon {
  height: 30px !important;
  min-height: 30px !important;
  width: 30px !important;
  min-width: 30px !important;
  margin: 0 0px 0 13px !important;
  transition-duration: 200ms !important;
  transition: all 0.2s !important;
}

.menu-action-control-list-item-title {
  font-weight: 600 !important;
  transition-duration: 200ms;
  transition: all 0.2s;
}

.menu-action-control-divider {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
  width: 100% !important;
  max-width: 100% !important;
}

.menu-action-control--width-0 {
  width: 122px !important;
}

.menu-action-control--width-1 {
  width: 303px !important;
}
.sd-border-1 {
  border: 1px solid rgba(0, 0, 0, 0.12) !important;
}
.mpm-data-table {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
