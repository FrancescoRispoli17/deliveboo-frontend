<script>
import axios from 'axios';
import { store } from '../store';

export default {
  name: 'RestaurantDetailPage',
  data() {
    return {
      restaurant: {},
      cart:[],
      totale:null
    };
  },
  methods: {
    getRestaurantDetails() {
      const slug = this.$route.params.slug;  // Ottieni lo slug dalla rotta
      const apiUrl = `${store.url}${store.restaurants}${slug}`;

      axios.get(apiUrl)
        .then(response => {
          this.restaurant = response.data;
          if(localStorage.getItem('cart')){
            if(localStorage.getItem('lastRestaurant')==this.restaurant.id){
              this.cart = JSON.parse(localStorage.getItem('cart'));
              this.totale = JSON.parse(localStorage.getItem('tot'));
            }else
              this.cart = [];
          }
        })
        .catch(error => {
          console.error('Errore nel recupero dei piatti del ristorante:', error);
        })
    },
    confirim(dish){
      if(localStorage.getItem('lastRestaurant') && localStorage.getItem('lastRestaurant')!=this.restaurant.id ){
        console.log(localStorage.getItem('lastRestaurant'));
        console.log(this.restaurant.id);
        if(confirm("Se crei un nuovo carrello eliminerai quello vecchio\n Vuoi proseguire?")==true){
          this.addToCart(dish);
        }
      }else
        this.addToCart(dish);
    },
    addToCart(dish){
      this.totale=0;
        const obj={name:dish.name, price:dish.price, quantity:1};
        if(this.cart.length){
            let ciclo=false;
            this.cart.forEach(cartDish => {
              if(cartDish.name == obj.name){
                cartDish.quantity += obj.quantity;
                ciclo=true;
                return ciclo;
              }
            });
            if(!ciclo)
              this.cart.push(obj);
        }else
            this.cart.push(obj);

        const parsed = JSON.stringify(this.cart);
        localStorage.setItem('cart',parsed);
        const id = JSON.stringify(this.restaurant.id);
        localStorage.setItem('lastRestaurant',id);
        this.calcoloTotale();
    },       
    deleteCart(){
      this.cart=[];
      this.totale=null;
      localStorage.clear();
    },
    calcoloTotale(){
      this.cart.forEach(cartDish => {
        for(let i=0;i<cartDish.quantity;i++){
            this.totale+=parseFloat(cartDish.price);
            }
        });
        const parsed = JSON.stringify(this.totale);
        localStorage.setItem('tot',parsed);
      },
      deleteSingleDish(dish){
        dish.quantity--;
        this.totale=null;
        if(dish.quantity<1){
          this.cart.splice(dish.id,1)
        }
          this.calcoloTotale();
      }     
    },
  mounted() {
    this.getRestaurantDetails();
      }
    }
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
                  <!-- Button trigger modal -->
                  <button @click="confirim(dish)" class="btn btn-primary"> + </button>
                </div>
              </div>
            </div>

             <!-- Carrello -->
            <div class="col-md-5">
              <div v-for="dish in cart" class="mt-4">
                <p class="text-white m-0"><span class="me-3">{{ dish.quantity }}x</span>{{ dish.name }}</p>
                <button class="btn text-white me-3" @click="deleteSingleDish(dish)">-</button>
                <span>edit</span>
                <button class="btn text-white ms-3"@click="addToCart(dish)">+</button>
              </div>
              <div v-if="cart.length">
                <p class="text-white">Toale: €{{ totale }}</p>
                <button class="btn btn-primary" @click="deleteCart()">svuota carello</button>
                <router-link :to="{name:'payPage'}" class="btn btn-primary mx-3">conferma ordine</router-link>
              </div>
              <p v-else class="text-white mx-auto"><font-awesome-icon :icon="['fas', 'cart-shopping']" /> Il tuo carello è vuoto</p>
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
