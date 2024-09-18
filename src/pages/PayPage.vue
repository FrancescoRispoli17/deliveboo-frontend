<template>
  <div class="container bg-white">
    <div class="row">
      <div class="col-12">
        <p v-for="dish in cart" :key="dish.id">
          {{ dish.name }} <span class="ms-2">x{{ dish.quantity }}</span>
        </p>
        <p class="mt-5">Prezzo totale: €{{ parseFloat(totale).toFixed(2) }}</p>
      </div>
      <div class="container">
        <div class="row">
          <!-- Passa l'evento submit form -->
          <UserFormInfo
            @formSubmitted="handleFormSubmit"
            @formValid="handleFormValid"></UserFormInfo>
          <!-- Passa il cart e il totale al componente BraintreePayment -->
          <BraintreePayment
            ref="braintreePayment"
            :total="totale"
            :formData="formData"
            :cart="cart"
            v-if="isFormValid"></BraintreePayment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserFormInfo from "../components/apiComponents/UserFormInfo.vue";
import BraintreePayment from "../components/apiComponents/BraintreePayment.vue";

export default {
  name: "PayPage",
  components: {
    UserFormInfo,
    BraintreePayment,
  },
  data() {
    return {
      cart: [],
      totale: null,
      formData: null,
      isFormValid: false,
    };
  },
  mounted() {
    // Recupera il carrello e il totale dal localStorage (o un'altra fonte)
    if (localStorage.getItem("cart")) {
      this.cart = JSON.parse(localStorage.getItem("cart"));
      this.totale = JSON.parse(localStorage.getItem("tot"));
    }
  },
  methods: {
    handleFormSubmit(formData) {
      // Salva i dati del form
      this.formData = formData;
    },
    handleFormValid(isValid) {
      // Imposta la visibilità del pulsante "Paga ora"
      this.isFormValid = isValid;
    },
  },
};
</script>

<style scoped></style>
