<script>
import LogoComponent from '../containers/logoComponent.vue';
import HeaderCta from '../header-buttons/HeaderCta.vue';

export default {
    name:'HeaderEmptyComponent' ,

    data(){
    return{}
    },
    components: {
        LogoComponent,
        HeaderCta
    },
    methods: {
        
    }
}


</script>

<template>

    <header class="">
        <div class="container py-3">
            <div class="d-flex">

                <div class="col-lg-2 side-div">
                    <LogoComponent/>
                </div>
                <div class="col-lg-8 search-bar-desktop py-1">
                    <SearchBarComponent/>
                </div>
                <div class="col-lg-2 py-2 side-div">
                    <HeaderCta/>
                </div>

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
