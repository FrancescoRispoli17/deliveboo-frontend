<script>
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

<div class="container py-4">
    <div class="row">
        <div class="col-md-12 text-center">
            <h1 class="text-light fw-light mb-3">Ristoranti</h1>
        </div>
    </div>
</div>
    <RestaurantCardComponent/>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

</style>
