<script>
import RestaurantCardComponent from '../components/apiComponents/RestaurantCardComponent.vue';

export default {
    name: 'RestaurantPage' ,

    data(){
    return{}
    },
    components: {
        RestaurantCardComponent
    },
    methods: {
        
    }
}


</script>

<template>

<h1 class="text-light fw-light mb-3">Qui verranno filtrati tutti i ristoranti</h1>
    <div class="container">
        <div class="row">
            <RestaurantCardComponent/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

</style>
