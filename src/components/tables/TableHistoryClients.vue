<template>
  <v-container grid-list-xl text-xs-center>
    <v-card class="mt-10 shadow-smallest">
      <v-layout row wrap>
        <v-flex xs12 sm12 tag="div" id="card-section-x" v-resize="onResize">
          <!-- {{ windowSize }} -->
          <v-data-table dense :headers="headers" :items="clientItems" class="diana-data-table pa-3"
            loading-text="Buscando... Por favor espere" :loading="loading">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Clientes</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px"> </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px"> </v-dialog>
                <v-btn color="primary" dark class="mb-2" @click="updateData()"><v-icon>mdi-reload</v-icon></v-btn>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <div class="relative d-flex justify-end">
                <v-menu offset-x elevation="0" left nudge-top="2" nudge-right="-5" max-width="300"
                  transition="slide-x-transition" :close-on-content-click="false" class="menu-action-control">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" tile x-small elevation="0"  class="
                        actions-control actions-control__client
                        diana-border-bottom
                        diana-border-top
                        diana-border-right
                        diana-border-left
                      " data-a-id="actions-control">
                      <v-icon color="primary">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list nav flat dense router class="menu-action-control-list overflow-hidden noshadow">
                    <v-list-item-group class="menu-action-control-list-group">
                      <v-list-item link @click.prevent="viewItem(item)" class="menu-action-control-list-item">
                        <v-btn small text color="primary" width="30">
                          <v-list-item-icon class="menu-action-control-list-item-icon">
                            <v-icon small class="action-icon">mdi-eye</v-icon>
                          </v-list-item-icon>
                        </v-btn>
                      </v-list-item>

                      <v-list-item link class="menu-action-control-list-item" @click.stop="editItem(item)"
                        @click.prevent="actDetailUser(item)">
                        <v-btn small text color="primary" width="30">
                          <v-list-item-icon class="menu-action-control-list-item-icon">
                            <v-icon small class="action-icon">mdi-pencil</v-icon>
                          </v-list-item-icon>
                        </v-btn>
                      </v-list-item>

                      <v-list-item link class="menu-action-control-list-item" @click.stop="lockItem(item)">
                        <v-btn small text color="primary" width="30">
                          <v-list-item-icon class="menu-action-control-list-item-icon">
                            <v-icon small class="action-icon">mdi-lock-open-variant</v-icon>
                          </v-list-item-icon>
                        </v-btn>
                      </v-list-item>

                      <v-list-item link class="menu-action-control-list-item" @click.stop="cashItem(item)">
                        <v-btn small text color="primary" width="30">
                          <v-list-item-icon class="menu-action-control-list-item-icon">
                            <v-icon smallclass="action-icon">mdi-currency-usd</v-icon>
                          </v-list-item-icon>
                        </v-btn>
                      </v-list-item>

                      <v-list-item link class="menu-action-control-list-item" @click.stop="deleteItem(item)">
                        <v-btn small text color="primary" width="30">
                          <v-list-item-icon class="menu-action-control-list-item-icon">
                            <v-icon small class="action-icon">mdi-trash-can</v-icon>
                          </v-list-item-icon>
                        </v-btn>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-menu>
              </div>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">  <v-icon>mdi-backup-restore</v-icon> </v-btn>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>

export default {
  components: {},
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Id", align: "center", value: "Numero_Cuenta", width: "30px" },
      { text: "Nombre", align: "center", value: "Nombre" },
      { text: "Apellidos", align: "center", value: "Apellidos" },
      { text: "Con Credito", align: "center", value: "C_Credito" },
      { text: "Con Ahorro", align: "center", value: "C_Ahorro" },
      // { text: "Email", align: "center", value: "Correo" },
      { text: "Acciones", align: "center", value: "actions", sortable: false },
    ],
    loading: false,
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
  beforeCreate() { },
  created() {
    this.initialize();
  },
  beforeMount() { },
  mounted() {
    this.onResize();
  },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
  methods: {
    async initialize() {

      fetch(this.$store.getters['getEpCustomers'])
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.clientItems = data.Data
        });
    },
    editItem() {
    },
    actDetailUser() { },

    deleteItem() {
    },

    deleteItemConfirm() {
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
        Object.assign(this.clientItems[this.editedIndex], this.editedItem);
      } else {
        this.clientItems.push(this.editedItem);
      }
      this.close();
    },
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    updateData() {
      fetch(this.$store.getters['getEpCustomers'])
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.clientItems = data.Data
        });
    }
  },

  // end Hooks
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common/variables.scss";
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

.diana-data-table {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
