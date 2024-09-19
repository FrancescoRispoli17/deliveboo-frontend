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
  <div class=" sidebar p-5">

    <div class="container">
      <div class="row align-items-center">
        <div class="col-auto">
          <img src="/rider.png" alt="rider" style="width: 100px; height: 100px;">
        </div>
        <div class="col-auto">
          <p>Adesso</p>

          <label class="fs-5 fw-bold">Milano</label>
        </div>
      </div>
    </div>

    <hr>

    <!-- Sezione cliccabile per il toggle dell'accordion -->
    <div class="accordion-header d-flex align-items-center justify-content-between" @click="toggleAccordion"
      style="cursor: pointer;">
      <h5 class="mb-2 fw-bold">Cucine</h5>
      <div>
        <font-awesome-icon v-if="isAccordionOpen" icon="chevron-up" class=" icon" />
        <font-awesome-icon v-else icon="chevron-down" class=" icon" />
      </div>
    </div>


    <!-- Sezione delle checkbox, visibile solo se isAccordionOpen è true -->
    <div v-if="isAccordionOpen" class="mt-4">
      <div v-for="type in availableTypes" :key="type.id" class="form-check py-2">
        <div class="row">
          <div class="col-auto">
            <input type="checkbox" class="form-check-input custom-checkbox" :value="type.name"
              :checked="selectedTypes.includes(type.name)" @change="updateSelectedTypes($event, type.name)" />
          </div>
          <div class="col-auto d-flex justify-content-start">
            <label class="form-check-label fw-light">{{ type.name }}</label>
          </div>
        </div>
      </div>
    </div>

    <hr>
  </div>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.sidebar {
  height: 100%;
  /* Imposta l'altezza della sidebar */
  // background-image: url('/offers.png');
  background-color: $quaternary-color;
}

.icon {
  font-size: 1.25rem;
  color: $primary-color;
}

label {
  vertical-align: middle;
}

/* Personalizza le checkbox */
.custom-checkbox {
  width: 1.2rem;
  height: 1.2rem;
  appearance: none;
  border: 2px solid #b0b0b0;
  border-radius: 0.25rem;
  position: relative;
  vertical-align: middle;
  cursor: pointer;

  &:checked {
    background-color: $primary-color;
    border-color: $primary-color;
  }

}

hr {
  color: $primary-color;
}
</style>