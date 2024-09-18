<script>
//metti questo in restaurant
import LogoFilledComponent from '../containers/LogoFilledComponent.vue';
import HeaderCta from '../header-buttons/HeaderCta.vue';
import SearchBarComponent from '../search-bar/SearchBarComponent.vue';

export default {
    name:'HeaderEmptyComponent',

    components:{
        SearchBarComponent,
        //modifiche
        LogoFilledComponent,
        //modifiche
        HeaderCta
    },

    data(){
        return{}
    },
    methods: {

    }
}

</script>

<template>
    <header>
        <div class="container py-3">
            <div class="d-flex">

                <div class="col-lg-2 side-div py-2">
                    <!-- qui andrà il nuovo componente del logo -->

                    <a href="/">
                        <LogoFilledComponent/>
                    </a>
                </div>
                <div class="col-lg-8 search-bar-desktop py-1">
                    <!-- <SearchBarComponent/> -->
                </div>
                <div class="col-lg-2 py-2 side-div">
                    <HeaderCta/>
                </div>

            </div>
            <!-- search-bar tablet -->
            <!-- <div class="col-md-12 py-3 d-lg-none d-sm-none">
                <SearchBarComponent/>
            </div> -->
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

header{
    border-bottom: solid 0.1px rgba(255, 166, 0, 0.2);
}

</style>