<script>
export default {
    name:'HeaderComponent',

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

                <div class="col-lg-2 col-sm-6 bg-danger py-3 border border-dark side-div">
                    <!-- logo -->
                </div>
                <div class="col-lg-8 bg-success search-bar-desktop ">
                    <!-- search-bar per desktop -->
                </div>
                <div class="col-lg-2 col-sm-6   bg-danger py-3 border border-dark side-div">
                    <!-- logo -->
                </div>

            </div>
            <!-- search-bar tablet -->
            <div class="col-md-12 bg-success py-3 d-lg-none d-{sm, md}-block">
                    <!-- search-bar -->
            </div>
        </div>
    </header>

</template>

<style lang="scss" scoped>

@media screen and (max-width: 991px) {
    .search-bar-desktop{
    
        display: none;
    }
}

@media screen and (max-width: 573px) {
    .side-div{
        width: 50%;
    }
}

</style>