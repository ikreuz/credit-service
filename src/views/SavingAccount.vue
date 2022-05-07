<template>
    <v-row class="mt-12 mx-4">
        <v-col>
            <v-subheader>Apertura de cuenta de ahorro</v-subheader>
            <CardTwo />
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
    components: { CardTwo: () => import('@/components/cards/CardTwo.vue') },
    data: () => ({}),
    computed: {},
    watch: {},
    // Hooks
    beforeCreate() { },
    created() { },
    beforeMount() { },
    mounted() { },
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
