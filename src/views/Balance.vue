<template>
    <v-row class="mt-12 mx-4">
        <v-col>
            <v-subheader>Operaciones</v-subheader>
            <CardThree />
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
        CardThree: () => import('@/components/cards/CardThree.vue')
    },
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
