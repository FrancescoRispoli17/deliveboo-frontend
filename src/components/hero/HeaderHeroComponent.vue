<script>

//home
import LogoComponent from '../containers/logoComponent.vue';
import HeaderCta from '../header-buttons/HeaderCta.vue';

export default {
    name:'HeaderHeroComponent' ,

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
        <div class="container-fluid py-3 bg-success">
            <div class="d-flex">

                <div class="col-md-6 side-div">
                    <LogoComponent/>
                </div>
                <div class="col-md-6 py-2 side-div">
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
