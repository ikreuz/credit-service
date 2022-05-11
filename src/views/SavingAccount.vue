<template>
    <v-row class="mt-12 mx-4">
        <v-col>
            <v-card-title class="justify-center">Apertura de cuenta de ahorro</v-card-title>
            <CardRegistrationSaving />
            <TableHistorySaving />
        </v-col>
    </v-row>
</template>

<script>
// import srvToasted from "@/services/srv_toasted.js";

export default {
    name: "SavingAccount",
    metaInfo: {
        title: "Cuenta Ahorro",
    },
    props: {},
    components: {
        CardRegistrationSaving: () => import('@/components/cards/CardRegistrationSaving.vue'),
        TableHistorySaving: () => import('@/components/tables/TableHistorySaving.vue')
    },
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
        // try {
        //     srvToasted("Cuenta de Ahorro", this.toasted.SUCCESS, "mdi mdi-check");
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
