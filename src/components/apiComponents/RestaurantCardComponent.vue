<script>
import axios from 'axios';
import { store } from '../../store';

export default {
  name: 'RestaurantCardComponent',
  data() {
    return {
      results: [],
      apiRestaurant: `${store.url}${store.restaurants}`,
      selectedTypes: [], // Nome dei tipi selezionati
      availableTypes: [] // Tipi disponibili da mostrare nelle checkbox
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

    updateSelectedTypes(event, typeName) {
    const selected = event.target.checked;

    if (selected) {
      this.selectedTypes.push(typeName); // aggiunta del nome del tipo selezionato
    } else {
      this.selectedTypes = this.selectedTypes.filter(name => name !== typeName); // rimozione del nome del tipo deselezionato
    }

    console.log('Tipi selezionati:', this.selectedTypes);
    this.getRestaurants(); // Aggiorna la lista dei ristoranti in base ai filtri
  },
  },

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
      <div class="col-md-4 col-lg-4 bg-light sidebar p-3 bg-dark">
        <h4 class="text-light">Filtra per Tipi</h4>
        <div v-for="type in availableTypes" :key="type.id" class="form-check">
          <input 
            type="checkbox"
            class="form-check-input"
            :value="type.name"
            :checked="selectedTypes.includes(type.name)"
            @change="updateSelectedTypes($event, type.name)"
          />
          <label class="form-check-label text-light">{{ type.name }}</label>
        </div>
      </div>

      <!-- Area dei ristoranti -->
      <div class="col-md-8 col-lg-8 py-4">
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrizione</th>
              <th>Città</th>
              <th>Tipi</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="restaurant in results" :key="restaurant.id">
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
    height: 100vh; 
  }

  .table td, .table th {
    vertical-align: middle; 
  }

  .btn-sm {
    padding: 0.25rem 0.5rem; /* Riduci il padding del pulsante per la tabella */
  }
</style>


<style scoped>
  .sidebar {
    height: 100vh; /* Imposta l'altezza della sidebar per occupare tutta la viewport height */
  }

  .card {
    margin-bottom: 20px;
  }
</style>
