<script>
export default {
  name: 'RestaurantListComponent',
  props: {
    results: Array
  }
};
</script>

<template>
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
</template>

<style scoped>
  .table td, .table th {
    vertical-align: middle; 
  }

  .btn-sm {
    padding: 0.25rem 0.5rem; 
  }
</style>