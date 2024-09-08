<script>
export default {
    name: 'LogoComponent',

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
        <img src="https://loghi-famosi.com/wp-content/uploads/2021/03/Deliveroo-Logo.png" alt="">
    </div>

</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as*;
@use 'src/assets/partials/_mixin.scss' as*;

.logo-container{
    width: 90%;

    img{
        width: 65%;
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