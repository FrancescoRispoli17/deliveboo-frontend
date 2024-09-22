<script>
export default {
  name: 'ReciveData',
  computed: {
    type() {
      // Accedi al parametro 'dato' dalla rotta
      return this.$route.params.type ? this.$route.params.type.split(',') : []; // Divide la stringa in un array
    //   return this.$route.params.type
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <h1>Questa pagina riceve i dati</h1>
      <p>Dato ricevuto: {{ type }}</p>
      <ul>
        <li v-for="item in type" :key="item">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<style></style>
