<template>
  <v-row class="mt-12 mx-4">
    <v-col>
      <v-card-title class="justify-center">Alta de clientes</v-card-title>

      <CardRegistrationClients />
      <TableHistoryClients />
    </v-col>

  </v-row>
</template>

<script>
import srvToasted from "@/services/srv_toasted.js";

export default {
  name: "Home",
  metaInfo: {
    title: "Alta de Clientes",
  },
  props: {},
  components: {
    CardRegistrationClients: () => import('@/components/cards/CardRegistrationClients.vue'),
    TableHistoryClients: () => import('@/components/tables/TableHistoryClients.vue'),
  },
  data: () => ({
    clients: [], toasted: {
      CUSTOM: "custom",
      DEFAULT: "default",
      INFO: "info",
      ERROR: "error",
      SUCCESS: "success",
      WARNING: "warning",
    },
  }),
  computed: {

  },
  watch: {},
  // Hooks
  beforeCreate() { },
  created() { },
  beforeMount() { },
  async mounted() {
    try {
      srvToasted("Usuario permitido", this.toasted.SUCCESS, "mdi mdi-account-check-outline");
    } catch (error) {
      console.log('dianaprj@: ' + error);
    }
  },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
  methods: {},

  // end Hooks
};
</script>

