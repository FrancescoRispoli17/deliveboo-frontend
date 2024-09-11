<script>
// import AboutComponent from '../components/AboutComponent.vue';
// import ProjectComponent from '../components/ProjectComponent.vue';


//importazione prova

import HeroComponent from '../components/hero/HeroComponent.vue';
import CarouselComponent from '../components/containers/CarouselComponent.vue';
import MapCardComponent from '../components/cards/MapCardComponent.vue';
import FooterComponent from '../components/footers/FooterComponent.vue';
import ServiceComponent from '../components/containers/ServiceComponent.vue';
import OffersComponent from '../components/containers/OffersComponent.vue';
import CarouselContainerComponent from '../components/containers/CarouselContainerComponent.vue';



export default {
    components: {
        // HeroComponent,
        // AboutComponent,
        // ServiceComponent,
        // ProjectComponent,

        //prova dichiarazione
        HeroComponent,
        CarouselContainerComponent,
        MapCardComponent,
        OffersComponent,
        ServiceComponent,
        FooterComponent

    }
}

</script>

<template>
    <!-- <HeroComponent />
    <AboutComponent />
    <ServiceComponent />
    <ProjectComponent /> -->

    <HeroComponent/>
    <CarouselContainerComponent/>
    <MapCardComponent/> 
    <OffersComponent/>
    <ServiceComponent/> 
    <FooterComponent/>



</template>

<style lang="scss" scoped></style>