<script>

import HeaderComponent from '../components/headers/HeaderComponent.vue';

export default {
    name: 'DesignSystem',

    components:{
        HeaderComponent
    },
}

</script>

<template>
    <section class="mb-3">
        <div class="container py-5">
        <div class="row">
            <div class="col-md-12">
                <h3 class="text-light mb-3">Design system</h3>
                <p class="text-light fw-light">Questa è la pagina dedicata al design system <br>
                    qui potrete trovare una lista di componenti globali e riutilizzabili in modo <br>
                    che il progetto possa mantenere una coerenza stilistica</p>
            </div>
        </div>
    </div>

    <!-- header -->
    <div class="container">
        <div class="col md-12">
            <h5 class="text-light">Header white filled</h5>
        </div>
    </div>
    <HeaderComponent/>
    <!-- header -->


    </section>
</template>

<style lang="scss" scoped></style>