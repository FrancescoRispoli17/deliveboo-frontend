<script>
import axios from "axios";
import { store } from "../store";

// Importa i componenti header e footer
import HeaderEmptyComponent from '../components/headers/HeaderEmptyComponent.vue';
import FooterComponent from '../components/footers/FooterComponent.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


export default {
  name: 'RestaurantDetailPage',
  components: {
    HeaderEmptyComponent,
    FontAwesomeIcon,
    FooterComponent,

  },

  data() {
    return {
      restaurant: {}, // Dettagli del ristorante
      // cart: [], // Carrello degli ordini
      totale: null,
      store // Totale prezzo carrello
    };
  },
  methods: {
    // Recupera i dettagli del ristorante dal backend
    getRestaurantDetails() {
      const slug = this.$route.params.slug; // Prende lo "slug" dalla route
      const apiUrl = `${store.url}${store.restaurants}${slug}`; // Costruisce l'URL dell'API

      axios
        .get(apiUrl)
        .then((response) => {
          this.restaurant = response.data; // Assegna i dati del ristorante

          // Verifica se esiste già un carrello e se appartiene allo stesso ristorante
          if (localStorage.getItem("cart")) {
            if (localStorage.getItem("lastRestaurant") == this.restaurant.id) {
              this.store.cart = JSON.parse(localStorage.getItem("cart")); // Recupera carrello
              this.totale = JSON.parse(localStorage.getItem("tot")); // Recupera totale
            } else {
              this.store.cart = []; // Nuovo carrello se si tratta di un altro ristorante
            }
          }
        })
        .catch((error) => {
          console.error("Errore nel recupero dei piatti del ristorante:", error);
        });
    },

    // Conferma l'aggiunta del piatto al carrello o richiede conferma se il carrello è di un altro ristorante
    confirim(dish) {
      if (
        localStorage.getItem("lastRestaurant") &&
        localStorage.getItem("lastRestaurant") != this.restaurant.id
      ) {
        // Conferma di svuotare il carrello precedente
        if (confirm("Se crei un nuovo carrello eliminerai quello vecchio. Vuoi proseguire?")) {
          this.addToCart(dish);
        }
      } else {
        this.addToCart(dish); // Aggiunge il piatto se è lo stesso ristorante
      }
    },

    // Aggiunge un piatto al carrello
    addToCart(dish) {
      this.totale = 0; // Reset totale
      const obj = {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        quantity: 1, // Aggiungi una porzione
      };

      // Verifica se il piatto è già presente nel carrello
      if (this.store.cart.length) {
        let ciclo = false;
        this.store.cart.forEach((cartDish) => {
          if (cartDish.name == obj.name) {
            cartDish.quantity += obj.quantity; // Aumenta quantità se esiste già
            ciclo = true;
            return ciclo;
          }
        });
        if (!ciclo) this.store.cart.push(obj); // Aggiungi nuovo piatto
      } else {
        this.store.cart.push(obj); // Aggiunge il primo piatto
      }

      // Aggiorna il localStorage con i dati del carrello
      localStorage.setItem("cart", JSON.stringify(this.store.cart));
      localStorage.setItem("lastRestaurant", JSON.stringify(this.restaurant.id));
      this.calcoloTotale();
      this.store.lastCart = this.store.cart;
    },

    // Svuota completamente il carrello
    deleteCart() {
      this.store.cart = [];
      this.store.lastCart = [];
      this.totale = null;
      localStorage.clear(); // Cancella tutto dal localStorage
    },

    // Calcola il totale dei piatti nel carrello
    calcoloTotale() {
      this.totale = 0; // Reset del totale
      this.store.cart.forEach((cartDish) => {
        this.totale += parseFloat(cartDish.price) * cartDish.quantity; // Somma dei prezzi
      });
      localStorage.setItem("tot", JSON.stringify(this.totale)); // Salva il totale
    },

    // Rimuove una porzione o un piatto intero dal carrello
    deleteSingleDish(dish, index) {
      if (dish.quantity > 1) {
        dish.quantity--; // Diminuisci la quantità solo se è maggiore di 1
      } else {
        this.store.cart.splice(index, 1); // Rimuove il piatto se la quantità è 1
      }
      this.calcoloTotale(); // Aggiorna il totale
      if (this.store.cart) localStorage.setItem("cart", JSON.stringify(this.cart));
      else localStorage.clear();
      this.store.lastCart = this.store.cart;
    },
  },

  // Chiama la funzione per ottenere i dettagli del ristorante appena il componente è montato
  mounted() {
    this.getRestaurantDetails();
  },
};
</script>


<template>
  <HeaderEmptyComponent />
  <div class="margin" style=" background-image: url('/offers.png');">
    <div class="container py-5">
      <h5 class="mb-3">
        <a class="text-white text-decoration-none fw-bold d-flex align-items-center" href="/restaurant">
          <FontAwesomeIcon :icon="['fas', 'arrow-left']" class="me-2 icon" style="height: 1.3rem;" />
          Pagina ristoranti
        </a>
      </h5>
      <!-- Controllo per assicurarsi che i dettagli del ristorante siano stati caricati -->
      <div class="row" v-if="restaurant">
        <div class="col-md-3">
          <!-- foto del ristorante -->
          <div class="img-container">
            <img :src="restaurant.image_path_url" alt="Immagine del ristorante" class="img"
              v-if="restaurant.image_path_url">
          </div>
        </div>
        <div class="col-md-9 p-1">
          <h1 class="title text-white">{{ restaurant.name }}</h1>
          <p class="card-text">{{ restaurant.description }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="container py-5">
    <div class="row">
      <!-- Sezione dei piatti -->
      <div class=" col-lg-6 col-md-12 scroll py-3" v-if="restaurant.dishes && restaurant.dishes.length">
        <div v-for="dish in restaurant.dishes.filter(dish => dish.visible)" :key="dish.id" class="card mb-3">
          <div class="row g-0">
            <div class="col-md-3">
              <img :src="dish.image_path_url" style="width: 100%;" alt="">
            </div>
            <div class="col-md-9">
              <div class="card-body">
                <h5 class="card-title">{{ dish.name }}</h5>
                <p class="card-text">Descrizione: {{ dish.description }}</p>
                <p class="card-text">Prezzo: €{{ dish.price }}</p>
                <div class="d-flex align-items-center">
                  <div>
                    <button @click="confirim(dish)" class="btn button">aggiungi al carrello</button>
                  </div>
                  <div>
                    <span v-if="dish.gluten_free === 1"> <FontAwesomeIcon :icon="['fas', 'wheat-awn-circle-exclamation']" size="xl" style="color: #dbac00;" /> </span>
                    <span v-if="dish.lactose_free === 1"> </span>
                    <span v-if="dish.spicy === 1"> <FontAwesomeIcon :icon="['fas', 'pepper-hot']" size="xl" style="color: #ff0000;" /> </span>
                    <span v-if="dish.vegan === 1"> <FontAwesomeIcon :icon="['fas', 'leaf']" size="xl" style="color: #02c031;" /> </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Carrello side -->
      <div class="col-lg-6 col-md-12 kart kart-side py-3" style=" background-image: url('/offers.png');">
        <!-- Recap per schermi più piccoli di 768px -->
        <div v-if="store.cart.length" class="recap mt-3">
          <p class="text-white" style="font-weight: 800;">
            Costo totale: €{{ totale }}
          </p>
        </div>
        <!-- Dettagli del carrello per schermi sopra 768px -->
        <div class=" p-4 dish-scroll info-kart">
          <div v-for="(dish, index) in store.cart" class=" d-flex">
            <div class="col-6 py-1">
              <div v-if="dish.quantity > 1">
                <p class="text-white m-0" style="font-weight: 500; font-size:16px ;">
                  {{ dish.quantity }} piatti di {{ dish.name }}
                </p>
              </div>
              <div v-else>
                <p class="text-white m-0" style="font-weight: 500; font-size:16px ;">
                  {{ dish.quantity }} piatto di {{ dish.name }}
                </p>
              </div>
            </div>
            <div class="col-6 d-flex justify-content-end py-1">
              <button class="btn rounded text-secondary me-3" style="font-weight: 500;"
                @click="deleteSingleDish(dish, index)">-</button>
              <button class="btn rounded text-secondary ms-3" style="font-weight: 500;"
                @click="addToCart(dish)">+</button>
            </div>
          </div>
        </div>
        <!-- Pulsanti e totale carrello -->
        <div v-if="store.cart.length" class="text-center info-kart">
          <p class="text-white" style="font-weight: 700;">Totale: €{{ totale }}</p>
          <div class="d-flex justify-content-center">
            <button type="button" class="btn button-kart" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Svuota carrello
            </button>
            <router-link :to="{ name: 'payPage' }" class="btn button-kart mx-3">Conferma ordine</router-link>
          </div>
        </div>
        <div v-else class="d-flex justify-content-center align-items-center">
          <span class="text-white" style="font-weight: 800;">Il carrello è vuoto</span>
        </div>
      </div>
    </div>
    <!-- modale -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            <button type="button" class="btn btn-primary" @click="deleteCart()" data-bs-dismiss="modal">Svuota</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FontAwesomeIcon />
  <FooterComponent />
</template>



<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.rounded {
  border-radius: 100%;
  background-color: $quaternary-color;
}

.card {
  border: 0.5px solid rgba(0, 0, 0, 0.099);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
}

.button-kart {
  padding: 0.5rem;
  background-color: $tertiary-color;
  color: $quaternary-color;
  font-weight: 600;
  border-radius: 0.3rem;

}

.button-kart:hover {
  background-color: $quaternary-color;
}

.dish-scroll {
  min-height: 0px;
  height: 350px;
  overflow-y: auto;
}

.dish-scroll::-webkit-scrollbar {
  display: none;
}

.margin {
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
}


.img-container {
  border-radius: 1.5rem;

  .img {
    border-radius: 1.5rem; // Aggiungi il border-radius alla foto del ristorante
    width: 100%; // Assicurati che l'immagine occupi la larghezza completa
    object-fit: cover; // Mantieni le proporzioni corrette
  }
}

.icon {
  color: $quaternary-color;
}

.scroll {
  height: 500px;
  overflow-y: auto;
}

.scroll::-webkit-scrollbar {
  display: none;
}

.button {
  background-color: $primary-color;
  @include button;
  @include shadow
}

.title {
  @include title
}

.hr {
  border-bottom: 1px solid grey;
}


.kart {
  background-color: $primary-color;
  border-radius: 1.2rem;
  background-image: url('/logo-transparent.png');
}

.recap {
  display: none; // Nascondi il recap per default su schermi grandi
}

.info-kart {
  display: block; // Mostra i dettagli del carrello su schermi grandi
}

@media(max-width: 768px) {
  .scroll {
    height: 600px;
  }

  .kart-side {
    height: auto;
  }

  .recap {
    display: block; // Mostra il recap su schermi piccoli
  }

  .info-kart {
    display: none; // Nascondi i dettagli del carrello su schermi piccoli
  }


  .text {
    color: rgb(31, 2, 2);
    text-decoration: none;
  }
}
</style>
