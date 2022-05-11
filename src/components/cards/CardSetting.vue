<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex xs12 sm12 tag="div" id="card-section-b" v-resize="onResize">
                <!-- {{ windowSize }} -->
                <v-card class="stripe stripe--article card-client-addr" @eventsender="handleEventSender"
                    :loading="isUpdating">
                    <template v-slot:progress>
                        <v-progress-linear absolute color="walkure" height="4" indeterminate></v-progress-linear>
                    </template>
                    <v-card-actions>
                        <v-switch v-model="autoUpdate" :disabled="isUpdating" class="mt-0" color="walkure" hide-details
                            label="Editable"></v-switch>
                        <v-spacer></v-spacer>
                        <v-btn :disabled="autoUpdate" :loading="isUpdating" color="walkure" depressed
                           >
                            <v-icon left> mdi-update </v-icon>
                            Actualizar ahora
                        </v-btn>
                        <v-btn disabled color="walkure" depressed @click="reloadTheClientData">
                            <v-icon>mdi-reload</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-divider></v-divider>
                    <v-layout row wrap pa-3 justify-center class="card-invoice" ref="form">
                        <v-flex>
                            <v-card class="card-invoice__container z-3 noshadow">
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <v-list-item color="bunker darken-5">
                                        <v-list-item-content>
                                            <v-list-item-title>Tipo tercero</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <div class="devmpm-wrapper">
                                        <div class="devmpm-input-data">
                                            <v-select v-model="tipoTerceroModelSelected" label="Seleccion .."
                                                :items="tipoTercero" item-text="concepto" item-value="concepto_id"
                                                color="walkure" solo class="devmpm-input skrull"></v-select>
                                        </div>
                                    </div>
                                </v-col>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card class="card-invoice__container z-3 noshadow">
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <v-list-item color="bunker darken-5">
                                        <v-list-item-content>
                                            <v-list-item-title>RFC</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <div class="devmpm-wrapper">
                                        <div id="devmpm-input-data-rfc-si" class="devmpm-input-data"
                                            data-devmpm-input-address="item-rfc">
                                            <v-text-field  id="profile-rfc-si"
                                                value="matchClient.rfc" class="devmpm-input" ref="" solo dense label=""
                                                persistent-hint type="text" :readonly="!autoUpdateRfc">
                                                <template v-slot:append-outer>
                                                    <v-slide-x-reverse-transition mode="out-in">
                                                        <v-icon :key="`icon-${autoUpdateRfc}`"
                                                            :color="!autoUpdateRfc ? 'walkure' : 'walkure'"
                                                            @click="autoUpdateRfc = !autoUpdateRfc"
                                                            @click.prevent="handlerItemClick" v-text="
                                                                !autoUpdateRfc
                                                                    ? 'mdi-check-outline'
                                                                    : 'mdi-circle-edit-outline'
                                                            ">
                                                        </v-icon>
                                                    </v-slide-x-reverse-transition>
                                                </template>
                                                <template v-slot:append>
                                                    <v-fade-transition leave-absolute>
                                                        <v-progress-circular v-if="itemRfcLoading" size="24"
                                                            color="info" indeterminate></v-progress-circular>
                                                    </v-fade-transition>
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </div>
                                </v-col>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card class="card-invoice__container z-3 noshadow">
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <v-list-item color="bunker darken-5">
                                        <v-list-item-content>
                                            <v-list-item-title>Nombre</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <div class="devmpm-wrapper">
                                        <div id="devmpm-input-data-nombre-si" class="devmpm-input-data"
                                            data-devmpm-input-address="item-nombre">
                                            <v-text-field value="matchClient.cliente"
                                                id="profile-cliente-si" class="devmpm-input" ref="" solo dense label=""
                                                persistent-hint type="text" data-item-address="item-nombre"
                                                :readonly="!autoUpdateNombre">
                                                <template v-slot:append-outer>
                                                    <v-slide-x-reverse-transition mode="out-in">
                                                        <v-icon :key="`icon-${autoUpdateNombre}`" :color="
                                                            !autoUpdateNombre ? 'walkure' : 'alizarin_500'
                                                        " @click="autoUpdateNombre = !autoUpdateNombre"
                                                            @click.prevent="handlerItemClick" v-text="
                                                                !autoUpdateNombre
                                                                    ? 'mdi-check-outline'
                                                                    : 'mdi-circle-edit-outline'
                                                            ">
                                                        </v-icon>
                                                    </v-slide-x-reverse-transition>
                                                </template>
                                                <template v-slot:append>
                                                    <v-fade-transition leave-absolute>
                                                        <v-progress-circular v-if="itemNombreLoading" size="24"
                                                            color="info" indeterminate></v-progress-circular>
                                                    </v-fade-transition>
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </div>
                                </v-col>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card class="card-invoice__container z-3 noshadow">
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <v-list-item color="bunker darken-5">
                                        <v-list-item-content>
                                            <v-list-item-title>Calle</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <div class="devmpm-wrapper">
                                        <div id="devmpm-input-data-calle-si" class="devmpm-input-data"
                                            data-devmpm-input-address="item-calle">
                                            <v-text-field 
                                                value="matchClient.domicilio.calle" id="" class="devmpm-input" ref=""
                                                solo dense label="" persistent-hint type="text"
                                                :readonly="!autoUpdateCalle">
                                                <template v-slot:append-outer>
                                                    <v-slide-x-reverse-transition mode="out-in">
                                                        <v-icon :key="`icon-${autoUpdateCalle}`" :color="
                                                            !autoUpdateCalle ? 'walkure' : 'alizarin_500'
                                                        " @click="autoUpdateCalle = !autoUpdateCalle"
                                                            @click.prevent="handlerItemClick" v-text="
                                                                !autoUpdateCalle
                                                                    ? 'mdi-check-outline'
                                                                    : 'mdi-circle-edit-outline'
                                                            ">
                                                        </v-icon>
                                                    </v-slide-x-reverse-transition>
                                                </template>
                                                <template v-slot:append>
                                                    <v-fade-transition leave-absolute>
                                                        <v-progress-circular v-if="itemCalleLoading" size="24"
                                                            color="info" indeterminate></v-progress-circular>
                                                    </v-fade-transition>
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </div>
                                </v-col>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card class="card-invoice__container z-3 noshadow">
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <v-list-item color="bunker darken-5">
                                        <v-list-item-content>
                                            <v-list-item-title>N. Exterior</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <div class="devmpm-wrapper">
                                        <div id="devmpm-input-data-num-exterior-si" class="devmpm-input-data"
                                            data-devmpm-input-address="item-num-exterior">
                                            <v-text-field 
                                                value="matchClient.domicilio.n_exterior" id="" class="devmpm-input"
                                                ref="" solo dense label="" persistent-hint type="text"
                                                :readonly="!autoUpdateNumExterior">
                                                <template v-slot:append-outer>
                                                    <v-slide-x-reverse-transition mode="out-in">
                                                        <v-icon :key="`icon-${autoUpdateNumExterior}`" :color="
                                                            !autoUpdateNumExterior
                                                                ? 'walkure'
                                                                : 'alizarin_500'
                                                        " @click="
    autoUpdateNumExterior = !autoUpdateNumExterior
" @click.prevent="handlerItemClick" v-text="
    !autoUpdateNumExterior
        ? 'mdi-check-outline'
        : 'mdi-circle-edit-outline'
">
                                                        </v-icon>
                                                    </v-slide-x-reverse-transition>
                                                </template>
                                                <template v-slot:append>
                                                    <v-fade-transition leave-absolute>
                                                        <v-progress-circular v-if="itemNumExteriorLoading" size="24"
                                                            color="info" indeterminate></v-progress-circular>
                                                    </v-fade-transition>
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </div>
                                </v-col>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card class="card-invoice__container z-3 noshadow">
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <v-list-item color="bunker darken-5">
                                        <v-list-item-content>
                                            <v-list-item-title>N. Interior</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <div class="devmpm-wrapper">
                                        <div id="devmpm-input-data-num-interior-si" class="devmpm-input-data"
                                            data-devmpm-input-address="item-num-interior">
                                            <v-text-field 
                                                value="matchClient.domicilio.n_interior" id="" class="devmpm-input"
                                                ref="" solo dense label="" persistent-hint type="text"
                                                :readonly="!autoUpdateNumInterior">
                                                <template v-slot:append-outer>
                                                    <v-slide-x-reverse-transition mode="out-in">
                                                        <v-icon :key="`icon-${autoUpdateNumInterior}`" :color="
                                                            !autoUpdateNumInterior
                                                                ? 'walkure'
                                                                : 'alizarin_500'
                                                        " @click="
    autoUpdateNumInterior = !autoUpdateNumInterior
" @click.prevent="handlerItemClick" v-text="
    !autoUpdateNumInterior
        ? 'mdi-check-outline'
        : 'mdi-circle-edit-outline'
">
                                                        </v-icon>
                                                    </v-slide-x-reverse-transition>
                                                </template>
                                                <template v-slot:append>
                                                    <v-fade-transition leave-absolute>
                                                        <v-progress-circular v-if="itemNumInteriorLoading" size="24"
                                                            color="info" indeterminate></v-progress-circular>
                                                    </v-fade-transition>
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </div>
                                </v-col>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card class="card-invoice__container z-3 noshadow">
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <v-list-item color="bunker darken-5">
                                        <v-list-item-content>
                                            <v-list-item-title>Colonia</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <div class="devmpm-wrapper">
                                        <div id="devmpm-input-data-colonia-si" class="devmpm-input-data"
                                            data-devmpm-input-address="item-colonia">
                                            <v-text-field 
                                                value="matchClient.domicilio.colonia" id="" class="devmpm-input" ref=""
                                                solo dense label="" persistent-hint type="text"
                                                :readonly="!autoUpdateColonia">
                                                <template v-slot:append-outer>
                                                    <v-slide-x-reverse-transition mode="out-in">
                                                        <v-icon :key="`icon-${autoUpdateColonia}`" :color="
                                                            !autoUpdateColonia ? 'walkure' : 'alizarin_500'
                                                        " @click="autoUpdateColonia = !autoUpdateColonia"
                                                            @click.prevent="handlerItemClick" v-text="
                                                                !autoUpdateColonia
                                                                    ? 'mdi-check-outline'
                                                                    : 'mdi-circle-edit-outline'
                                                            ">
                                                        </v-icon>
                                                    </v-slide-x-reverse-transition>
                                                </template>
                                                <template v-slot:append>
                                                    <v-fade-transition leave-absolute>
                                                        <v-progress-circular v-if="itemColoniaLoading" size="24"
                                                            color="info" indeterminate></v-progress-circular>
                                                    </v-fade-transition>
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </div>
                                </v-col>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card class="card-invoice__container z-3 noshadow">
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <v-list-item color="bunker darken-5">
                                        <v-list-item-content>
                                            <v-list-item-title>Cuidad</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <div class="devmpm-wrapper">
                                        <div id="devmpm-input-data-ciudad-si" class="devmpm-input-data"
                                            data-devmpm-input-address="item-ciudad">
                                            <v-text-field 
                                                value="matchClient.domicilio.ciudad" id="" class="devmpm-input" ref=""
                                                solo dense label="" persistent-hint type="text"
                                                :readonly="!autoUpdateCiudad">
                                                <template v-slot:append-outer>
                                                    <v-slide-x-reverse-transition mode="out-in">
                                                        <v-icon :key="`icon-${autoUpdateCiudad}`" :color="
                                                            !autoUpdateCiudad ? 'walkure' : 'alizarin_500'
                                                        " @click="autoUpdateCiudad = !autoUpdateCiudad"
                                                            @click.prevent="handlerItemClick" v-text="
                                                                !autoUpdateCiudad
                                                                    ? 'mdi-check-outline'
                                                                    : 'mdi-circle-edit-outline'
                                                            ">
                                                        </v-icon>
                                                    </v-slide-x-reverse-transition>
                                                </template>
                                                <template v-slot:append>
                                                    <v-fade-transition leave-absolute>
                                                        <v-progress-circular v-if="itemCiudadLoading" size="24"
                                                            color="info" indeterminate></v-progress-circular>
                                                    </v-fade-transition>
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </div>
                                </v-col>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card class="card-invoice__container z-3 noshadow">
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <v-list-item color="bunker darken-5">
                                        <v-list-item-content>
                                            <v-list-item-title>Municipio</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <div class="devmpm-wrapper">
                                        <div id="devmpm-input-data-municipio-si" class="devmpm-input-data"
                                            data-devmpm-input-address="item-municipio">
                                            <v-text-field 
                                                value="matchClient.domicilio.municipio" id="" class="devmpm-input"
                                                ref="" solo dense label="" persistent-hint type="text"
                                                :readonly="!autoUpdateMunicipio">
                                                <template v-slot:append-outer>
                                                    <v-slide-x-reverse-transition mode="out-in">
                                                        <v-icon :key="`icon-${autoUpdateMunicipio}`" :color="
                                                            !autoUpdateMunicipio
                                                                ? 'walkure'
                                                                : 'alizarin_500'
                                                        " @click="
    autoUpdateMunicipio = !autoUpdateMunicipio
" @click.prevent="handlerItemClick" v-text="
    !autoUpdateMunicipio
        ? 'mdi-check-outline'
        : 'mdi-circle-edit-outline'
">
                                                        </v-icon>
                                                    </v-slide-x-reverse-transition>
                                                </template>

                                                <template v-slot:append>
                                                    <v-fade-transition leave-absolute>
                                                        <v-progress-circular v-if="itemMunicipioLoading" size="24"
                                                            color="info" indeterminate></v-progress-circular>
                                                    </v-fade-transition>
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </div>
                                </v-col>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card class="card-invoice__container z-3 noshadow">
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <v-list-item color="bunker darken-5">
                                        <v-list-item-content>
                                            <v-list-item-title>Código Postal</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <div class="devmpm-wrapper">
                                        <div id="devmpm-input-data-cp-si" class="devmpm-input-data"
                                            data-devmpm-input-address="item-cp">
                                            <v-text-field 
                                                value="matchClient.domicilio.codigo_postal" id="" class="devmpm-input"
                                                ref="" solo dense label="" persistent-hint type="text"
                                                :readonly="!autoUpdateCp">
                                                <template v-slot:append-outer>
                                                    <v-slide-x-reverse-transition mode="out-in">
                                                        <v-icon :key="`icon-${autoUpdateCp}`" :color="
                                                            !autoUpdateCp ? 'walkure' : 'alizarin_500'
                                                        " @click="autoUpdateCp = !autoUpdateCp"
                                                            @click.prevent="handlerItemClick" v-text="
                                                                !autoUpdateCp
                                                                    ? 'mdi-check-outline'
                                                                    : 'mdi-circle-edit-outline'
                                                            ">
                                                        </v-icon>
                                                    </v-slide-x-reverse-transition>
                                                </template>
                                                <template v-slot:append>
                                                    <v-fade-transition leave-absolute>
                                                        <v-progress-circular v-if="itemCpLoading" size="24" color="info"
                                                            indeterminate></v-progress-circular>
                                                    </v-fade-transition>
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </div>
                                </v-col>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card class="card-invoice__container z-3 noshadow">
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <v-list-item color="bunker darken-5">
                                        <v-list-item-content>
                                            <v-list-item-title>Estado</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <div class="devmpm-wrapper">
                                        <div id="devmpm-input-data-estado-si" class="devmpm-input-data"
                                            data-devmpm-input-address="item-estado">
                                            <v-text-field 
                                                value="matchClient.domicilio.entidad" id="" class="devmpm-input" ref=""
                                                solo dense label="" persistent-hint type="text"
                                                :readonly="!autoUpdateEstado">
                                                <template v-slot:append-outer>
                                                    <v-slide-x-reverse-transition mode="out-in">
                                                        <v-icon :key="`icon-${autoUpdateEstado}`" :color="
                                                            !autoUpdateEstado ? 'walkure' : 'alizarin_500'
                                                        " @click="autoUpdateEstado = !autoUpdateEstado"
                                                            @click.prevent="handlerItemClick" v-text="
                                                                !autoUpdateEstado
                                                                    ? 'mdi-check-outline'
                                                                    : 'mdi-circle-edit-outline'
                                                            ">
                                                        </v-icon>
                                                    </v-slide-x-reverse-transition>
                                                </template>
                                                <template v-slot:append>
                                                    <v-fade-transition leave-absolute>
                                                        <v-progress-circular v-if="itemEstadoLoading" size="24"
                                                            color="info" indeterminate></v-progress-circular>
                                                    </v-fade-transition>
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </div>
                                </v-col>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card class="card-invoice__container z-3 noshadow">
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <v-list-item color="bunker darken-5">
                                        <v-list-item-content>
                                            <v-list-item-title>País</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <div class="devmpm-wrapper">
                                        <div id="devmpm-input-data-pais-si" class="devmpm-input-data"
                                            data-devmpm-input-address="item-pais">
                                            <v-text-field 
                                                value="matchClient.domicilio.pais" id="" class="devmpm-input" ref=""
                                                solo dense label="" persistent-hint type="text"
                                                :readonly="!autoUpdatePais">
                                                <template v-slot:append-outer>
                                                    <v-slide-x-reverse-transition mode="out-in">
                                                        <v-icon :key="`icon-${autoUpdatePais}`" :color="
                                                            !autoUpdatePais ? 'walkure' : 'alizarin_500'
                                                        " @click="autoUpdatePais = !autoUpdatePais"
                                                            @click.prevent="handlerItemClick" v-text="
                                                                !autoUpdatePais
                                                                    ? 'mdi-check-outline'
                                                                    : 'mdi-circle-edit-outline'
                                                            ">
                                                        </v-icon>
                                                    </v-slide-x-reverse-transition>
                                                </template>
                                                <template v-slot:append>
                                                    <v-fade-transition leave-absolute>
                                                        <v-progress-circular v-if="itemNombreLoading" size="24"
                                                            color="info" indeterminate></v-progress-circular>
                                                    </v-fade-transition>
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </div>
                                </v-col>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card class="card-invoice__container z-3 noshadow">
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <v-list-item color="bunker darken-5">
                                        <v-list-item-content>
                                            <v-list-item-title>Email</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <div class="devmpm-wrapper">
                                        <div id="devmpm-input-data-email-si" class="devmpm-input-data"
                                            data-devmpm-input-address="item-email">
                                            <v-text-field 
                                                class="devmpm-input" ref="" solo dense label="" persistent-hint
                                                type="text" :readonly="!autoUpdateEmail">
                                                <template v-slot:append-outer>
                                                    <v-slide-x-reverse-transition mode="out-in">
                                                        <v-icon :key="`icon-${autoUpdateEmail}`" :color="
                                                            !autoUpdateEmail ? 'walkure' : 'alizarin_500'
                                                        " @click="autoUpdateEmail = !autoUpdateEmail"
                                                            @click.prevent="handlerItemClick" v-text="
                                                                !autoUpdateEmail
                                                                    ? 'mdi-check-outline'
                                                                    : 'mdi-circle-edit-outline'
                                                            ">
                                                        </v-icon>
                                                    </v-slide-x-reverse-transition>
                                                </template>
                                                <template v-slot:append>
                                                    <v-fade-transition leave-absolute>
                                                        <v-progress-circular v-if="itemEmailLoading" size="24"
                                                            color="info" indeterminate></v-progress-circular>
                                                    </v-fade-transition>
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </div>
                                </v-col>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card class="card-invoice__container z-3 noshadow">
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <v-list-item color="bunker darken-5">
                                        <v-list-item-content>
                                            <v-list-item-title>Celular</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <div class="devmpm-wrapper">
                                        <div id="devmpm-input-data-celular-si" class="devmpm-input-data"
                                            data-devmpm-input-address="item-celular">
                                            <v-text-field v-model="matchClient.celular" value="matchClient.celular"
                                                id="" class="devmpm-input" ref="" solo dense label="" persistent-hint
                                                type="text" :readonly="!autoUpdateCelular">
                                                <template v-slot:append-outer>
                                                    <v-slide-x-reverse-transition mode="out-in">
                                                        <v-icon :key="`icon-${autoUpdateCelular}`" :color="
                                                            !autoUpdateCelular ? 'walkure' : 'alizarin_500'
                                                        " @click="autoUpdateCelular = !autoUpdateCelular"
                                                            @click.prevent="handlerItemClick" v-text="
                                                                !autoUpdateCelular
                                                                    ? 'mdi-check-outline'
                                                                    : 'mdi-circle-edit-outline'
                                                            ">
                                                        </v-icon>
                                                    </v-slide-x-reverse-transition>
                                                </template>
                                                <template v-slot:append>
                                                    <v-fade-transition leave-absolute>
                                                        <v-progress-circular v-if="itemCelularLoading" size="24"
                                                            color="info" indeterminate></v-progress-circular>
                                                    </v-fade-transition>
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </div>
                                </v-col>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card class="card-invoice__container z-3 noshadow">
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <v-list-item color="bunker darken-5">
                                        <v-list-item-content>
                                            <v-list-item-title>Teléfono 1</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <div class="devmpm-wrapper">
                                        <div id="devmpm-input-data-tel1-si" class="devmpm-input-data"
                                            data-devmpm-input-address="item-tel1">
                                            <v-text-field v-model="matchClient.tel_1" value="matchClient.tel_1" id=""
                                                class="devmpm-input" ref="" solo dense label="" persistent-hint
                                                type="text" :readonly="!autoUpdateTel1">
                                                <template v-slot:append-outer>
                                                    <v-slide-x-reverse-transition mode="out-in">
                                                        <v-icon :key="`icon-${autoUpdateTel1}`" :color="
                                                            !autoUpdateTel1 ? 'walkure' : 'alizarin_500'
                                                        " @click="autoUpdateTel1 = !autoUpdateTel1"
                                                            @click.prevent="handlerItemClick" v-text="
                                                                !autoUpdateTel1
                                                                    ? 'mdi-check-outline'
                                                                    : 'mdi-circle-edit-outline'
                                                            ">
                                                        </v-icon>
                                                    </v-slide-x-reverse-transition>
                                                </template>
                                                <template v-slot:append>
                                                    <v-fade-transition leave-absolute>
                                                        <v-progress-circular v-if="itemTel1Loading" size="24"
                                                            color="info" indeterminate></v-progress-circular>
                                                    </v-fade-transition>
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </div>
                                </v-col>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card class="card-invoice__container z-3 noshadow">
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <v-list-item color="bunker darken-5">
                                        <v-list-item-content>
                                            <v-list-item-title>Teléfono 2</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <div class="devmpm-wrapper">
                                        <div id="devmpm-input-data-tel2-si" class="devmpm-input-data"
                                            data-devmpm-input-address="item-tel2">
                                            <v-text-field v-model="matchClient.tel_2" value="matchClient.tel_2" id=""
                                                class="devmpm-input" ref="" solo dense label="" persistent-hint
                                                type="text" :readonly="!autoUpdateTel2">
                                                <template v-slot:append-outer>
                                                    <v-slide-x-reverse-transition mode="out-in">
                                                        <v-icon :key="`icon-${autoUpdateTel2}`" :color="
                                                            !autoUpdateTel2 ? 'walkure' : 'alizarin_500'
                                                        " @click="autoUpdateTel2 = !autoUpdateTel2"
                                                            @click.prevent="handlerItemClick" v-text="
                                                                !autoUpdateTel2
                                                                    ? 'mdi-check-outline'
                                                                    : 'mdi-circle-edit-outline'
                                                            ">
                                                        </v-icon>
                                                    </v-slide-x-reverse-transition>
                                                </template>
                                                <template v-slot:append>
                                                    <v-fade-transition leave-absolute>
                                                        <v-progress-circular v-if="itemTel2Loading" size="24"
                                                            color="info" indeterminate></v-progress-circular>
                                                    </v-fade-transition>
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </div>
                                </v-col>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card class="card-invoice__container z-3 noshadow">
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <v-list-item color="bunker darken-5">
                                        <v-list-item-content>
                                            <v-list-item-title>Teléfono 800</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" class="devmpm-wrapper-input-5 z-3">
                                    <div class="devmpm-wrapper">
                                        <div id="devmpm-input-data-tel800-si" class="devmpm-input-data"
                                            data-devmpm-input-address="item-tel800">
                                            <v-text-field v-model="matchClient.tel_800" value="matchClient.tel_800"
                                                id="" class="devmpm-input" ref="" solo dense label="" persistent-hint
                                                type="text" :readonly="!autoUpdateTel800">
                                                <template v-slot:append-outer>
                                                    <v-slide-x-reverse-transition mode="out-in">
                                                        <v-icon :key="`icon-${autoUpdateTel800}`" :color="
                                                            !autoUpdateTel800 ? 'walkure' : 'alizarin_500'
                                                        " @click="autoUpdateTel800 = !autoUpdateTel800"
                                                            @click.prevent="handlerItemClick" v-text="
                                                                !autoUpdateTel800
                                                                    ? 'mdi-check-outline'
                                                                    : 'mdi-circle-edit-outline'
                                                            ">
                                                        </v-icon>
                                                    </v-slide-x-reverse-transition>
                                                </template>
                                                <template v-slot:append>
                                                    <v-fade-transition leave-absolute>
                                                        <v-progress-circular v-if="itemTel800Loading" size="24"
                                                            color="info" indeterminate></v-progress-circular>
                                                    </v-fade-transition>
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </div>
                                </v-col>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
/** importacion de funcion para hacer llamadas a la api/json */
// import srvAxios from "@/services/srv_axios.js";
export default {
    name: "",
    props: {
        // clienteSender: Object,
    },
    components: {},
    data: () => ({
        windowSize: {
            x: 0,
            y: 0,
        },
        marker: true,
        tipoTercero: [],
        tipoTerceroModelSelected: {
            concepto_id: null,
            cnpto_padre_id: null,
            concepto: null,
            orden: null,
        },
        autoUpdate: true,
        isUpdating: false,
        sender: {},
        isProfileEditable: false,
        profile: {
            id: "",
            id_text: "",
            mid: "",
            auth: "",
            cliente: "",
            nombre_comercial: "",
            razon_social: "",
            rfc: "",
            email: "",
            lada: "",
            celular: "",
            tel_1: "",
            tel_2: "",
            tel_800: "",
            tipo_tercero_id: "",
            tipo_tercero: "",
            rol: "",
            c_convenio: "",
            tipo: "",
            tipo_licencia: "",
            codigo_licencia: "",
            domicilio: {
                codigo_postal: "",
                calle: "",
                n_exterior: "",
                n_interior: "",
                colonia: "",
                ciudad: "",
                municipio: "",
                entidad_id: "",
                entidad: "",
                pais_id: "",
                pais: "",
                referencias: "",
                observaciones: "",
            },
            licencia: {
                licencia_codigo_id: "",
                licencia_codigo: "",
                licencia_precio_id: "",
                licencia_precio: "",
                licencia_estado: "",
                licencia_cancelada: "",
                licencia_llave: "",
                licencia_monto_mensual: "",
                licencia_descripcion: "",
                licencia_dias_validos: "",
            },
            convenio: {
                tipo_pago_id: "",
                autorizado: "",
                c_credito: "",
                c_convenio: "",
                plazo: "",
                monto_max: "",
                prcn_descuento_id: "",
            },
        },
        messageItemNombre: "Hey!",
        loading: false,
        itemRfcLoading: false,
        autoUpdateRfc: false,
        itemNombreLoading: false,
        autoUpdateNombre: false,
        itemCalleLoading: false,
        autoUpdateCalle: false,
        itemNumExteriorLoading: false,
        autoUpdateNumExterior: false,
        itemNumInteriorLoading: false,
        autoUpdateNumInterior: false,
        itemColoniaLoading: false,
        autoUpdateColonia: false,
        itemMunicipioLoading: false,
        autoUpdateMunicipio: false,
        itemCiudadLoading: false,
        autoUpdateCiudad: false,
        itemCpLoading: false,
        autoUpdateCp: false,
        itemEstadoLoading: false,
        autoUpdateEstado: false,
        itemPaisLoading: false,
        autoUpdatePais: false,
        itemEmailLoading: false,
        autoUpdateEmail: false,
        itemCelularLoading: false,
        autoUpdateCelular: false,
        itemTel1Loading: false,
        autoUpdateTel1: false,
        itemTel2Loading: false,
        autoUpdateTel2: false,
        itemTel800Loading: false,
        autoUpdateTel800: false,
        customerProfile: {},
        matchClient: {},
        matchGuide: {},
        matchInvoice: {},
    }),
    computed: {},
    watch: {
        isUpdating(variable) {
            console.log("__[view] isUpdating:: " + variable);
            if (variable) {
                setTimeout(() => (this.isUpdating = false), 3000);
            }
        },
        autoUpdate(variable) {
            console.log("__[view] autoUpdate:: " + variable);
        },
        // "$store.state.profile"(variable) {
        //   this.profile = variable;
        //   console.log("__[view] watch:: value:: " + JSON.stringify(variable));
        // },
    },
    /** Hooks */
    beforeCreate() { },
    created() { },
    beforeMount() { },
    async mounted() {
        this.onResize();
        // this.tipoTercero = this.$store.state.ep.apiTipoTercero;
        // this.customerProfile = this.$store.state.customerProfile;
        // this.matchClient = this.$store.state.matchClient;
        // this.matchGuide = this.$store.state.matchGuide;
        // this.matchInvoice = this.$store.state.matchInvoice;
    },
    beforeUpdate() { },
    updated() { },
    beforeDestroy() { },
    destroyed() { },
    methods: {
        handleEventSender() {
            console.log("__[view] handleEventSender: " + JSON.stringify(this.sender));
            this.$emit("eventsender", this.sender);
        },
        onResize() {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight };
        },
        /**
         * TDO: Genera error, porque los textfield deven de estar dentro de una etique form
         */
        reloadTheClientData() {
            this.$refs.form.reset();
            // this.matchClient = this.$store.state.matchClient;
        },
        handlerItemClick(event) {
            // console.log(event);
            // console.log(event.target.dataset);
            let target1 = event.target;
            let parent2 = target1.parentNode;
            let anotherParent3 = parent2.parentNode;
            let rootParent4 = anotherParent3.parentNode;
            let attrRootParent4 = rootParent4.getAttribute(
                "data-devmpm-input-address"
            );
            // let rootParent5 = rootParent4.parentNode;
            // let rootParent6 = rootParent5.parentNode;
            // let rootParent7 = rootParent6.parentNode;
            // let rootParent8 = rootParent7.parentNode;
            // let rootParent9 = rootParent8.parentNode;
            console.log("Name1:", target1);
            console.log("Name2:", parent2);
            console.log("Name3:", anotherParent3);
            console.log("Name4:", rootParent4);
            console.log("Name4 attr:", attrRootParent4);
            // console.log("Name5:", rootParent5);
            // console.log("Name6:", rootParent6);
            // console.log("Name7:", rootParent7);
            // console.log("Name8:", rootParent8);
            // console.log("Name9:", rootParent9);
            switch (attrRootParent4) {
                case "item-rfc":
                    this.itemRfcLoading = true;
                    this.matchClient.rfc = "Espere...";
                    setTimeout(() => {
                        this.itemRfcLoading = false;
                        this.matchClient.rfc = `Se ha modificado!`;
                    }, 2000);
                    break;
                case "item-nombre":
                    this.itemNombreLoading = true;
                    this.matchClient.cliente = "Espere...";
                    setTimeout(() => {
                        this.itemNombreLoading = false;
                        this.matchClient.cliente = `Se ha modificado!`;
                    }, 2000);
                    break;
                case "item-calle":
                    this.itemCalleLoading = true;
                    this.matchClient.domicilio.calle = "Espere...";
                    setTimeout(() => {
                        this.itemCalleLoading = false;
                        this.matchClient.domicilio.calle = `Se ha modificado!`;
                    }, 2000);
                    break;
                case "item-num-exterior":
                    this.itemNumExteriorLoading = true;
                    this.matchClient.domicilio.n_exterior = "Espere...";
                    setTimeout(() => {
                        this.itemNumExteriorLoading = false;
                        this.matchClient.domicilio.n_exterior = `Se ha modificado!`;
                    }, 2000);
                    break;
                case "item-num-interior":
                    this.itemNumInteriorLoading = true;
                    this.matchClient.domicilio.n_interior = "Espere...";
                    setTimeout(() => {
                        this.itemNumInteriorLoading = false;
                        this.matchClient.domicilio.n_interior = `Se ha modificado!`;
                    }, 2000);
                    break;
                case "item-colonia":
                    this.itemColoniaLoading = true;
                    this.matchClient.domicilio.colonia = "Espere...";
                    setTimeout(() => {
                        this.itemColoniaLoading = false;
                        this.matchClient.domicilio.colonia = `Se ha modificado!`;
                    }, 2000);
                    break;
                case "item-ciudad":
                    this.itemCiudadLoading = true;
                    this.matchClient.domicilio.ciudad = "Espere...";
                    setTimeout(() => {
                        this.itemCiudadLoading = false;
                        this.matchClient.domicilio.ciudad = `Se ha modificado!`;
                    }, 2000);
                    break;
                case "item-municipio":
                    this.itemMunicipioLoading = true;
                    this.matchClient.domicilio.municipio = "Espere...";
                    setTimeout(() => {
                        this.itemMunicipioLoading = false;
                        this.matchClient.domicilio.municipio = `Se ha modificado!`;
                    }, 2000);
                    break;
                case "item-cp":
                    this.itemCpLoading = true;
                    this.matchClient.domicilio.codigo_postal = "Espere...";
                    setTimeout(() => {
                        this.itemCpLoading = false;
                        this.matchClient.domicilio.codigo_postal = `Se ha modificado!`;
                    }, 2000);
                    break;
                case "item-estado":
                    this.itemEstadoLoading = true;
                    this.matchClient.domicilio.entidad = "Espere...";
                    setTimeout(() => {
                        this.itemEstadoLoading = false;
                        this.matchClient.domicilio.entidad = `Se ha modificado!`;
                    }, 2000);
                    break;
                case "item-pais":
                    this.itemPaisLoading = true;
                    this.matchClient.domicilio.pais = "Espere...";
                    setTimeout(() => {
                        this.itemPaisLoading = false;
                        this.matchClient.domicilio.pais = `Se ha modificado!`;
                    }, 2000);
                    break;
                case "item-email":
                    this.itemEmailLoading = true;
                    this.matchClient.email = "Espere...";
                    setTimeout(() => {
                        this.itemEmailLoading = false;
                        this.matchClient.email = `Se ha modificado!`;
                    }, 2000);
                    break;
                case "item-celular":
                    this.itemCelularLoading = true;
                    this.matchClient.celular = "Espere...";
                    setTimeout(() => {
                        this.itemCelularLoading = false;
                        this.matchClient.celular = `Se ha modificado!`;
                    }, 2000);
                    break;
                case "item-tel1":
                    this.itemTel1Loading = true;
                    this.matchClient.tel_1 = "Espere...";
                    setTimeout(() => {
                        this.itemTel1Loading = false;
                        this.matchClient.tel_1 = `Se ha modificado!`;
                    }, 2000);
                    break;
                case "item-tel2":
                    this.itemTel2Loading = true;
                    this.matchClient.tel_2 = "Espere...";
                    setTimeout(() => {
                        this.itemTel2Loading = false;
                        this.matchClient.tel_2 = `Se ha modificado!`;
                    }, 2000);
                    break;
                case "item-tel800":
                    this.itemTel800Loading = true;
                    this.matchClient.tel_800 = "Espere...";
                    setTimeout(() => {
                        this.itemTel800Loading = false;
                        this.matchClient.tel_800 = `Se ha modificado!`;
                    }, 2000);
                    break;

                default:
                    break;
            }
        },
    },
    /** end Hooks */
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common/variables.scss";

.card-client-addr {
    &__content {
        padding: 1rem;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: 1fr;

        @media screen and (max-width: $break-sm) {
            grid-template-columns: 1fr !important;
            grid-template-rows: repeat(3, minmax(0, 1fr)) !important;
        }
    }
}
</style>
