<script>
import axios from 'axios';
import { store } from '../store';

export default {
  name: 'RestaurantDetailPage',
  data() {
    return {
      restaurant: {},
      currentDish:null,
      dishQuantity:1,
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
    addToKart(dish){
        const obj={name:dish.name, price:dish.price, quantity:this.dishQuantity};
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
        this.dishQuantity=1;
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
                  <button @click="currentDish=dish" class="btn btn-primary"> + </button>
                </div>
              </div>
            </div>
             <!-- Carrello -->
            <div class="col-md-5">
              <p v-for="dish in cart" class="text-white">{{ dish.name }} <span class="ms-5">x{{ dish.quantity }}</span></p>
              <div v-if="cart.length">
                <button class="btn btn-primary" @click="deleteCart()">svuota carello</button>
                <router-link :to="{name:'payPage'}" class="btn btn-primary mx-3">conferma ordine</router-link>
              </div>
              <p v-else class="text-white mx-auto">Il tuo carello è vuoto</p>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Non ci sono piatti disponibili per questo ristorante.</p>
        </div>
      </div>
    </div>
    <!-- Modale -->
    <div class="infoDish p-4" v-if="currentDish">
            <p> {{ currentDish.name }} </p>
            <p> {{ currentDish.description }} </p>
            <p> €{{ currentDish.price }} </p>
            <div class="">
                <button v-if="dishQuantity>1" class="mx-5" @click="dishQuantity--">-</button>
                <button v-else class="mx-5" disabled>-</button>
                <span class="mx-5"> {{ dishQuantity }}</span>
                <button v-if="dishQuantity<7" class="mx-5" @click="dishQuantity++">+</button>
                <button v-else class="mx-5" disabled>-</button>
            </div>
            <button class="btn btn-primary m-3" @click="currentDish=null">indietro</button>
            <button class="btn btn-primary m-3" @click="addToKart(currentDish)">aggiungi all carello</button>
        </div>
  </div>
</template>

<style lang="scss">
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;
</style>
