<script>
import axios from 'axios';
import { store } from '../../store';
import TypeFilterComponent from './TypeFilterComponent.vue';


export default {
  name: 'RestaurantCardComponent',
  data() {
    return {
      results: [],
      apiRestaurant: `${store.url}${store.restaurants}`,
      selectedTypes: [], // Definisci selectedTypes qui
    };
  },

  components: {
    TypeFilterComponent,
  },

  methods: {
    // Chiamata API per ottenere i ristoranti filtrati
    getRestaurants() {
      let filterUrl = this.apiRestaurant;

      if (this.selectedTypes.length > 0) {
        const typesQuery = this.selectedTypes.join(',');

        filterUrl += `?types=${typesQuery}`;
      }

      axios.get(filterUrl)
        .then(response => {
            this.results = response.data;
            console.log('Risposta API:', response.data); // Debugging
        })
        .catch(error => {
          console.error('Errore nel recupero dei ristoranti:', error);
        });
    },

    // Metodo chiamato quando i tipi selezionati vengono aggiornati
    handleFilterUpdate(selectedTypes) {
      this.selectedTypes = selectedTypes; // Aggiorna il valore di selectedTypes
      console.log('attualmente sono stati selezionati',this.selectedTypes)
      this.getRestaurants(); // Aggiorna i ristoranti in base ai filtri
    },
  },
  mounted() {
    this.getRestaurants();
  },
};
</script>

<template>
  <div class="container">
    <TypeFilterComponent :selectedTypes="selectedTypes" @filterTypes="handleFilterUpdate" />

    
    <div class="row">
      <div v-for="restaurant in results" :key="restaurant.id" class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">{{ restaurant.name }}</h2>
            <p class="card-text">{{ restaurant.description }}</p>
            <p class="card-text fw-bold">{{ restaurant.city }}</p>
            <ul>
              <li v-for="type in restaurant.types" :key="type.id">{{ type.name }}</li>
            </ul>
            <router-link :to="{ name: 'dishes', params: { slug: restaurant.slug } }" class="btn btn-primary">
              Vedi Piatti
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .card {
    margin-bottom: 20px;
  }
</style>
