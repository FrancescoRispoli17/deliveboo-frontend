<script>
import axios from 'axios';
import { store } from '../store';

export default {
  name: 'FilterTest',

  data() {
    return {
      availableTypes: [], // Dati ricevuti dall'API
      selectedTypes: [], // Dati delle checkbox selezionate
    };
  },

  methods: {
    getTypes() {
      const typesUrl = `${store.url}${store.types}`;
      axios
        .get(typesUrl)
        .then((response) => {
          console.log('Tipi raccolti correttamente');
          this.availableTypes = response.data;
          console.log('Dati:', this.availableTypes);
        })
        .catch((error) => {
          console.error('Errore nel recupero dei tipi:', error);
        });
    },

    getPageReciveData() {
      if (this.selectedTypes.length === 0) {
        alert('Seleziona almeno un tipo prima di procedere.');
        return; // Interrompi l'esecuzione
      }

      const type = this.selectedTypes.join(','); // Converte l'array in una stringa
      console.log('Dati selezionati:', type);
      this.$router.push({
        name: 'restaurant',
        params: { type }, 
      });
    },
  },

  mounted() {
    this.getTypes();
  },
};
</script>

<template>
  <section class="bg-secondary py-5 mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-white">
          <h1>Pagina test filtraggio tipi</h1>
          <div class="mb-3">
            <div v-for="type in availableTypes" :key="type.id">
              <input
                type="checkbox"
                :value="type.name"
                v-model="selectedTypes"
              />
              <label>{{ type.name }}</label>
            </div>
          </div>
          <button @click="getPageReciveData" class="btn btn-primary">
            <span>clicca qui</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
