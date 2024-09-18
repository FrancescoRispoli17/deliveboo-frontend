<script>
export default {
    name: 'LogoFilledComponent',

    data(){
    return{}
    },
    component: {

    },
    methods: {
        
    }
}


</script>

<template>

    <div class="logo-container">
        <img src="/deliveboo-filled-logo.png" alt="">
    </div>

</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as*;
@use 'src/assets/partials/_mixin.scss' as*;

.logo-container{
    width: 90%;

    img{
        width: 65%;
        // box-shadow: 0 6px 6px rgb(0, 0, 0, 0.1);
    }
}

@media screen and (max-width: 991px) {
    .logo-container{
    
        width: 100%;
    }

    img{
        width: 100%;
    }
}

</style>