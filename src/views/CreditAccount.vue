<template>
  <v-row class="mt-12 mx-4">
    <v-col>
      <v-subheader>Apertura de cuenta de credito</v-subheader>
    </v-col>
  </v-row>
</template>

<script>
import srvToasted from "@/services/srv_toasted.js";

export default {
  name: "CreditAccount",
  metaInfo: {
    title: "Cuenta Credito",
  },
  props: {},
  components: {},
  data: () => ({
    toasted: {
      CUSTOM: "custom",
      DEFAULT: "default",
      INFO: "info",
      ERROR: "error",
      SUCCESS: "success",
      WARNING: "warning",
    },
  }),
  computed: {},
  watch: {},
  // Hooks
  beforeCreate() { },
  created() { },
  beforeMount() { },
  mounted() {
    try {
      srvToasted("Cuenta de Credito", this.toasted.SUCCESS, "mdi mdi-check");
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
