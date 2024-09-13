<script>

// Inserire Carrello

import axios from 'axios';
import { store } from '../store';

export default {
  name: 'RestaurantDetailPage',
  data() {
    return {
      restaurant: {},
    };
  },
  methods: {
    getRestaurantDetails() {
      const slug = this.$route.params.slug;  // Ottiengo lo slug dalla rotta
      const apiUrl = `${store.url}${store.restaurants}${slug}`;

      axios.get(apiUrl)
        .then(response => {
          this.restaurant = response.data;
        })
        .catch(error => {
          console.error('Errore nel recupero dei piatti del ristorante:', error);
        });
    },
},
  mounted() {
    this.getRestaurantDetails();
  },
};
</script>

<template>
  <div class="container mt-4">
    <!-- Card principale del ristorante -->
    <div class="card bg-dark text-white">
      <div class="card-header">
        <h1 class="card-title">{{ restaurant.name }}</h1>
      </div>
      <div class="card-body">
        <p class="card-text">{{ restaurant.description }}</p>
        
        <!-- Sezione dei piatti -->
        <div v-if="restaurant.dishes && restaurant.dishes.length">
          <h4 class="mt-4 text-light">Piatti:</h4>
          <div class="row">
            <!-- Card per ciascun piatto -->
            <div class="col-md-6 mb-3" v-for="dish in restaurant.dishes" :key="dish.id">
              <div class="card bg-secondary text-white">
                <div class="card-body">
                  <h5 class="card-title fs-6">{{ dish.name }}</h5>
                  <p class="card-text text-light">Descrizione: {{ dish.description }}</p>
                  <p class="card-text text-light">Prezzo: €{{ dish.price }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-danger">Non ci sono piatti disponibili per questo ristorante.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;
</style>
