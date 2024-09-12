<script>
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
      const slug = this.$route.params.slug;  // Ottieni lo slug dalla rotta
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
      <div class="card">
        <div class="card-header">
          <h1 class="card-title">{{ restaurant.name }}</h1>
        </div>
        <div class="card-body">
          <p class="card-text">{{ restaurant.description }}</p>
          
          <div v-if="restaurant.dishes && restaurant.dishes.length">
            <h2 class="mt-4">Piatti:</h2>
            <div class="row">
              <div class="col-md-6" v-for="dish in restaurant.dishes" :key="dish.id">
                <div class="card mb-3">
                  <div class="card-body">
                    <h5 class="card-title">{{ dish.name }}</h5>
                    <p class="card-text">Prezzo: €{{ dish.price }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p>Non ci sono piatti disponibili per questo ristorante.</p>
          </div>
        </div>
      </div>
    </div>
  </template>

<style lang="scss">
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;
</style>
