<template>
    <v-row class="mt-12 mx-4">
        <v-col>
            <v-card-title class="justify-center">Historial</v-card-title>
            <TableHistorySaving />
            <TableHistoryCredit />
        </v-col>
    </v-row>
</template>

<script>
// import srvToasted from "@/services/srv_toasted.js";

export default {
    name: "History",
    metaInfo: {
        title: "Historial",
    },
    props: {},
    components: {
        TableHistorySaving: () => import('@/components/tables/TableHistorySaving.vue'),
        TableHistoryCredit: () => import('@/components/tables/TableHistoryCredit.vue')
    },
    data: () => ({
        balance: [], toasted: {
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
    async mounted() {
        // try {
        //     srvToasted("Historial", this.toasted.SUCCESS, "mdi mdi-check");
        // } catch (error) {
        //     console.log('dianaprj@: ' + error);
        // }
    },
    beforeUpdate() { },
    updated() { },
    beforeDestroy() { },
    destroyed() { },
    methods: {},

    // end Hooks
};
</script>

