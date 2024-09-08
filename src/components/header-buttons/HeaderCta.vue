<script>
import FavouritesCtaComponent from './FavouritesCtaComponent.vue';
import LoginCtaComponent from './LoginCtaComponent.vue';

export default {
    name: 'HeaderCta',

    components: {
        FavouritesCtaComponent, 
        LoginCtaComponent
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
             
            <FavouritesCtaComponent />

            <LoginCtaComponent/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

</style>
