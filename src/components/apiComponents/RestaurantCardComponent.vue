<script>
import axios from 'axios';
import { store } from '../../store';
import SidebarComponent from './SidebarComponent.vue';
import RestaurantListComponent from './RestaurantListComponent.vue';

export default {
  name: 'RestaurantCardComponent',
  components: {
    SidebarComponent,
    RestaurantListComponent
  },
  data() {
    return {
      results: [], // Risultati dei ristoranti
      apiRestaurant: `${store.url}${store.restaurants}`, // URL API dei ristoranti
      selectedTypes: [], // Tipi selezionati per i filtri
      availableTypes: [] // Tipi di cucina disponibili per le checkbox
    };
  },

  methods: {
    getTypes() {
      const typesUrl = `${store.url}types`;
      axios.get(typesUrl)
        .then(response => {
          this.availableTypes = response.data;
        })
        .catch(error => {
          console.error('Errore nel recupero dei tipi:', error);
        });
    },

    getRestaurants() {
      let filterUrl = this.apiRestaurant;

      if (this.selectedTypes.length > 0) {
        const typesQuery = this.selectedTypes.join(',');
        filterUrl += `?types=${typesQuery}`;
      }

      axios.get(filterUrl)
        .then(response => {
          this.results = response.data;
        })
        .catch(error => {
          console.error('Errore nel recupero dei ristoranti:', error);
        });
    },

    updateSelectedTypes({ event, typeName }) {
      const selected = event.target.checked;

      if (selected) {
        this.selectedTypes.push(typeName);
      } else {
        this.selectedTypes = this.selectedTypes.filter(name => name !== typeName);
      }

      this.getRestaurants();
    }
  },

  mounted() {
    this.getTypes();
    this.getRestaurants();
  }
};
</script>


<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Sidebar per il filtro -->
      <div class="col-md-3 col-lg-3">
        <SidebarComponent
          :availableTypes="availableTypes"
          :selectedTypes="selectedTypes"
          @update-selected-types="updateSelectedTypes"
        />
      </div>

      <!-- Area dei ristoranti -->
      <div class="col-md-8 col-lg-8 py-4">
        <RestaurantListComponent :results="results" />
      </div>
    </div>
  </div>
</template>


<style lang="scss"scoped>

</style>
