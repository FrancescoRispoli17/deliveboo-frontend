<script>
import axios from 'axios';
import { store } from '../store';

export default {
  name: 'RestaurantDetailPage',
  data() {
    return {
      restaurant: {},
      currentDish:null,
      cart:[],
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
    infoDish(dish){
                let obj={name:dish.name, description:dish.description, price:dish.price, quantity:1}
                this.currentDish=obj;
            },
    addToKart(dish){
        const obj={name:dish.name, price:dish.price, quantity:dish.quantity};
        if(this.cart.length){
            let ciclo=false;
            this.cart.forEach(cartDish => {
                
                if(cartDish.name == obj.name){
                    cartDish.quantity += obj.quantity;
                    if(cartDish.quantity>7){
                        cartDish.quantity=7;
                        alert("PUOI ORDINARE MASSIMO 7 VOLTE LO STESSO PIATTO");
                    }
                    ciclo=true;
                    return ciclo;
                }
            });
            if(!ciclo){
                this.cart.push(obj);
            }
        }else
            {
                this.cart.push(obj);
            }
        const parsed = JSON.stringify(this.cart);
        localStorage.setItem('cart',parsed);
        console.log(localStorage.getItem('cart'))
        this.currentDish=null;
    },
    deleteCart(){
                this.cart=[];
                const parsed = JSON.stringify(this.cart);
                localStorage.setItem('cart',parsed);
            },

    
},
  mounted() {
    this.getRestaurantDetails();
    if(localStorage.getItem('cart')){
                 this.cart = JSON.parse(localStorage.getItem('cart'));
             }
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
            <div class="col-md-7 mb-3" v-for="dish in restaurant.dishes" :key="dish.id">
              <div class="card bg-secondary text-white">
                <div class="card-body">
                  <h5 class="card-title fs-6">{{ dish.name }}</h5>
                  <p class="card-text text-light">Descrizione{{ dish.description }}</p>
                  <p class="card-text text-light">Prezzo: €{{ dish.price }}</p>
                  <button @click="infoDish(dish)" class="btn btn-primary"> + </button>
                </div>
              </div>
            </div>
            <div class="col-md-5">
              <p v-for="dish in cart" class="text-white">{{ dish.name }} <span class="ms-5">x{{ dish.quantity }}</span></p>
              <button class="btn btn-primary" @click="deleteCart()">svuota carello</button>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Non ci sono piatti disponibili per questo ristorante.</p>
        </div>
      </div>
    </div>
    <div class="infoDish p-4" v-if="currentDish">
            <p> {{ currentDish.name }} </p>
            <p> {{ currentDish.description }} </p>
            <p> €{{ currentDish.price }} </p>
            <div class="">
                <button v-if="currentDish.quantity>1" class="mx-5" @click="currentDish.quantity--">-</button>
                <button v-else class="mx-5" disabled>-</button>
                <span class="mx-5"> {{ currentDish.quantity }}</span>
                <button v-if="currentDish.quantity<7" class="mx-5" @click="currentDish.quantity++">+</button>
                <button v-else class="mx-5" disabled>-</button>
            </div>
            <button class="btn btn-primary m-3" @click="currentDish=null">indietro</button>
            <button class="btn btn-primary m-3" @click="addToKart(currentDish)">aggiungi all carello</button>
        </div>
  </div>
  <!-- Modale -->

</template>

<style lang="scss">
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;
</style>
