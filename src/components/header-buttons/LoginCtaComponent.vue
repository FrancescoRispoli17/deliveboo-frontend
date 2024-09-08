<script>
export default {
    name: 'LoginCtaComponent' ,

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

    <button class="btn bg-light user">
        <font-awesome-icon :icon="['fas', 'user']" class="icon"/>
        <span></span>
    </button>

</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.icon {
    color: $primary-color;
}


.user {
    width: 50%;
    @include border-solid;
}


</style>