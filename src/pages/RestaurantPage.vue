<script>

//contenitore padre della pagina index ristorante

import RestaurantCardComponent from '../components/apiComponents/RestaurantCardComponent.vue';

export default {
    name: 'RestaurantPage' ,

    data(){
    return{
    }
    },
    components: {
        RestaurantCardComponent
    },
    methods: {
        
    },
}


</script>

<template>
    <RestaurantCardComponent/>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

</style>
