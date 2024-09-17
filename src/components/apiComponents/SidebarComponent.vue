<script>
export default {
  name: 'SidebarComponent',
  props: {
    availableTypes: Array,
    selectedTypes: Array
  },
  data() {
    return {
      isAccordionOpen: false // Stato dell'accordion (aperto/chiuso)
    };
  },
  methods: {
    toggleAccordion() {
      this.isAccordionOpen = !this.isAccordionOpen;
    },
    updateSelectedTypes(event, typeName) {
      this.$emit('update-selected-types', { event, typeName });
    }
  }
};
</script>


<template>
    <div class="bg-light sidebar p-5">
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
</template>
  
<style scoped>
.sidebar {
    height: 100vh;
}
</style>
