<template>
  <div>
    <div id="dropin-container"></div>
    <button @click="processPayment" class="btn btn-primary py-2 mb-2">
      Paga ora
    </button>

    <!-- Modale per pagamento riuscito -->
    <div
      class="modal fade"
      id="paymentSuccessModal"
      tabindex="-1"
      aria-labelledby="paymentSuccessModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="paymentSuccessModalLabel">
              Pagamento Completato
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Il pagamento è stato completato con successo! <br />
            ID transazione: {{ transactionId }}
          </div>
          <div class="modal-footer">
            <a
              href="/restaurant"
              class="btn btn-primary"
              @click="handleRedirect"
              >OK</a
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Modale per pagamento fallito -->
    <div
      class="modal fade"
      id="paymentErrorModal"
      tabindex="-1"
      aria-labelledby="paymentErrorModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="paymentErrorModalLabel">
              Errore di Pagamento
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Si è verificato un errore durante il pagamento. Per favore, riprova.
            <br />
            Errore: {{ errorMessage }}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal">
              Chiudi
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dropin from "braintree-web-drop-in";
import { Modal } from "bootstrap";
import { store } from "../../store";

export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
    formData: {
      type: Object,
      required: true,
    },
    cart: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      clientToken: "",
      dropinInstance: null,
      transactionId: "",
      errorMessage: "",
    };
  },
  async mounted() {
    this.getClientToken();
  },
  methods: {
    async getClientToken() {
      try {
        const response = await axios.get("/api/payment/token");
        this.clientToken = response.data.token;

        if (this.clientToken) {
          this.initializeBraintree();
        } else {
          console.error("Errore: Il token Braintree non è stato ricevuto.");
        }
      } catch (error) {
        console.error("Errore nel recuperare il token:", error);
      }
    },
    initializeBraintree() {
      dropin.create(
        {
          authorization: this.clientToken,
          container: "#dropin-container",
        },
        (createErr, instance) => {
          if (createErr) {
            console.error(
              "Errore nell'inizializzazione di Braintree:",
              createErr
            );
            return;
          }
          this.dropinInstance = instance;
        }
      );
    },
    processPayment() {
      if (!this.dropinInstance) {
        console.error(
          "L'istanza di Braintree Drop-In non è stata inizializzata."
        );
        return;
      }

      this.dropinInstance.requestPaymentMethod((err, payload) => {
        if (err) {
          console.error("Errore nel richiedere il metodo di pagamento:", err);
          this.errorMessage =
            "Errore nel richiedere il metodo di pagamento. " + err.message;
          const errorModal = new Modal(
            document.getElementById("paymentErrorModal")
          );
          errorModal.show();
          return;
        }

        // Effettua il pagamento
        axios
          .post("/api/payment/process", {
            payment_method_nonce: payload.nonce,
            amount: this.total.toFixed(2),
          })
          .then((response) => {
            this.transactionId = response.data.transaction_id;

            // Mostra la modale di pagamento riuscito
            const successModal = new Modal(
              document.getElementById("paymentSuccessModal")
            );
            successModal.show();

            // Invia i dati del form al backend
            this.sendFormData();
          })
          .catch((error) => {
            console.error("Errore nel processare il pagamento:", error);
            this.errorMessage =
              "Errore nel processare il pagamento. " + error.message;
            const errorModal = new Modal(
              document.getElementById("paymentErrorModal")
            );
            errorModal.show();
          });
      });
    },
    sendFormData() {
      // Prepara i dati da inviare al backend
      const orderData = {
        restaurant_id: localStorage.getItem("lastRestaurant"),
        user_name: this.formData.user_name,
        user_email: this.formData.user_email,
        user_address: this.formData.user_address,
        user_phone: this.formData.user_phone,
        delivery_time: this.formData.delivery_time,
        total_price: parseFloat(this.total).toFixed(2),
        notes: this.formData.notes || null,
        dishes: this.cart,
      };

      console.log(orderData);

      axios
        .post(store.url + store.orders, orderData)
        .then((response) => {
          console.log("Ordine inviato con successo:", response.data);
        })
        .catch((error) => {
          console.error("Errore nell'invio dell'ordine:", error);
        });
    },
  },
};
</script>

<style scoped></style>
