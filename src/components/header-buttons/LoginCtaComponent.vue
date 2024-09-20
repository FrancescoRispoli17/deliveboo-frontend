<script>
export default {
    name: 'LoginCtaComponent',

    data() {

        return {}
    },
    component: {

    },
    methods: {

    }
}


</script>

<template>

    <button class="btn bg-light user">
        <span class="icon">Partner Hub</span>
    </button>

</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.icon {
    color: $primary-color;
    font-weight: 500;
    font-size: 14px;
}


.user {
    width: auto;
    @include border-solid;
}

button {
    @include shadow
}


@media only screen and (max-width: 768px) {
    body {
        background-color: lightblue;
    }
}
</style>