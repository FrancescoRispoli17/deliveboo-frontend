<script>
import axios from 'axios';
import { store } from '../../store';

export default {
  name: 'RestaurantCardComponent',
  data() {
    return {
      results: [], // Risultati dei ristoranti
      apiRestaurant: `${store.url}${store.restaurants}`, // URL API dei ristoranti
      selectedTypes: [], // Tipi selezionati per i filtri
      availableTypes: [], // Tipi di cucina disponibili per le checkbox
      isAccordionOpen: false, // Stato dell'accordion (aperto/chiuso)
    };
  },

  methods: {
    // Recupera i tipi di cucina disponibili
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

    // Recupera i ristoranti in base ai tipi selezionati
    getRestaurants() {
      let filterUrl = this.apiRestaurant;

      if (this.selectedTypes.length > 0) {
        const typesQuery = this.selectedTypes.join(',');
        filterUrl += `?types=${typesQuery}`; // Usa 'types' nella query string
      }

      console.log('URL generato per la chiamata API:', filterUrl);

      axios.get(filterUrl)
        .then(response => {
          this.results = response.data;
          console.log('Risposta API:', response.data);
        })
        .catch(error => {
          console.error('Errore nel recupero dei ristoranti:', error);
        });
    },

    // Aggiorna i tipi selezionati e richiama l'API dei ristoranti
    updateSelectedTypes(event, typeName) {
      const selected = event.target.checked;

      if (selected) {
        this.selectedTypes.push(typeName); // Aggiunge il tipo selezionato
      } else {
        this.selectedTypes = this.selectedTypes.filter(name => name !== typeName); // Rimuove il tipo deselezionato
      }

      console.log('Tipi selezionati:', this.selectedTypes);
      this.getRestaurants(); // Aggiorna la lista dei ristoranti
    },

    // Funzione per alternare lo stato dell'accordion
    toggleAccordion() {
      this.isAccordionOpen = !this.isAccordionOpen;
    }
  },

  // Quando il componente è montato, carica i tipi di cucina e i ristoranti
  mounted() {
    this.getTypes();
    this.getRestaurants();
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Sidebar per il filtro -->
      <div class="col-md-3 col-lg-3 bg-light sidebar p-5">
        <div>
          <!-- H5 con toggle per l'accordion -->
        <h5 class="mb-5" @click="toggleAccordion" style="cursor: pointer;">
          Cucine
          <font-awesome-icon 
            v-if="isAccordionOpen" 
            icon="chevron-up" 
            class="ms-2"
          />
          <font-awesome-icon 
            v-else 
            icon="chevron-down" 
            class="ms-2"
          />
        </h5>

        <!-- Sezione delle checkbox, visibile solo se isAccordionOpen è true -->
        <div v-if="isAccordionOpen">
          <div v-for="type in availableTypes" :key="type.id" class="form-check">
            <input 
              type="checkbox" 
              class="form-check-input" 
              :value="type.name" 
              :checked="selectedTypes.includes(type.name)" 
              @change="updateSelectedTypes($event, type.name)" 
            />
            <p class="form-check-label py-1">{{ type.name }}</p>
          </div>
        </div>
        </div>
      </div>

      <!-- Area dei ristoranti -->
      <div class="col-md-8 col-lg-8 py-4">
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Immagine</th>
              <th>Descrizione</th>
              <th>Città</th>
              <th>Tipi</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="restaurant in results" :key="restaurant.id">
              <td><img :src="restaurant.image_path_url" alt="Restaurant Image" class="img-fluid" style="max-width: 100px; max-height: 100px;" /></td>
              <td>{{ restaurant.name }}</td>
              <td>{{ restaurant.name }}</td>
              <td>{{ restaurant.description }}</td>
              <td>{{ restaurant.city }}</td>
              <td>
                <ul class="list-unstyled mb-0">
                  <li v-for="type in restaurant.types" :key="type.id" class="text-light">{{ type.name }}</li>
                </ul>
              </td>
              <td>
                <router-link :to="{ name: 'dishes', params: { slug: restaurant.slug } }" class="btn btn-primary btn-sm">
                  Vedi Piatti
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .sidebar {
    height: 100vh; /* Imposta l'altezza della sidebar per occupare tutta la viewport height */
  }

  .table td, .table th {
    vertical-align: middle; 
  }

  .btn-sm {
    padding: 0.25rem 0.5rem; /* Riduci il padding del pulsante per la tabella */
  }

  h5 {
    cursor: pointer; /* Imposta il cursore per indicare che è cliccabile */
  }
</style>
