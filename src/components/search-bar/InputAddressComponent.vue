<script>
export default {
    name: '' ,

    data(){
    return{}
    },
    components: {

    },
    methods: {
        
    }
}
</script>

<template>

    <form class="d-flex p-2 w-100 align-items-center" role="search">
            <a href=""><font-awesome-icon :icon="['fas', 'map-marker-alt']" class="mx-2 icon" style="height: 20px;" /></a>
            <input class="search-bar me-2" type="search" placeholder="Inserisci il tuo indirizzo completo" aria-label="Search">
            <button class="search">
                <span class="fw-bold">Cerca</span>
            </button>
    </form>

</template>

<style lang="scss" scoped>

@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

form {
    @include border-radius-solid;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);  // Ombreggiatura leggera
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

.search{
    background-color: $primary-color;
    color: $quaternary-color;
    padding: 0.5rem 1rem;
    @include border-radius-solid
}



</style>