<script>
import axios from "axios";
import { store } from "../../store";

export default {
  name: 'RestaurantSearch',

  data() {
    return {
      selectedRestaurant: null, // Per tenere traccia del ristorante selezionato
      restaurants: [] // Lista dei ristoranti recuperati dall'API
    };
  },

  mounted() {
    this.getRestaurants(); // Chiama la funzione per ottenere i ristoranti quando il componente è montato
  },

  methods: {
    // Funzione per recuperare i ristoranti dall'API
    getRestaurants() {
      axios
        .get(`${store.url}${store.restaurants}`)
        .then(response => {
          this.restaurants = response.data; // Assegna i dati alla lista dei ristoranti
        })
        .catch(error => {
          console.error("Errore nel recupero dei ristoranti:", error);
        });
    },

    // Funzione per gestire il cambio di selezione del ristorante
    handleRestaurantSelection() {
      if (this.selectedRestaurant) {
        this.$router.push(`/restaurant/${this.selectedRestaurant}`); // Reindirizza alla pagina del ristorante selezionato
      }
    }
  }
};
</script>

<template>
  <form class="d-flex p-2 w-100 align-items-center" role="search">
    <a href="#"><font-awesome-icon :icon="['fas', 'map-marker-alt']" class="mx-2 icon" style="height: 20px;" /></a>
    
    <!-- Select per scegliere un ristorante -->
    <select v-model="selectedRestaurant" @change="handleRestaurantSelection" class="select me-2">
      <option value="" disabled>Seleziona un ristorante</option>
      <!-- Itera sui ristoranti recuperati -->
      <option v-for="restaurant in restaurants" :key="restaurant.id" :value="restaurant.slug">
        {{ restaurant.name }}
      </option>
    </select>


  </form>
</template>

<style lang="scss" scoped>

@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

form {
    @include border-radius-solid;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);  // Ombreggiatura leggera
}


.select {
    width: 100%;
    border-radius: 1rem;
    background-color: $quaternary-color;
    color: #b9b9b9; 
    position: relative;  // Aggiungi posizione relativa per il dropdown
    border-radius: 1rem;

    &:focus {
        outline: none; 
        border: none; 
    }

    // Aggiungi il dropdown con posizione fissa sotto l'elemento select
    &::after {
        content: '';
        height: 100px;
        border-radius: 1rem;
        position: absolute;
        top: 100%; // Sposta il dropdown sotto la select
        left: 0;
        right: 0;
        margin-top: 10px; // Aggiunge uno spazio tra la select e il dropdown
        z-index: 1; // Porta il dropdown sopra gli altri elementi
        border-radius: 0 0 8px 8px; // Arrotonda i bordi inferiori del dropdown
    }
}

.a{
    text-decoration: none;
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