<script>
export default {
    name: 'SearchBarComponent',
    data() {
        return {};
    },
    methods: {}
}
</script>

<template>
    <form class="d-flex p-2 w-100 align-items-center" role="search">
        <a href=""><font-awesome-icon :icon="['fas', 'search']" class="me-2 icon" style="height: 15px;" /></a>
        <input class="search-bar me-2" type="search" placeholder="Ristoranti, spesa, piatti" aria-label="Search">
    </form>
</template>

<style lang="scss" scoped>

@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

form {
    @include border-solid;
}

.search-bar {
    width: 100%;
    border: none; 
    background-color: $quaternary-color;
    color: #b9b9b9; 

    &:focus {
        outline: none; 
        border: none; 
    }
}

.search-bar::placeholder {
    color: #b9b9b9; 
}

.icon {
    color: $primary-color;
}

</style>
