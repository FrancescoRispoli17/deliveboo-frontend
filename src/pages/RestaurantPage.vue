<script>

//contenitore padre della pagina index ristorante

import RestaurantCardComponent from '../components/apiComponents/RestaurantCardComponent.vue';
import HeaderEmptyComponent from '../components/headers/HeaderEmptyComponent.vue';
import FooterComponent from '../components/footers/FooterComponent.vue';

export default {
    name: 'RestaurantPage' ,

    data(){
    return{
    }
    },
    components: {
        RestaurantCardComponent,
        HeaderEmptyComponent,
        FooterComponent
    },
    methods: {
        
    },
}

</script>

<template>
    <div class="body">
        <!-- da sostituire -->
        <HeaderEmptyComponent/>
        <RestaurantCardComponent/>
        <FooterComponent/> 
    </div>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.body{
    overflow-x: hidden;
    height: 100vh;
}

</style>
