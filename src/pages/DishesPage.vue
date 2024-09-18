<script>
import axios from "axios";
import { store } from "../store";

//componenti
import HeaderEmptyComponent from '../components/headers/HeaderEmptyComponent.vue';

export default {
  name: 'RestaurantDetailPage',
  components: {
    HeaderEmptyComponent
  },

  data() {
    return {
      restaurant: {},
      cart: [],
      totale: null,
    };
  },
  methods: {
    getRestaurantDetails() {
      const slug = this.$route.params.slug; // Ottieni lo slug dalla rotta
      const apiUrl = `${store.url}${store.restaurants}${slug}`;

      axios
        .get(apiUrl)
        .then((response) => {
          this.restaurant = response.data;
          if (localStorage.getItem("cart")) {
            if (localStorage.getItem("lastRestaurant") == this.restaurant.id) {
              this.cart = JSON.parse(localStorage.getItem("cart"));
              this.totale = JSON.parse(localStorage.getItem("tot"));
            } else this.cart = [];
          }
        })
        .catch((error) => {
          console.error(
            "Errore nel recupero dei piatti del ristorante:",
            error
          );
        });
    },
    confirim(dish) {
      if (
        localStorage.getItem("lastRestaurant") &&
        localStorage.getItem("lastRestaurant") != this.restaurant.id
      ) {
        // console.log(localStorage.getItem("lastRestaurant"));
        // console.log(this.restaurant.id);
        if (
          confirm(
            "Se crei un nuovo carrello eliminerai quello vecchio\n Vuoi proseguire?"
          ) == true
        ) {
          this.addToCart(dish);
        }
      } else this.addToCart(dish);
    },
    addToCart(dish) {
      this.totale = 0;
      const obj = {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        quantity: 1,
      };
      if (this.cart.length) {
        let ciclo = false;
        this.cart.forEach((cartDish) => {
          if (cartDish.name == obj.name) {
            cartDish.quantity += obj.quantity;
            ciclo = true;
            return ciclo;
          }
        });
        if (!ciclo) this.cart.push(obj);
      } else this.cart.push(obj);

      const parsed = JSON.stringify(this.cart);
      localStorage.setItem("cart", parsed);
      const id = JSON.stringify(this.restaurant.id);
      localStorage.setItem("lastRestaurant", id);
      this.calcoloTotale();
    },
    deleteCart() {
      this.cart = [];
      this.totale = null;
      localStorage.clear();
    },
    calcoloTotale() {
      this.cart.forEach((cartDish) => {
        for (let i = 0; i < cartDish.quantity; i++) {
          this.totale += parseFloat(cartDish.price);
        }
      });
      const parsed = JSON.stringify(this.totale);
      localStorage.setItem("tot", parsed);
    },
    deleteSingleDish(dish) {
      dish.quantity--;
      this.totale = null;
      if (dish.quantity < 1) {
        this.cart.splice(dish.id, 1);
      }
      this.calcoloTotale();
      if (this.cart) {
        const parsed = JSON.stringify(this.cart);
        localStorage.setItem("cart", parsed);
      } else localStorage.clear();
    },
  },
  mounted() {
    this.getRestaurantDetails();
  },
};
</script>

<template>

  <HeaderEmptyComponent />

  <div class="container mt-4">
    <div class="row">
      <!-- Sezione dei piatti -->
      <div class="col-md-7" v-if="restaurant.dishes && restaurant.dishes.length">
        <h1 class="card-title">{{ restaurant.name }}</h1>
        <p class="card-text">{{ restaurant.description }}</p>
        <h4 class="mt-4">Piatti:</h4>
        <div v-for="dish in restaurant.dishes" :key="dish.id" class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="dish.image_path_url" class="img-fluid" alt="">
            </div>
            <div class="col-md-8">
              <div class="card-body bg-secondary text-white">
                <h5 class="card-title">{{ dish.name }}</h5>
                <p class="card-text">Descrizione: {{ dish.description }}</p>
                <p class="card-text">Prezzo: €{{ dish.price }}</p>
                <button @click="confirim(dish)" class="btn btn-primary">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Carrello -->
      <div class="col-md-5 bg-danger">
        <div v-for="dish in cart" class="mt-4">
          <p class="text-white m-0">
            <span class="me-3">{{ dish.quantity }}x</span>{{ dish.name }}
          </p>
          <button class="btn text-white me-3" @click="deleteSingleDish(dish)">-</button>
          <span>edit</span>
          <button class="btn text-white ms-3" @click="addToCart(dish)">+</button>
        </div>
        <div v-if="cart.length">
          <p class="text-white">Totale: €{{ totale }}</p>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Svuota carrello
          </button>
          <!-- Modal per svuotare il carrello -->
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Svuota carrello</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <p>Sei sicuro di voler eliminare il carrello?</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                  <button type="button" class="btn btn-primary" @click="deleteCart()"
                    data-bs-dismiss="modal">Svuota</button>
                </div>
              </div>
            </div>
          </div>
          <router-link :to="{ name: 'payPage' }" class="btn btn-primary mx-3">Conferma ordine</router-link>
        </div>
        <p v-else class="text-white mx-auto">
          <font-awesome-icon :icon="['fas', 'cart-shopping']" /> Il tuo carrello è vuoto
        </p>
      </div>
    </div>
  </div>

</template>


<style lang="scss">
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;
</style>
