<script>

//navbar sia per il backend per il frontend

import LogoFilledComponent from '../containers/LogoFilledComponent.vue';
import HeaderCta from '../header-buttons/HeaderCta.vue';
import SearchBarComponent from '../search-bar/SearchBarComponent.vue';

export default {
    name:'HeaderComponent',

    components:{
        SearchBarComponent,
        LogoFilledComponent,
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
    <header class="bg-light">
        <div class="container py-3">
            <div class="d-flex">

                <div class="col-lg-2 side-div py-2">
                    <LogoFilledComponent/>
                </div>
                <div class="col-lg-8 search-bar-desktop py-1">
                    <SearchBarComponent/>
                </div>
                <div class="col-lg-2 py-2 side-div">
                    <HeaderCta/>
                </div>

            </div>
            <!-- search-bar tablet -->
            <div class="col-md-12 py-3 d-lg-none d-sm-none">
                <SearchBarComponent/>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>

@media screen and (max-width: 1024px) {
    .side-div {
        width: 20%;
    }

    .search-bar-desktop {
        width: 60%;
    }
}

@media screen and (max-width: 768px) {
    .side-div {
        width: 20%;
    }

    .search-bar-desktop {
        width: 60%;
        display: block; 
    }

    .col-md-12 {
        display: block; 
    }
}

@media screen and (max-width: 576px) {
    .side-div {
        width: 50%; 
    }

    .search-bar-desktop {
        display: none;
    }
}

@media screen and (max-width: 425px) {
    .side-div {
        width: 50%;
    }

    .search-bar-desktop {
        display: none;
    }
}


</style>