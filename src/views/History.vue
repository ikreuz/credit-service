<template>
    <v-row class="mt-12 mx-4">
        <v-col>
            <v-subheader>Historial</v-subheader>
            <TableInvoiceBreakdown />
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "About",
    metaInfo: {
        title: "About",
    },
    props: {},
    components: {
        TableInvoiceBreakdown: () => import('@/components/tables/TableInvoiceBreakdown.vue')
    },
    data: () => ({ balance: [] }),
    computed: {},
    watch: {},
    // Hooks
    beforeCreate() { },
    created() { },
    beforeMount() { },
    async mounted() {

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
