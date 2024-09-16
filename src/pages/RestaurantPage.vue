<script>

//contenitore padre della pagina index ristorante

import RestaurantCardComponent from '../components/apiComponents/RestaurantCardComponent.vue';
import HeaderComponent from '../components/headers/HeaderComponent.vue';


export default {
    name: 'RestaurantPage' ,

    data(){
    return{
    }
    },
    components: {
        RestaurantCardComponent,
        HeaderComponent
    },
    methods: {
        
    },
   mounted() {
    if(localStorage.getItem('cart')){
                 console.log(localStorage.getItem('cart'));
                 localStorage.removeItem('cart');
             }
   },
}


</script>

<template>
    <HeaderComponent/>
    <RestaurantCardComponent/>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

</style>
