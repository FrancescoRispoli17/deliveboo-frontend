<script>
import FavouritesCtaComponent from './FavouritesCtaComponent.vue';
import LoginCtaComponent from './LoginCtaComponent.vue';
import CartCtaComponent from './CartCtaComponent.vue';

export default {
    name: 'HeaderCta',

    components: {
        FavouritesCtaComponent, 
        LoginCtaComponent,
        CartCtaComponent
    },

    data(){
        return{}
    },
    methods: {

    }
}
</script>

<template>
    <div class="container">
        <div class="row">
            <!-- <FavouritesCtaComponent /> -->
            <LoginCtaComponent/>
            <CartCtaComponent/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

</style>
