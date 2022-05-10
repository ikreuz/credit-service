<template>
    <v-row class="mt-12 mx-4">
        <v-col>
            <v-card-title class="justify-center">Operaciones</v-card-title>
            <CardRegistrationOperation />
            <TableTransactionOperation />
        </v-col>
    </v-row>
</template>

<script>
import srvToasted from "@/services/srv_toasted.js";

export default {
    name: "Balance",
    metaInfo: {
        title: "Deposito/Retiro",
    },
    props: {},
    components: {
        CardRegistrationOperation: () => import('@/components/cards/CardRegistrationOperation.vue'),
        TableTransactionOperation: () => import('@/components/tables/TableTransactionOperation.vue')
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
        try {
            srvToasted("Deposito/Retiro", this.toasted.SUCCESS, "mdi mdi-check");
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
