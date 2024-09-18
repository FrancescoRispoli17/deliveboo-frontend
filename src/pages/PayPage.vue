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
          <UserFormInfo @formSubmitted="handleFormSubmit"></UserFormInfo>
          <BraintreePayment
            ref="braintreePayment"
            :total="totale"
            :formData="formData"></BraintreePayment>
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
      formData: null, // Memorizza i dati del form
    };
  },
  mounted() {
    if (localStorage.getItem("cart")) {
      this.cart = JSON.parse(localStorage.getItem("cart"));
      this.totale = JSON.parse(localStorage.getItem("tot"));
    }
  },
  methods: {
    handleFormSubmit(formData) {
      // Salva i dati del form
      this.formData = formData;

      // Procedi con il pagamento
      this.$refs.braintreePayment.processPayment();
    },
  },
};
</script>

<style scoped></style>
