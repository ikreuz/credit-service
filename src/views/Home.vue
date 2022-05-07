<template>
  <v-row class="mt-12 mx-4">
    <v-col>
      <v-subheader>Home</v-subheader>
      <CardOne />
      <TableClient />
    </v-col>
  </v-row>
</template>

<script>
import srvAxios from "../services/srv_axios";
export default {
  name: "Home",
  metaInfo: {
    title: "Home",
  },
  props: {},
  components: {
    CardOne: () => import('@/components/cards/CardOne.vue'),
    TableClient: () => import('@/components/tables/TableClient.vue'),
  },
  data: () => ({ clients: [] }),
  computed: {},
  watch: {},
  // Hooks
  beforeCreate() { },
  created() { },
  beforeMount() { },
  async mounted() {
    this.clients = await srvAxios("http://localhost:5000/api/Customers/getall");
    console.log(this.clients);
  },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
  methods: {},

  // end Hooks
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common/variables.scss";
</style>
