<template>
  <v-container class="page-not-found">
    <div class="fof">
      <h1>404 - Pagina no encontrada.</h1>
      <p>Esta pagina no existe mas o ha sido movida a otra locacion.</p>
      <v-btn text to="/" color="primary">
        <v-icon color="amber darken-3">mdi-keyboard-return</v-icon>
        <span class="ml-2">Regresar a Principal</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "PageNotFound",
  metaInfo: {
    title: "Error 400",
  },
  props: {},
  components: {},
  data: () => ({}),
  computed: {},
  watch: {},
  // Hooks
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {},
  // end Hooks
};
</script>

<style lang="scss" scoped>
.page-not-found {
  font-family: "Lato", sans-serif;
  color: #888;
  display: table;
  width: 100%;
  height: 100vh;
  text-align: center;
}
.fof {
  display: table-cell;
  vertical-align: middle;
  p {
    margin: 12px;
  }
}
.fof h1 {
  font-size: 50px;
  display: inline-block;
  padding-right: 12px;
  padding-bottom: 12px;
  animation: type 0.5s alternate infinite;
}
@keyframes type {
  from {
    box-shadow: inset -3px 0px 0px #888;
  }
  to {
    box-shadow: inset -3px 0px 0px transparent;
  }
}
</style>
