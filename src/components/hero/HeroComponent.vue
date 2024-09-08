<script>
import CardHeroComponent from './CardHeroComponent.vue';
import HeaderEmptyComponent from './HeaderEmptyComponent.vue';


export default {
    name:'HeroComponent' ,

    data(){
        return{}
    },

    components: {
        HeaderEmptyComponent,
        CardHeroComponent
    },
    methods: {
        
    }
}


</script>

<template>

    <section class="bg-image">

        <HeaderEmptyComponent />

        <div class="container-lg py-5">
            <div class="row justify-content-center">
                <div class="col-md-6 py-4 d-flex justify-content-center card-container">
                    <CardHeroComponent/>
                </div>
                <div class="col-md-6 py-4 empty-container">

                </div>
            </div>
        </div>
    </section>

</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;


.bg-image{
    background-image: url('https://thumbs.dreamstime.com/b/paper-bag-different-health-food-white-background-top-view-flat-lay-86071119.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
}

// large desktop
@media screen and (max-width: 2560px) {
    .card-container{
        width: 65%;
    }

    .empty-container{
        display:none;
    }
}

// desktop
@media screen and (max-width: 1440px) {
    .card-container{
        width: 65%;
    }

    .empty-container{
        display:none;
    }
}


// tablet
@media screen and (max-width: 768px) {
    .card-container{
        width: 50%;
    }

    .empty-container{
        width: 50%;
        display: block;
    }
}
// smartphone
@media screen and (max-width: 425px) {
    .card-container{
        width: 100%;
    }

    .empty-container{
        display: none;
    }
}


</style>