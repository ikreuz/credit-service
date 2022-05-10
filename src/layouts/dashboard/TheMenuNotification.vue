<template>
  <v-menu
    nudge-top="-3"
    offset-y
    origin="center center"
    transition="scroll-y-transition"
    :close-on-content-click="false"
    :nudge-width="300"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        dark
        color="di"
        v-bind="attrs"
        v-on="on"
        rounded
        elevation="0"
        class="
          diana-btn diana-border-top-radius diana-border-bottom-radius
          diana-btn__notification
        "
        @click.prevent="mastheadNotifications"
        ><i class="mdi mdi-bell"></i
      ></v-btn>
    </template>
    <v-card>
      <v-list class="diana-toolbar-notif__list">
        <v-list-item
          class="diana-toolbar-notif__list-item diana-toolbar-notif__header"
        >
          <v-list-item-content>
            <v-list-item-title class="diana-toolbar-notif__title"
              >Notificaciones</v-list-item-title
            >
          </v-list-item-content>

          <v-list-item-action class="diana-toolbar-notif__list-item-action">
            <v-btn icon color="di" to="/setting">
              <v-icon class="diana-toolbar-notif__icon">mdi-cog</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-list class="diana-toolbar-notif__list">
        <v-list-item
          class="diana-toolbar-notif__list-item diana-toolbar-notif__body"
        >
          <v-list-item-title
            ><v-icon color="di" class="diana-toolbar-notif__icon mx-4"
              >mdi-bell</v-icon
            >Notificaciones</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true,
      itemsMenuNotification: [
        { title: "Notificacion 1", icon: "mdi-bell" },
        { title: "Notificacion 2", icon: "mdi-bell" },
        { title: "Notificacion 3", icon: "mdi-bell" },
      ],
    };
  },
  methods: {
    mastheadNotifications(ev) {
      let button = document.querySelector(".diana-btn__notification");
      console.log(button);
      console.log(ev);
    },
  },
};
</script>
